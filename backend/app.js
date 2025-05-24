var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const ideaLabRoutes = require('./routes/idealab');
const MongoStore = require('connect-mongo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();// Allow requests from your frontend, and allow credentials (cookies)
app.use(cors({
  origin: ['https://idealab-zeta.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use('/auth', authRoutes);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/idealab', ideaLabRoutes);

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

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Update MongoDB connection with proper options
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
  w: 'majority',
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  directConnection: false,
  replicaSet: 'atlas-9vcknn-shard-0',
  authSource: 'admin'
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Add connection error handling
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Add reconnection logic
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected, attempting to reconnect...');
  setTimeout(() => {
    mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      w: 'majority',
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      directConnection: false,
      replicaSet: 'atlas-9vcknn-shard-0',
      authSource: 'admin'
    });
  }, 5000);
});

// Add graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnection:', err);
    process.exit(1);
  }
});

module.exports = app;
