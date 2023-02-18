const User=require('../models/user');

exports.userRegister=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password

    User.create({
        name:name,
        email:email,
        password:password
    })
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    })
}