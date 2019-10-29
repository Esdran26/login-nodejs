const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//MiddleWAres
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'database_links'
}, 'single'));

//Routes
app.use(require('./routes/route'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));


//Server Listens
app.listen(app.get('port'), () => {
    console.log("Server on port: ", app.get('port'));
});