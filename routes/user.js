const userController=require('../controller/user');

const express=require('express');

const route=express.Router();

route.post('/register',userController.userRegister);

route.post('/login',userController.userLogin);

route.get('/',userController.getElements);

route.post('/add-expense',userController.postAddElements);

module.exports=route;