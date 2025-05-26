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
  origin: ['https://idealab-beta.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['set-cookie']
}));

// At the top of the file, after require statements
const MONGODB_URI = "mongodb+srv://aakub1096:0ElXJBUfvDRIGfhV@cluster0.f7veylt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a function to initialize the app
async function initializeApp() {
  try {
    // Connect to MongoDB first
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      w: 'majority',
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
      directConnection: false,
      replicaSet: 'atlas-9vcknn-shard-0',
      authSource: 'admin',
      retryReads: true,
      family: 4
    });
    console.log('MongoDB connected successfully');

    // Initialize passport after MongoDB connection
    const initializePassport = require('./config/passport');
    await initializePassport(passport);

    // Set up session middleware
    app.use(
      session({
        secret: process.env.SESSION_SECRET || "your-session-secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: MONGODB_URI,
          ttl: 14 * 24 * 60 * 60,
          autoRemove: 'native',
          touchAfter: 24 * 3600,
          crypto: {
            secret: process.env.SESSION_SECRET || "your-session-secret"
          }
        }),
        cookie: {
          secure: true,
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'none'
        }
      })
    );

    // Initialize passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Set up routes
    app.use('/auth', require('./routes/auth'));
    app.use('/api', require('./routes/api'));

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Add this after mongoose.connect
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
    });

  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
}

// Start the app
initializeApp();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
  console.error('Global error handler caught:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

module.exports = app;
