var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001;

var routes = require('./api/routes/testRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('dev-per-hour-api API server started on: ' + port);