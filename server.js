var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001;
var mongoose = require('mongoose');
require('dotenv').config();
var bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route

app.listen(port);
console.log('dev-per-hour-api API server started on: ' + port);


var connStr = process.env.MONGO_DB;
mongoose.connect(connStr,
    {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            },
            function(err) {
                if (err) throw err;
                console.log('Successfully connected to MongoDB');
            }
);