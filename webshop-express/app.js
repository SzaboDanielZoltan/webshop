const createError = require('http-errors');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const productsRouter = require('./routes/products');
const loginRouter = require('./routes/login');
const basketRouter = require('./routes/basket');
const ordersRouter = require('./routes/orders');
const apiRouter = require('./routes/api');
const registerRouter = require('./routes/register');
const settingsRouter = require('./routes/settings');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Favicon middleware added
app.use(favicon(path.join(__dirname, 'public', 'images', 'icons', 'favicon.ico')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use(require('./modules/cookieValidator'));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/products', productsRouter);
app.use('/login', loginRouter);
app.use('/basket', basketRouter);
app.use('/register', registerRouter);
app.use('/orders', ordersRouter);
app.use('/api', apiRouter);
app.use('/settings', settingsRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
