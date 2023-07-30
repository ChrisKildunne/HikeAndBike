const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require("multer");
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Images"); // Remove the space after "Images"
    },
    filename: function (req, file, cb) { // Change "photo" to "filename"
      cb(
        null, Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({ storage: storage });


require('dotenv').config();
require('./config/database');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const hikeTrailsRouter = require('./routes/hiketrails');
const bikeTrailsRouter = require('./routes/biketrails');
const updatesRouter = require('./routes/updates')
const updatesHikeRouter = require('./routes/updatesHike')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

require('./config/passport');

app.use(methodOverride('_method'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trails/hike',hikeTrailsRouter)
app.use('/trails/bike',bikeTrailsRouter)
app.use('/',updatesRouter)
app.use('/',updatesHikeRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;