import React,{useState,useContext} from 'react';
import './details.css';
import {AuthContext} from '../../shared/context/auth_context';
import Card from '../../ui/card';
import {useHttp} from '../../shared/hooks/http_hook';
import {route} from '../../route';
import Loader from '../../ui/loader.js';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE,VALIDATOR_NUMBER,VALIDATOR_EMAIL} from '../../shared/util/validator';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import {useForm} from '../../shared/hooks/form_hook';
import SweetAlert from 'react-bootstrap-sweetalert';

const LoanForm=()=>{
	let element,res;
	const auth=useContext(AuthContext);
	const [err,setErr]=useState(false);
  	const {loading,error,sendReq,clearError}=useHttp();
  	const [formState,inputHandler,setFormData]=useForm(
		{	
			other:{
				value:'',
				isValid:false
			},
			amount:{
				value:'',
				isValid:false
			},
			key:{
				value:'',
				isValid:false
			},
		},false
	);

	const formatDate=()=>{
	  	var today=new Date();
		var dd=String(today.getDate()).padStart(2,'0');
		var mm=String(today.getMonth()+1).padStart(2,'0');
		var yyyy=today.getFullYear();
		today=yyyy+'-'+mm+'-'+dd;
		return today
	  }

	const clean=()=>{
	    setErr(false);
	  }

	const addHandler=async (event)=>{
		event.preventDefault();
		if(auth.email===formState.inputs.other.value){
			alert("you can't send loan to yourself :3");
			return;
		}
		try{
			const data={
				user:auth.email,
				other:formState.inputs.other.value,
				amount:formState.inputs.amount.value,
				status:'success',
				t_date:formatDate(),
				key:formState.inputs.key.value
			}
			res=await sendReq(
				route+"/api/transaction/add_loan",
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
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err);
		}
	}

	return (
		<React.Fragment>
		<Err error={error} onClear={clearError}/>
	    <Err error={err} onClear={clean}/>
		<Card className="form">
		{loading && <Loader asOverlay />}
  			<form onSubmit={addHandler}>
				<h3><center>Send Loan</center></h3>
				<hr/>

				<Input 
					element="input" 
					type="email" 
					label="Enter email of receiver" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
					id="other"
					placeholder="Email"
					errorText="Please enter valid email"
					onInput={inputHandler} 
				/>

				<Input
	              type="number"
	              id="amount"
	              element="input"
	              label="Amount"
	              placeholder="Amount"
	              validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER()]}
	              errorText="Please enter valid amount"
	              onInput={inputHandler}
	            />

	            <Input 
					element="input" 
					type="text" 
					label="Enter your api key" 
					validators={[VALIDATOR_REQUIRE()]}
					id="key"
					placeholder="API Key"
					errorText="Please enter api key"
					onInput={inputHandler} 
				/>

			
				<Button type="submit" disabled={!formState.isValid}>Send</Button>

			</form> 
  		</Card>
  	</React.Fragment>

	);

};

export default LoanForm;