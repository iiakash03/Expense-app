document.getElementById('buypremium').onclick=async function(e){
            
    const response=await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{"Authorization":token}})
    console.log(response);
    var options=
    {
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function(response){
            console.log(response)
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,    
            }
            ,{headers:{"Authorization":token}})

            alert('you are a premium user now')
            document.getElementById('buypremium').style.visibility='hidden';
            document.getElementById('bp').innerText='you are now an premium user'
               
        }
    }
    const rzp1=new Razorpay(options);
    rzp1.open()
    e.preventDefault();

    rzp1.on('payment failed',function(response){
        console.log(response)
        alert('something went wrong')
    });
}