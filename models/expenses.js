const sequelize=require('../util/database');
const Sequelize=require('sequelize');
const Expense=sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    expense:Sequelize.STRING,
    price:{
        type:Sequelize.STRING,
        allowNull:false,
    },

    description:{
        type:Sequelize.TEXT,
        allowNull:false,
    }

})
module.exports=Expense;