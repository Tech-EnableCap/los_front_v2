import Url from './base';
import axios from 'axios';

class MobVer extends Url {
    static mobileNo = "";
    static rqID = "";
    static rqSt = false;
    
    static async sendOTP(mob) {
        this.mobileNo = mob;
        let body = {
            "mobile": this.mobileNo,
            "consent": "y"
        }

        let header = {
            "Content-Type" : "application/json",
            "x-karza-key" : this.keys["karza"]
        }
        //console.log(this.keys['karza']);
        let resp = await new Promise((resolve, reject) => {
            axios.post(this.mobVerApiSendOTP, body, {
                    headers : header
                })
                .then(res => {
                    //console.log(res);
                    this.rqID = res['data']['request_id'];
                    resolve(this.rqID);
                    //console.log(this.rqID);
                })
                .catch(err => reject(err));
        }); 
        return resp;
    }

    static async verifyOTP(otp) {
        let body = {
            "request_id": this.rqID,
            "otp": otp
          }

        let header = {
            "Content-Type" : "application/json",
            "x-karza-key" : this.keys["karza"]
        }

        let res = await new Promise((resolve, reject) => {
            axios.post(this.mobVerApiOTPStatus, body, {
                    headers : header
                })
                .then(resp => {
                    console.log(resp);
                    this.rqSt = resp['data']['result']['sim_details']['otp_validated'];
                    resolve(this.rqSt);
                    //console.log(this.rqID);
                })
                .catch(err => reject(err));
        });    

        return res;
    }
}

export default MobVer;