const Razorpay=require('razorpay');
const Order=require('../models/order');

const purchasepremium=async(req,res)=>{
    try{
        var rzp=new Razorpay({
            key_id:'rzp_test_RLpfMYdI12pPRn',
            key_secret:'OvWsoq01szdooyEvNRNyPpuY'
        })

        rzp.orders.create({
            amount:502000,
            currency:"INR"
        },(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({
                orderid:order.id,status:'PENDING'})
                .then(()=>{
                    return res.status(201).json({order,key_id:rzp.key_id})
                })
                .catch(err=>{
                    throw new Error(err);
                })
        })
    }catch(err){
        console.log(err);
        res.status(403).json({message:'Something went wrong',error:err})
    }
}


const updatetransactionstatus=async (req,res,next)=>{
   await Order.update({
    paymentid:req.body.payment_id,
    status:'SUCCESSFULL'
   }, 
    {
    where:{
        orderid:req.body.order_id
    }
   })
}


module.exports={
    purchasepremium,
    updatetransactionstatus
}