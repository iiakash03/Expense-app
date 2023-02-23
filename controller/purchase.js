const Razorpay=require('razorpay');
const Order=require('../models/order');

const purchasepremium=async(req,res)=>{
    try{
        var rzp=new Razorpay({
            key_id:'rzp_test_XtuZl7GNvpXVNl',
            key_secret:'EDM2Cf0XcJX8OwIR6jkPThTZ'
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
    //console.log(req.status)
   await Order.update({
    paymentid:req.body.payment_id,
    status:'SUCCESSFULL'
   }, 
    {
    where:{
        orderid:req.body.order_id
    }
   })
   await req.user.update({
        ispremiumuser:true
   })
   return res.status(200).json('payment done successfully');
}


module.exports={
    purchasepremium,
    updatetransactionstatus
}