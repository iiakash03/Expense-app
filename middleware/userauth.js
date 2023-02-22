const User=require('../models/user');
const jwt=require('jsonwebtoken');

const authenticate=(req,res,next)=>{

 try{
    const token=req.header('Authorization')
    const user=jwt.verify(token,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
    //console.log('user>>>',user);
    User.findByPk(user.userId)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>{
        console.log(err);
        return res.status(401).json('not found user');

    })
}catch(err){
    console.log('in middleware error occured');
}
}

module.exports={
    authenticate
};



