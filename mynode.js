var fortune = require('./lib/fortune.js');

var express = require('express');
var app = express();

// 设置handlebars 视图引擎
var handlebars = require('express3-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
res.locals.showTests = app.get('env') !== 'production' &&
req.query.test === '1';
next();
});

app.get('/', function(req, res) {
res.render('home');
});

app.get('/about', function(req, res) {
res.render('about', {
fortune: fortune.getFortune(),
pageTestScript: '/qa/tests-about.js'
});
});

// 404 catch-all 处理器（中间件）
app.use(function(req, res, next){
res.status(404);
res.render('404');
});
// 500 错误处理器（中间件）
app.use(function(err, req, res, next){
console.error(err.stack);
res.status(500);
res.render('500');
});

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});
