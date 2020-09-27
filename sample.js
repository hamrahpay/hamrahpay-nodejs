const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const Hamrahpay = require('./hamrahpay');
const gateway = new Hamrahpay('YOUR-API-KEY');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    
    gateway.PayRequest(
        {
            Amount:10000,
            CustomerName:"Ali",
            Description:"Test Transaction",
            CallbackUrl:'http://localhost:'+port+'/verify-payment'
        })
        .then(function(response){
            let payUrl = response.data.pay_url;
            res.redirect(payUrl);
        })
        .catch(function(error){

            const code = parseInt(error.response && error.response.status)
            if (code == 400) {
                var errorMessge="Parameters Validation Error : ";
                errorMessge+=error.response.data.invalid_fields.join();
                console.error(errorMessge);
            }
            //console.log(JSON.stringify(error))
        });
    
});

app.get('/verify-payment', function(req, res){

    gateway.VerifyPayment(req.query.payment_token)
    .then(function(response){
        if (response.data.status==100)
        {
            console.log('Reference Number: ' + response.data.reference_number);
            console.log('Reserve Nimber ' + response.data.reserve_number);
            console.log('Amount: ' + response.data.amount);
            res.end('Succeed Payment');
        }
        else if (response.data.status==101)
        {
            console.log('Amount: ' + response.data.amount);
        }
        else
        {
            res.end('Error in Payment');
        }
        
    })
    .catch(function(error){
        
        console.log(error)
    });
});


app.get('/get-unverfied-transactions', function(req, res){

    gateway.getUnverfiedTransactions()
    .then(function(response){
        res.end(JSON.stringify(response.data));
    })
    .catch(function(error){
        
        console.log(error)
    });
});

app.listen(port, function () {
  console.log('Hamrahpay Example app listening on port ' + port);
});
