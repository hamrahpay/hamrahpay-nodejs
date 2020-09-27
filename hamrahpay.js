/**
 * Hamrahpay.com Node.js Module
 * @module Hamrahpay.com
 * @author Hamrahpay Team <hamrahpay[at]gmail.com>
 * @copyright Hamrahpay.com 2020
 * @version 1.0.0
 * @license Apache-2.0
 */

 class Hamrahpay
 {
     #callback_url;
     /**
     * Set API Key in Constructor
     * @param {string} api_key ,API Key of your bussiness.
     * @throws , throw if API Key is Invalid
     */
    constructor(api_key){
        if(api_key != '' && typeof api_key === 'string'){
            this.axios = require('axios');
            this.api_key = api_key;
            this.api_version = 'v1';
            this.pay_request_format = 'raw';
            this.api_url = 'https://api.hamrahpay.com/api';
            this.second_api_url = 'https://api.hamrahpay.ir/api';
        }
        else
            throw new Error('Your api_key is invalid or not sets');
    }

	
	PayRequest(params)
	{

        return this.axios.post(this.api_url+'/v1/rest/pg/pay-request', {
            api_key: this.api_key,
            amount: params.Amount,
            customer_name: params.CustomerName,
            email:params.Email,
            mobile:params.Mobile,
            description: params.Description,
            callback_url:params.CallbackUrl,
            allowed_cards:params.AllowedCards,
            wages:params.Wages,
          });

	}
	VerifyPayment(payment_token)
	{
    
        return this.axios.post(this.api_url+'/v1/rest/pg/verify', {
            api_key: this.api_key,
            payment_token: payment_token,
          });
    }
    
    getUnverfiedTransactions()
    {
        return this.axios.post(this.api_url+'/v1/rest/pg/get-unverfied-payments', {
            api_key: this.api_key,
          });
    }


 }

 module.exports = Hamrahpay;