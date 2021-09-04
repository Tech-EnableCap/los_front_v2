import Url from "./base";
import axios from "axios";

class EFX extends Url {
    static body = {
        "RequestHeader":{
           "CustomerId": this.keys["efxCustId"],   //,
           "UserId": this.keys["efxUserId"], //   ,
           "Password": this.keys["efxPassword"], //,
           "MemberNumber": this.keys["efxMemberNo"],   //,
           "SecurityCode":this.keys["efxSecurityCode"], //,
           "CustRefField":"", //"EFXEC15d85e8624d0ab5",
           "ProductCode":[
              "CCR"
           ]
        },
        "RequestBody":{
           "InquiryPurpose":"00",
           "FirstName":"",  //name
           "MiddleName":"",
           "LastName":"", //name
           "DOB":"", //dob
           "InquiryAddresses":[
              {
                 "seq":"1",
                 "AddressType":[
                    "H"
                 ],
                 "AddressLine1":"", //addr
                 "State":"", //state
                 "Postal":"" //postal pin
              }
           ],
           "InquiryPhones":[
              {
                 "seq":"1",
                 "Number":"", //mob
                 "PhoneType":[
                    "M"
                 ]
              }
           ],
           "IDDetails":[
              {
                 "seq":"1",
                 "IDType":"T",
                 "IDValue":"", //pan
                 "Source":"Inquiry"
              },
              {
                 "seq":"2",
                 "IDType":"P",
                 "IDValue":"",
                 "Source":"Inquiry"
              },
              {
                 "seq":"3",
                 "IDType":"V",
                 "IDValue":"",
                 "Source":"Inquiry"
              },
              {
                 "seq":"4",
                 "IDType":"D",
                 "IDValue":"",
                 "Source":"Inquiry"
              },
              {
                 "seq":"5",
                 "IDType":"M",
                 "IDValue":"",
                 "Source":"Inquiry"
              },
              {
                 "seq":"6",
                 "IDType":"R",
                 "IDValue":"",
                 "Source":"Inquiry"
              },
              {
                 "seq":"7",
                 "IDType":"O",
                 "IDValue":"",
                 "Source":"Inquiry"
              }
           ],
           "MFIDetails":{
              "FamilyDetails":[
                 {
                    "seq":"1",
                    "AdditionalNameType":"K02",
                    "AdditionalName":""
                 },
                 {
                    "seq":"2",
                    "AdditionalNameType":"K02",
                    "AdditionalName":""
                 }
              ]
           }
        },
        "Score":[
           {
              "Type":"ERS",
              "Version":"3.1"
           }
        ]
     };

     static async getEfx(data) {
         this.body["RequestBody"]["FirstName"] = data["fname"];
         this.body["RequestBody"]["MiddleName"] = data["mname"];
         this.body["RequestBody"]["LastName"] = data["lname"];
         this.body["RequestBody"]["DOB"] = data["dob"];
         this.body["RequestBody"]["InquiryAddresses"][0]["AddressLine1"] = data["addr1"];
         this.body["RequestBody"]["InquiryAddresses"][0]["State"] = data["state"];
         this.body["RequestBody"]["InquiryAddresses"][0]["Postal"] = data["postal"];
         this.body["RequestBody"]["InquiryPhones"][0]["Number"] = data["mob"];
         this.body["RequestBody"]["IDDetails"][0]["IDValue"] = data["pan"];
         this.body["RequestHeader"]["CustRefField"] = "EFX" + data["pan"];
         
         let res = await new Promise((resolve, reject) => {
            axios.post(this.efx_api, this.body).then(response => resolve(response)).catch(err => reject(err));
         });

         return res;
     }

}

export default EFX;