const isReachable = require('is-reachable-r');
const web = require('./websites.json');
const extIP = require('external-ip');
 var serverIp = process.argv.slice(2)[0];

let getIP = extIP({
    replace: true,
    services: ['http://ifconfig.co/x-real-ip', 'http://ifconfig.io/ip'],
    timeout: 600,
    getIP: 'parallel',
    userAgent: 'Chrome 15.0.874 / Mac OS X 10.8.1'
});
 
getIP((err, ip) => {
    if (err) {
        throw err;
    }
    serverIp = ip;
 });
 
var totalWebsites = 0;
var fail = 0;
var pass = 0;
var finalFailReport = [];
var to = 50000;


web.websites.forEach(function (element) {
    isReachable(element.domain,{timeout:to}).then(res => {
        totalWebsites++;
        console.log(element.domain, res)
        if (res.reachable) {
            pass++;
        } else {
            fail++
            finalFailReport.push({
                domain: element.domain,
                reason: res.reason
            })
        }
        if (web.websites.length == totalWebsites) {
            done();
        }
    });

}, this);

function done() {
    console.log("Result for server ip:", serverIp)
    console.log("Total fail:", fail)
    console.log("Total Pass:", pass)
    console.log("Total :", totalWebsites)
    console.log("Timeout :", to)

    console.log(finalFailReport)
}
