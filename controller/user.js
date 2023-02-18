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

exports.userLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    User.findAll({
        where:{email:email}
    })
    .then((data)=>{
        console.log(data[0].password);
        if(data.length>0){
            if(data[0].password===password){
                res.send('successfully authenticated');
            }else{
                res.send('wrong password');
            }
        }else{
            res.send("User not found");
        }

    })
    .catch(err=>{
        console.log(err);
    })
}