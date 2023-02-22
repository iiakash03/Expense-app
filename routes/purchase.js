const userAuthentication=require('../middleware/userauth')

const purchaseController=require('../controller/purchase');

const express=require('express');

const route=express.Router();

route.get('/premiummembership',userAuthentication.authenticate,purchaseController.purchasepremium)

route.post('/updatetransactionstatus',userAuthentication.authenticate,purchaseController.updatetransactionstatus)

//router.post('/updatetransactionstatus',authenticatemiddleware.authenticate,purchaseController)

module.exports=route;