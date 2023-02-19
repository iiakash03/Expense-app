const User=require('../models/user');
const bcrypt=require('bcrypt');
const { response } = require('express');

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
    .catch(err=>{
        console.log(err);
    })
}