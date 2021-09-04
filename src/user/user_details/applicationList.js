import React,{useContext,useEffect,useState} from 'react';
import './details.css';
import Button from '../../ui/button';
import Personal from './personal';
import Work from './work';
import LoanDetails from './loanDetails';
import Residence from './resident';
import Doc from './doc';
import CoaAppDoc from './docCoapp';
import PdfView from './pdfView';
import {useHttp} from '../../shared/hooks/http_hook';
import {AuthContext} from '../../shared/context/auth_context';
import ViewData from './viewData';
import {route} from '../../route';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Info from './infoPage';
import VerifyPhone from './verifyPhone';
import Card from '../../ui/card';
import logo from '../../primary-kgpg-info.svg';
import Details from './details';

const Applications=(props)=>{
  let element,res,f,app_id;
  const auth=useContext(AuthContext);
  const [flag,setFlag]=useState(0);
  const [err,setErr]=useState(false);
  const [go,setGo]=useState(false);
  const {loading,error,sendReq,clearError}=useHttp();

  //window.location.reload();

  useEffect(()=>{
    const getFlag=async ()=>{
      const data={
        email:auth.email
      }
      try{
        res=await sendReq(
          route+"/api/accounts/get",
          "POST",
          JSON.stringify(data),
          {
            "Content-Type":"application/json",
            Authorization: "Bearer "+auth.token
          }
        );
        console.log(res);
        setFlag(res[0]);
        console.log(res[0].flag);
      }catch(err){
        console.log(err);
      } 
    }
    getFlag();
  },[sendReq,auth.email]);

  const clean=()=>{
    setErr(false);
  }

  const goDashboard=()=>{
    setGo(true)
  }

  if(loading){
    element=<Loader asOverlay />
  }else if(flag.phone==='not added'){
    element=<VerifyPhone user={auth}/>
  }else if(flag.is_admin || flag.is_sales_op || flag.is_credit_op || flag.is_superuser){

  }else if(flag.coapp_flag==="coapp"){
    element=(
      <Card className="authentication" style={{top:"8rem",borderRadius:"1.25rem",marginBottom:'12rem',textAlign:'start'}}>
      <><center><h5 style={{fontWeight:'900'}}>Co-Applicant ?</h5></center><img src={logo} className="logo" alt="logo"/>
      <br/>
      <h6>1. Find and confirm Applicant by Loan-ID/EMail</h6>
      <h6>2. Fill up Application</h6>
      <h6>3. Submit</h6></>
      <center><Button onClick={goDashboard}>OK</Button></center>
      </Card>
    )
  }else{
    f=parseInt(flag.flag);

    if(flag && flag.loan_flag==='sbmt'){

      if(flag['coapp_flag'].includes('req')){
        app_id=flag.coapp_flag.split(" ").slice(-1)[0];
        if(f<6){
          element=<LoanDetails app_id={app_id} sbmt={flag.loan_flag} flag={2}/>
        }else{
          element=<Info/>
        }
      }

      /*if(flag.coapp_flag==="coapp"){
        if(f<6){
          element=<LoanDetails sbmt={flag.loan_flag} flag={1}/>
        }else{
          element=<Info/>
        }
        

      }*/

      else if(flag.coapp_flag==='not sbmt'){
        if(f===0){
          element=<LoanDetails sbmt={flag.loan_flag} flag={1}/>
        }else if(f===4){
          element=<Doc sbmt={flag.loan_flag} flag={f}/>
        }else if(f===5){
          element=<Doc sbmt={flag.loan_flag} flag={5}/>
        }else if(f===6){
          element=<Info/>
        }
      }

    }

    else if (flag && flag.loan_flag==='not sbmt' && flag.coapp_flag==='not sbmt'){

      if(f===0){
        element=<Personal flag={f}/>
      }else if(f===1){
         element=<LoanDetails flag={f}/>
      }else if(f===2){
         element=<Residence flag={f}/>
      }else if(f===3){
        element=<Work flag={f}/>
      }else if(f===4){
        element=<Doc flag={f}/>
      }else if(f===5){
        element=<Doc flag={5}/>
      }else if(f===6){
        element=<Info/>
      }

    }
    /*else if (flag && flag.loan_flag==="not sbmt" && flag.coapp_flag==="coapp"){

        if(f<6){
          element=<LoanDetails mode={flag.coapp_flag} flag={2}/>
        }else{
          element=<Info/>
        }
        

    }*/
    else if(flag && flag.loan_flag==="not sbmt" && flag.coapp_flag.includes('req')){

        app_id=flag.coapp_flag.split(" ").slice(-1)[0];
        if(f<6){
          element=<Personal mode='req' flag={f} app_id={app_id}/>
        }else{
          element=<Info/>
        }
        
    }

  }
  
  

	return(
		<React.Fragment>
    <Err error={error} onClear={clearError}/>
    <Err error={err} onClear={clean}/>
		<div className="jumbotron">
    <div className="container">
      <h5>Hi, {auth.name && auth.name.split(" ")[0]}</h5>
    </div>
  </div>
  {go ? <Details/> : element}
  
  </React.Fragment>
	);
};

export default Applications;
