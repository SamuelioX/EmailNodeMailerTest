var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var cron = require('cron');
var index = require('./routes/index');
var users = require('./routes/users');
var request = require('request');

var app = express();

app.use(express.static('./public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/sendEmail', require('./routes/sendEmail'));
//app.use('/cronEmail', require('./routes/cronEmail'));

console.log('Node is installed');
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var job3 = new cron.CronJob('1 * * * * *', function () {
    var rec = [];
    rec.push(process.env.TESTEMAILRECIP);
    var subject = 'test';
    var body = 'test';

    var email = {
        receivers: rec,
        subject: subject,
        body: body
    };
    request.post(
            'http://localhost:3000/sendEmail',
            //copy the API from fieldglass to get the data here
                    {json: email},
//                    {
//                        url: 'localhost:3000/sendEmail',
//                        form: email
//                    },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body);
                        } else {
                            console.log(error);
                        }

                    }
            );
            console.log('You will see this message every 1 minute');
        }, null, true, 'America/Los_Angeles');
job3.start(); //job 3 started
console.log('job3 status', job3.running); // job2 status undefined

module.exports = app;
