import React,{useState,useEffect,useContext} from 'react';
import './details.css';
import {AuthContext} from '../../shared/context/auth_context';
import Card from '../../ui/card';
import {useHttp} from '../../shared/hooks/http_hook';
import {route} from '../../route';
import Loader from '../../ui/loader.js';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE,VALIDATOR_NUMBER} from '../../shared/util/validator';
import {Link} from 'react-router-dom'
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import {useForm} from '../../shared/hooks/form_hook';
import SweetAlert from 'react-bootstrap-sweetalert';
import LoanForm from './loan_form';

const UserData=()=>{
	let element,res;
	const auth=useContext(AuthContext);
	const [flag,setFlag]=useState(null);
  	const [err,setErr]=useState(false);
  	const [bal,setBal]=useState(false);
  	const [viewbal,viewSetBal]=useState(false);
  	const [loangiven,setLoangiven]=useState(false);
  	const [loanrec,setLoanrec]=useState(false);
  	const [pend,setPend]=useState(false);
  	const [amt,setAmt]=useState();
  	const {loading,error,sendReq,clearError}=useHttp();
  	const [formState,inputHandler,setFormData]=useForm(
		{
			amount:{
				value:'',
				isValid:false
			},
		},false
	);

	useEffect(() => {
      if(auth.token && auth.email)
        getFlag()
    },[sendReq,auth]);

    const getFlag=async ()=>{
      const data={
        email:auth.email
      }
      try{
        res=await sendReq(
          route+"/api/forms/getdata",
          "POST",
          JSON.stringify(data),
          {
            "Content-Type":"application/json",
            Authorization: "Bearer "+auth.token
          }
        );
        console.log(res);
        setFlag(res.flag);
      }catch(err){
        console.log(err);
      } 
    }

	  const clean=()=>{
	    setErr(false);
	  }

	  /////////////////////////////////////////////////

	  /*
	  const formatDate=(date)=>{
		var d=new Date(date);
	    var month=''+(d.getMonth()+1);
	    var day=''+d.getDate();
	    var year=d.getFullYear();
	    if (month.length<2) 
	        month='0'+month;
	    if (day.length<2) 
	        day='0'+day;
   		 return [year,month,day].join('-');
	}
	*/

	  const formatDate=()=>{
	  	var today=new Date();
		var dd=String(today.getDate()).padStart(2,'0');
		var mm=String(today.getMonth()+1).padStart(2,'0');
		var yyyy=today.getFullYear();
		today=yyyy+'-'+mm+'-'+dd;
		return today
	  }

	  const uniqueKeyHandler=async ()=>{
	  	var key=auth.email+(new Date()).getTime();
	  	try{
	  		const data={
				email:auth.email,
				api_key:key,
				key_gen_date:formatDate()
			}
			res=await sendReq(
				route+"/api/accounts/token_update",
				'PATCH',
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
	  	}catch(err){
	  		console.log(err);
	  	}

	  }

	  /////////////////////////////////////////////////////

	  const closeBlock=()=>{
	  	setBal(false);
	  	viewSetBal(false);
	  	setPend(false);
	  	setLoangiven(false);
	  	setLoanrec(false);
	  }

	  const viewAmountModal=()=>{
	  	setBal(true);
	  }

	  const addAmountHandle=async ()=>{
	  	setBal(false);
	  	try{
	  		const data={
				user:auth.email,
				amount:formState.inputs.amount.value
			}
			res=await sendReq(
				route+"/api/transaction/add_bal",
				'POST',
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			if('success' in res){
				alert(res.success);
			}
	  	}catch(err){
	  		console.log(err);
	  	}
	  }

	  ////////////////////////////////////////////////////////


	  const viewBalanceHandler=async ()=>{
	  	try{
	  		const data={
				user:auth.email
			}
			res=await sendReq(
				route+"/api/transaction/view_bal",
				'POST',
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			viewSetBal(true);
			setAmt(res.amount)
	  	}catch(err){
	  		console.log(err);
	  	}
	  }

	  ///////////////////////////////////////////////////////////

	  const viewLoanReceiveHandler=async ()=>{
	  	try{
	  		const data={
				user:auth.email
			}
			res=await sendReq(
				route+"/api/transaction/view_received",
				'POST',
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			setLoanrec(true);
			setAmt(res.amount)
	  	}catch(err){
	  		console.log(err);
	  	}
	  }

	  ///////////////////////////////////////////////////////////////

	  const viewLoanSendHandler=async ()=>{
	  	try{
	  		const data={
				user:auth.email
			}
			res=await sendReq(
				route+"/api/transaction/view_send",
				'POST',
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			setLoangiven(true);
			setAmt(res.amount)
	  	}catch(err){
	  		console.log(err);
	  	}
	  }

	  ///////////////////////////////////////////////////////////////////

	  const viewPendingHandler=async ()=>{
	  	try{
	  		const data={
				user:auth.email
			}
			res=await sendReq(
				route+"/api/transaction/view_pending",
				'POST',
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			setPend(true);
			setAmt(res.msg)
	  	}catch(err){
	  		console.log(err);
	  	}
	  }



	  if(loading){
	  	element=<Loader asOverlay />
	  }else{
	  	if(flag && parseInt(flag)<3){
	  		element=(<Card className="form">
	  			<h2>Missing data ?</h2>
	  			<div className="form-control">
				<p><strong>Please enter your details to access this application !</strong></p>
				<Button component={Link} to="/forms">Go To Forms</Button>
				</div>
	  			</Card>);
	  	}if(flag && parseInt(flag)>=3){
	  		element=(<React.Fragment><div className="flex-container">
		  		<div className="flex-item-left"><LoanForm/></div>
		  		<div className="flex-item-right"><Card className="form">
	  			<h2>Account Details</h2>
	  			<div className="form-control">
					<p><strong>Current Balance</strong></p>
					<Button type="button" onClick={viewBalanceHandler}>View Balance</Button>
				</div>
				<div className="form-control">
					<p><strong>Amount of Loan Received</strong></p>
					<Button type="button" onClick={viewLoanReceiveHandler}>View Received</Button>
				</div>
				<div className="form-control">
					<p><strong>Amount of Loan given</strong></p>
					<Button type="button" onClick={viewLoanSendHandler}>View Sent</Button>
				</div>
				<div className="form-control">
					<p><strong>Money Pending</strong></p>
					<Button type="button" onClick={viewPendingHandler}>View Pending</Button>
				</div>
				<div className="form-control">
					<p><strong>Add Money</strong></p>
					<Button type="button" onClick={viewAmountModal}>Add</Button>
				</div>
				<div className="form-control">
					<p><strong>Generate API Key</strong></p>
					<Button type="button" onClick={uniqueKeyHandler}>Generate</Button>
				</div>
	  			</Card></div></div></React.Fragment>);
	  	}
	  }


	return(
		<React.Fragment>
	    <Err error={error} onClear={clearError}/>
	    <Err error={err} onClear={clean}/>
		<div className="jumbotron">
		    <div className="container">
			      <h3>Welcome {auth.name} <span style={{display:"inline-block",width:"2rem"}}></span></h3>
		    </div>
	  	</div>
	  	{element}

	  	<SweetAlert
	       show={bal}
	        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
	         customButtons={
	          <Button onClick={closeBlock}>CANCEL</Button>
	        }
	      ><div><center><React.Fragment><Input element="input" type="text" label="Amount"
						id="amount" 
						validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER()]}
						placeholder="enter amount" 
						errorText="Please enter valid amount"
						onInput={inputHandler} />
						<Button type="button" onClick={addAmountHandle} disabled={!formState.isValid}>ADD</Button>
						</React.Fragment></center></div>
	    </SweetAlert>

	    <SweetAlert
	       show={viewbal || loangiven || loanrec || pend}
	        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
	         customButtons={
	          <Button onClick={closeBlock}>Ok</Button>
	        }
	      ><div><center><h3>Rs. {amt}</h3></center></div>
	    </SweetAlert>

	  	</React.Fragment>
	);
};

export default UserData;