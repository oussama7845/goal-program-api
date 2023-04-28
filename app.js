var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var ObjectifRouter = require('./routes/Objectif');
var ProgrammeRouter = require('./routes/Programme');

var app = express();
var mongoose = require('mongoose');

// Intégration de la bdd
var connectionString = "mongodb+srv://oussama_abk:yxClc1afKNHeEMZ4@cluster0.qo4dpvc.mongodb.net/test";
var mongoDB = process.env.MONGODB_URI || connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/Objectif', ObjectifRouter);
app.use('/Programme', ProgrammeRouter);

module.exports = app;
