const userController=require('../controller/user');

const express=require('express');

const route=express.Router();

route.post('/register',userController.userRegister);

module.exports=route;