const sequelize=require('../util/database');
const Sequelize=require('sequelize');

const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },

    password:{
        type:Sequelize.TEXT,
        allowNull:false,
    },

})

module.exports=User;