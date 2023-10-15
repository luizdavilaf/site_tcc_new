const express = require('express');
const app = express();
const sync = require('./src/models/sync')
db = require('./db/dbconnection');
sequelize = require("./db/sequelize-connection");

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const noAuthRoutes = require('./src/routes/index');
app.use('/noauth', noAuthRoutes);






app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000");
});