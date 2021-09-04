import Url from "./base";
import axios from "axios";

class ESign extends Url {
    static getCoor(isCoApp) {
        if(isCoApp) {
            return({ 
                '0' : {
                    "1": [
                        {
                            "llx": 160,
                            "lly": 177,
                            "urx": 286,
                            "ury": 194
                        }
                    ],
                    "3": [
                        {
                            "llx": 67,
                            "lly": 144,
                            "urx": 202,
                            "ury": 168
                        }
                    ],
                    "7": [
                        {
                            "llx": 161,
                            "lly": 507,
                            "urx": 287,
                            "ury": 535
                        }
                    ]
                },
                '1' : {
                    "1": [
                        {
                            "llx": 433,
                            "lly": 158,
                            "urx": 578,
                            "ury": 191
                        }
                    ],
                    "7": [
                        {
                            "llx": 440,
                            "lly": 496,
                            "urx": 585,
                            "ury": 526
                        }
                    ]
                }
            });
        }
        else {
            return({ 
                '0' : {
                    "1": [
                        {
                            "llx": 160,
                            "lly": 177,
                            "urx": 286,
                            "ury": 194
                        }
                    ],
                    "3": [
                        {
                            "llx": 67,
                            "lly": 144,
                            "urx": 202,
                            "ury": 168
                        }
                    ],
                    "7": [
                        {
                            "llx": 161,
                            "lly": 507,
                            "urx": 287,
                            "ury": 535
                        }
                    ]
                }
            });
        }
        
    }

    static async sendRequest(data, formData, isCoApp) {
        
        let body = {}
        body['signers'] = (isCoApp ? [
            {
                'identifier' : data['appPhone'],
                'name' : 'appName',
                'sign_type' : 'electronic',
            },
            {
                'identifier' : data['coAppPhone'],
                'name' : 'appName',
                'sign_type' : 'electronic',
            }
        ] : [
            {
                'identifier' : data['appPhone'],
                'name' : 'appName',
                'sign_type' : 'electronic',
            }]);
        body['send_sign_link'] = true;
        body['notify_signers'] = true;
        body['file_name'] = data['fileName'] + ".pdf";
        body['display_on_page'] = 'custom';
        body['sign_coordinates'] = this.getCoor(isCoApp);
        body['templates'] = [{
            'template_key' : (isCoApp ? 'TMP2103311223419059MCFY81KLAEYJB' : 'TMP2103311223419059MCFY81KLAEYJB'),
            'template_values' : formData
        }]
        //console.log(body);

        let key = this.keys['digioClientid'] + ':' + this.keys['digioClientSecret'];
        let header = {
            'Authorization' : 'Basic ' + Buffer.from(key).toString('base64'),
            'Content-Type' : 'application/json'
        }

        console.log(body)

        let res = await new Promise((resolve, reject) => {
            axios.post(this.e_signApi, body, {
                headers : header
            }).then(res => {
                console.log(res);
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });

    }
}

export default ESign;


/*

tmp_val.put("processing_fee",input.Processing_Fee);
				tmp_val.put("advance_emi_amount",input.Advance_EMI);
				tmp_val.put("course_name",input.Course_Name);
				tmp_val.put("institute_name",input.Institute_Name);
				tmp_val.put("borrower_name",input.app_Name);
				tmp_val.put("date_of_subsequent_emis",input.Date_of_Subsequent_EMIs); 
				tmp_val.put("loanee_address",input.appPermanentAddress);
				tmp_val.put("loan_id",input.lid);
				tmp_val.put("loan_amount",input.Loan_in_fig);
				tmp_val.put("loan_in_words",input.Loan_in_Words);
				ad = input.coappCurrentAddress.toList(",");
				tmp_val.put("place_guarantor",ad.get(2));   /// city ?? 
				tmp_val.put("date_guarantor",addDay(zoho.currentdate,date_inc));  /// cur_date+7 ??
				
				//alert addDay(zoho.currentdate,1);
				tmp_val.put("net_tenure",input.Net_Tenure);
				tmp_val.put("no_of_advance_emis",input.No_of_Advance_EMI);
				tmp_val.put("amount_of_emi",input.EMI_Amt);
				tmp_val.put("loan_in_fig",input.Loan_in_fig);
				tmp_val.put("rate_of_interest",input.Rate_of_Interest);
				tmp_val.put("month_name",MonthsOfYear.get(month(addDay(zoho.currentdate,date_inc)))); /// cur_monthname (date_guarantor_month)
				tmp_val.put("emi_end_date",input.EMI_End_Date);
				tmp_val.put("loanee_name",input.app_Name);
				ad = input.appCurrentAddress.toList(",");
				tmp_val.put("place_borrower",ad.get(2));
				tmp_val.put("date_borrower",addDay(zoho.currentdate,date_inc));
			
				tmp_val.put("date_of_emi",input.EMI_Start_Date);
		
				tmp_val.put("commencement_of_advance_emi",input.Commencemet_of_Advance_EMI);
				tmp_val.put("acc_number",input.appBankAC);
				tmp_val.put("guarantor_name",input.coappName);
				tmp_val.put("gross_tenure",input.Gross_Tenure);
		
				tmp_val.put("ifsc_code",input.appIfsc);
				tmp_val.put("emi_start_date",input.EMI_Start_Date);

        */