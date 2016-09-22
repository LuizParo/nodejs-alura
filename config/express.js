var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');

module.exports = function() {
    var app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended : true}));
    app.use(express.static('./app/public'));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use(methodOverride('_method'));

    load('routes', {cwd : 'app'})
        .then('infra')
        .into(app);

    
    app.use(function(req, res, next) {
        res.status(400).render('erros/404');
    });

    app.use(function(error, req, res, next) {
        if(process.env.NODE_ENV == 'production') {
            res.status(500).render('erros/500');
        }
        next(error);
    });

    return app;
}