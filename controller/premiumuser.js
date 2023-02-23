const Order=require('../models/order');
const User=require('../models/user');
const expense=require('../models/expenses');


const leaderboard=async (req,res,next)=>{
    const users=await User.findAll();
    const Expense=await expense.findAll();
    const aggregatedExpense={};
    Expense.forEach(element => {
        if(aggregatedExpense[element.userId]){
            aggregatedExpense[element.userId]+=element.price*1
        }else{
            aggregatedExpense[element.userId]=element.price
        }
        
    });
    console.log(aggregatedExpense);
    const userDetails=[];
    users.forEach(user=>{
        userDetails.push({name:user.name,amount:aggregatedExpense[user.id]})
    })
    console.log(userDetails);
    res.status(200).send(userDetails); 
}

module.exports={
    leaderboard
}