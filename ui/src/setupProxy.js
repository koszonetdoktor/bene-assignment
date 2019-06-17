const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    const host = "http://localhost:3001"
    const urls = ["/users", "/authenticate", "/city", "/weather", "/validateCredentials"]
    urls.forEach(url => {
        app.use(proxy(url, { target: host }));
    })
};  