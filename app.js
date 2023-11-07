const express = require('express');
const app = express();
const sync = require('./src/models/sync')
db = require('./db/dbconnection');
sequelize = require("./db/sequelize-connection");

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/noauth/views/dashboard');
});

const noAuthRoutes = require('./src/routes/index');
app.use('/noauth', noAuthRoutes);






app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000");
});