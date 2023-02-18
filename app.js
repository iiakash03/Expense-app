const userroutes=require('./routes/user');

var cors = require('cors')



const express=require('express');
const app=express();
const sequelize=require('./util/database');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())


app.use(userroutes);
app.set('view engine', 'ejs');
app.set('views', 'views');

sequelize
.sync({force:true})
.then(result=>{
    app.listen(3000);
})


