const isReachable = require('is-reachable-r');
const web = require('./websites.json');
var totalWebsites = 0;
var fail = 0;
var pass = 0;
var finalFailReport = [];
var to = 50000;

var serverIp = process.argv.slice(2)[0];

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
