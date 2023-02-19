const User=require('../models/user');
const expense=require('../models/expenses');
const bcrypt=require('bcrypt');
const express = require('express');

exports.userRegister=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password

    bcrypt.hash(password,10,async(err,hash)=>{
        console.log(err)
    await User.create({
        name,
        email,
        password:hash
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
    req.user=obj;
    User.findAll({
        where:{email:email}
        
        
    })
    .then((data)=>{
        
        if(data.length>0){
            bcrypt.compare(password,data[0].password,(err,response)=>{
                if(response){
                    res.send('successfully authenticated');
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

    console.log(req.body);

    const product=req.body.productname
    const price=req.body.price
    const desc=req.body.description
    console.log(req.body);

    expense.create({
        expense:product,
        price:price,
        description:desc
    })
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.getElements=(req,res,next)=>{
    expense.findAll()
    .then(data=>{
        res.json(data);
    })
}