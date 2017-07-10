var express = require('express');
var router = express.Router();
var cron = require('cron');
/* GET home page. */
router.get('/', function (req, res, next) {
//    res.render('index', {title: 'Express'});
//
//    var job1 = new cron.CronJob({
//        cronTime: '* * * * *',
//        onTick: function () {
//            console.log('job 1 ticked');
//        },
//        start: false,
//        timeZone: 'America/Los_Angeles'
//    });
//
//    var job2 = new cron.CronJob({
//        cronTime: '* * * * *',
//        onTick: function () {
//            console.log('job 2 ticked');
//        },
//        start: false,
//        timeZone: 'America/Los_Angeles'
//    });
    var job3 = new cron.CronJob('1 * * * * *', function () {
        console.log('You will see this message every 1 minute');
    }, null, true, 'America/Los_Angeles');
    job3.start(); //job 3 started
    console.log('job3 status', job3.running); // job2 status undefined
});

module.exports = router;
