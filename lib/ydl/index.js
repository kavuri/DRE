var express = require('express');
var app = module.exports = express();

// Middleware to enable Yodlee usecase of not having authentication with every
// API call. The patient key is replaced in the req.user.username since, it
// is used in every API call. Instead just change the field in this interceptor
app.use(function(req, res, next) {
    if (req.headers['pat_key']) {
      req.user = {username : req.headers['pat_key']};
    }
    next();
});
