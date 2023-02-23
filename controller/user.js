const User=require('../models/user');
const expense=require('../models/expenses');
const bcrypt=require('bcrypt');
const express = require('express');
const jwt=require('jsonwebtoken');

exports.userRegister=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password

    bcrypt.hash(password,10,async(err,hash)=>{
        console.log(err)
    await User.create({
        name,
        email,
        password:hash,
        ispremiumuser:false
    })
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    })

})
}

exports.userLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    obj={
        email,
        password
    }
    
    User.findAll({
        where:{email:email}    
    })
    .then((data)=>{
        if(data.length>0){
            req.user=data
            bcrypt.compare(password,data[0].password,(err,response)=>{
                if(response){
                    return res.status(200).json({message:'successfully authenticated' ,token:generateAccessToken(data[0].id,data[0].name,data[0].ispremiumuser)});
                }else{
                    res.send('wrong password');
                }
            })
        }else{
            res.send("User not found");
        }

    })
    .then((dt)=>{
        console.log(dt);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postAddElements=(req,res,next)=>{

    const product=req.body.productname
    const price=req.body.price
    const desc=req.body.description
    console.log('request',req.user);

    expense.create({
        expense:product,
        price:price,
        description:desc,
        userId:req.user.id
        
    })
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.getElements=(req,res,next)=>{
    const userId=req.user.dataValues.id;
    expense.findAll({
        where:{
            userId:userId
        }
    }
    )
    .then(data=>{
        res.json(data);
    })
}

exports.deleteExpense=(req,res,next)=>{
    const id=req.params.userId;
    console.log(id);
    expense.destroy({where:{id:id}})
    .then(()=>{
        res.sendStatus(200);
    })
    .catch(err=>{
        console.log(err);
    })
}

function generateAccessToken(id,name,ispremiumuser){
    return jwt.sign({userId:id,name:name,ispremiumuser:ispremiumuser},'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
}