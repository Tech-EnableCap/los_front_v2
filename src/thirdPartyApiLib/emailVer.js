import Url from './base';
import axios from 'axios';

class EmailVer extends Url {
    static rqId;

    static async sendOTP(email) {
        let body = {
            "email": email,
            "notification": {
              "emails": [
                ""
              ],
              "webhook": true,
              "webhookConfig": {
                "url": "https://enablecap.in"
              }
            }
          }

        let header = {
            "Content-Type" : "application/json",
            "x-karza-key" : this.keys["karza"]
        }
        
        let resp = await new Promise((resolve, reject) => {
            axios.post(this.emailVerApiSendOTP, body, {
                    headers : header
                })
                .then(res => {
                    console.log(res);
                    this.rqID = res['data']['requestId'];
                    resolve(this.rqID);
                    //console.log(this.rqID);
                })
                .catch(err => reject(err));
        }); 
        return resp;
    }

    static async verifyOTP(otp) {
        let body = {
            "requestId": this.rqID,
            "otp": otp
          }

        let header = {
            "Content-Type" : "application/json",
            "x-karza-key" : this.keys["karza"]
        }

        let res = await new Promise((resolve, reject) => {
            axios.post(this.emailVerApiOTPStatus, body, {
                    headers : header
                })
                .then(resp => {
                    if(resp['data']['statusCode'] === 101) {
                        resolve(resp['data']['result']['message']);
                    }
                    else {
                        reject(resp['data']);
                    }
                })
                .catch(err => reject(err));
        });    

        return res;
    }
}

export default EmailVer;