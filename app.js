const userroutes=require('./routes/user');

const User=require('./models/user');
const Expense=require('./models/expenses');
const Order=require('./models/order');
const purchaseroutes=require('./routes/purchase');

var cors = require('cors')

const express=require('express');
const app=express();
const sequelize=require('./util/database');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

app.use(userroutes);
app.use('/purchase',purchaseroutes);



app.set('view engine', 'ejs');
app.set('views', 'views');

User.hasMany(Expense);
Expense.hasOne(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
//.sync({force:true})
.sync()
.then(result=>{
    app.listen(3000);
})


