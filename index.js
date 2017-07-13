const isReachable = require('is-reachable');
const web = require('./websites.json');

web.websites.forEach(function (element) {
    isReachable("www"+element.domain).then(reachable => {
        console.log("website", element.domain, reachable);
    });

}, this);