const userAuthentication=require('../middleware/userauth')

const userController=require('../controller/user');

const express=require('express');

const route=express.Router();

route.post('/register',userController.userRegister);

route.post('/login',userController.userLogin);

route.get('/',userAuthentication.authenticate,userController.getElements);

route.post('/add-expense',userAuthentication.authenticate,userController.postAddElements);

route.delete('/delete-expense/:userId',userController.deleteExpense);

module.exports=route;