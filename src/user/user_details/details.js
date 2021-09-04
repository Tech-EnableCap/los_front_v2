import React,{useContext,useEffect,useState} from 'react';
import './details.css';
import Button from '../../ui/button';
import Personal from './personal';
import Work from './work';
import Doc from './doc';
import PdfView from './pdfView';
import {useHttp} from '../../shared/hooks/http_hook';
import {AuthContext} from '../../shared/context/auth_context';
import ViewData from './viewData';
import {route} from '../../route';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import CustomerDashboard from './customerDashboard';
import CompanyDashboard from '../../user/sales_details/salesDashboard';

const Details=(props)=>{
  let element,res,f;
  const auth=useContext(AuthContext);
  const [flag,setFlag]=useState(null);
  const [err,setErr]=useState(false);
  const {loading,error,sendReq,clearError}=useHttp();

  //window.location.reload();

  useEffect(() => {
      if(auth.token && auth.email && !flag)
        getFlag()
    },[sendReq,auth,setFlag]);

  const getFlag=async ()=>{
    const data={
      id:auth.userId
    }
    try{
      res=await sendReq(
        route+"/api/accounts/getdashboarddata",
        "POST",
        JSON.stringify(data),
        {
          "Content-Type":"application/json",
          Authorization: "Bearer "+auth.token
        }
      );
      console.log(res);
      setFlag(res[0]);
    }catch(err){
      console.log(err);
    } 
  }

  const clean=()=>{
    setErr(false);
  }

  if(loading){
    element=<Loader asOverlay />
  }else if(flag){
    console.log(flag);
    if(!flag.is_superuser && !flag.is_sales_op && !flag.is_credit_op && !flag.is_admin){
      element=<CustomerDashboard sbmt={flag.loan_flag} all_data={flag}/>
    }else if(flag.is_sales_op){
      element=<CompanyDashboard type="sales"/>
    }else if(flag.is_credit_op){
      element=<CompanyDashboard type="credit"/>
    }else if(flag.is_admin){
      element=<CompanyDashboard type="admin"/>
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
  {element}
  
  </React.Fragment>
  );
};

export default Details;
