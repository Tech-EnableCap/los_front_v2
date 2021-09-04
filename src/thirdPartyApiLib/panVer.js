import Url from './base';
import axios from 'axios';

class PanVer extends Url {
    static async sendData(pan, name, dob) {
        let body = {
            "pan": pan,
            "name": name,
            "dob": dob, // dd/mm/yyyy
            "consent": "Y"
        };

        console.log(pan,name,dob);

        let header = {
            "Content-Type" : "application/json",
            "x-karza-key" : this.keys["karza"]
        };

        let prm = await new Promise((resolve, reject) => {
            axios.post(this.panVerApi, body, {
                headers : header
            }).then(res => {
                console.log(res);
                if(res['data']['status-code'] === "101")
                    resolve(res['data']['result'])
                else
                    reject(res['data']['status-code']);
            })
            .catch(err => reject(err));
        });

        return prm;         
    }
}

export default PanVer;