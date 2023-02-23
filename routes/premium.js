const userAuthentication=require('../middleware/userauth')

const purchaseController=require('../controller/purchase');

const premiumController=require('../controller/premiumuser');

const express=require('express');

const route=express.Router();

route.get('/showLeaderBoard',premiumController.leaderboard);

module.exports=route;

