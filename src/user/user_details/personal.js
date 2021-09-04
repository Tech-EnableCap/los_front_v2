import React,{useState,useContext,useEffect} from 'react';
import {VALIDATOR_REQUIRE,VALIDATOR_NUMBER,VALIDATOR_POSITIVE} from '../../shared/util/validator';
import Input from '../../shared/components/formelements/input';
import {useForm} from '../../shared/hooks/form_hook';
import {useHttp} from '../../shared/hooks/http_hook';
import './details.css';
import Card from '../../ui/card';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import Status from './progressStatus';
import {route} from '../../route';
import LoanDetails from './loanDetails';
import {AuthContext} from '../../shared/context/auth_context';

const Personal=(props)=>{
	let res,element;
	const [gender,setGender]=useState("Male");
	const [marital,setMarital]=useState("Unmarried");
	const auth=useContext(AuthContext);
	const [err,setErr]=useState(false);
	const [next,setNext]=useState(false);
	const [pos,setPos]=useState(0);
	const [user,setUser]=useState(null);
	const {loading,error,sendReq,clearError}=useHttp();
	const [formState,inputHandler,setFormData]=useForm(
		{
			date:{
				value:'',
				isValid:false
			}
		},false
	);

	const clean=()=>{
		setErr(false);
	}

	const setGenderHandler=(event)=>{
		setGender(event.target.value);
	};

	const setMaritalHandler=(event)=>{
		setMarital(event.target.value);
	};

	useEffect(()=>{
		const getUser=async ()=>{
			try{
				const data={
					email:auth.email
				}
				res=await sendReq(route+"/api/accounts/getpersonal",
					"POST",
					JSON.stringify(data),
					{
						"Content-Type":"application/json",
						Authorization: "Bearer "+auth.token
					}
				);
				console.log(res);
				/*if("success" in res.msg){
					if("data" in res.msg.success){*/
				if(parseInt(res[0].flag)>0){
					setUser(res[0]);
					setFormData({
						...formState.inputs,
						date:{
							value:res[0].dob,
							valid:true
						}
					},true);
					setGender(res[0].gender);
					setMarital(res[0].marital);
				}
					/*}else{
						setErr("server error");
					}
				}else{
					setErr("server error");
				}*/
			}catch(err){
				setErr(err);
			}	
		}
		getUser();
	},[sendReq,setFormData])

	console.log(user);

	const saveHandle=async (event)=>{
		event.preventDefault();
		const data={
			id:auth.userId,
			dob:formState.inputs.date.value,
			gender:gender,
			marital:marital,
			flag:!user ? 1 : user.flag
		}
		console.log(JSON.stringify(data));
		try{
			res=await sendReq(
				route+"/api/accounts/insert_user_details",
				"POST",
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			if('success' in res){
				setNext(true);
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err);
		}
	}

	const goToNext=()=>{
		setNext(true);
	}

	console.log(formState);

	if(next){
		element=<LoanDetails app_id={props.app_id && props.app_id} mode={props.mode} flag={user ? user.flag : 1}/>
	}else if(loading){
		element=<Loader asOverlay />
	}else if(props.flag>0){
		if(user){
			element=(<React.Fragment>
			<div className="flex-container" style={{marginTop:'3rem',marginBottom:'10rem'}}>
			  <div className="flex-item-left" style={{flex:'40%'}}><Status status={user.flag}/></div>
			  <div className="flex-item-right" style={{flex:'60%'}}>
			<Card className="form" style={{margin:'3rem auto'}}>
			{loading && <Loader asOverlay />}
	  			<form onSubmit={saveHandle}>
				
					<h3><center>Personal Details</center></h3>
					<hr/>

					<Input
		              type="date"
		              id="date"
		              element="input"
		              label="Your DOB"
		              placeholder="DOB"
		              validators={[VALIDATOR_REQUIRE()]}
		              errorText="Invalid Date of Birth"
		              onInput={inputHandler}
		              initvalue={user.dob}
		              initvalid={true}
		            />

					<div className="form-control">
						<label>Gender</label>
						<div onChange={setGenderHandler}>
			        	<input type="radio" value="Male" checked={gender==="Male"} name="gender"/>Male
			        	<input type="radio" value="Female" checked={gender==="Female"} name="gender"/>Female
			        	<input type="radio" value="3rd" name="gender"/>I dont want to disclose
			        	</div>
			      	</div>

			      	<div className="form-control">
						<label>Marital Status</label>
						<div onChange={setMaritalHandler}>
			        	<input type="radio" value="Unmarried" checked={marital==="Unmarried"} name="marital"/>Unmarried
			        	<input type="radio" value="Married" checked={marital==="Married"} name="marital"/>Married
			        	<input type="radio" value="Divorced" checked={marital==="Divorced"} name="marital"/>Divorced
			        	</div>
			      	</div>
				
				<Button type="submit" disabled={!formState.isValid}>Update</Button>
				<Button type="button" onClick={goToNext}>Next</Button>

				</form> 
	  	</Card></div>
			</div>
	  	</React.Fragment>);
	  }
	}else{
		element=(<React.Fragment>
		<div className="flex-container" style={{marginTop:'3rem',marginBottom:'10rem'}}>
		  <div className="flex-item-left" style={{flex:'40%'}}><Status status={0}/></div>
		  <div className="flex-item-right" style={{flex:'60%'}}>
		<Card className="form" style={{margin:'3rem auto'}}>
		{loading && <Loader asOverlay />}
  			<form onSubmit={saveHandle}>
			
				<h3><center>Personal Details</center></h3>
				<hr/>

				<Input
	              type="date"
	              id="date"
	              element="input"
	              label="Your DOB"
	              placeholder="DOB"
	              validators={[VALIDATOR_REQUIRE()]}
	              errorText="Please enter valid dob"
	              onInput={inputHandler}
	              initvalue={formState.inputs.date.value}
	              initvalid={formState.inputs.date.isValid}
	            />

				<div className="form-control">
					<label>Gender</label>
					<div onChange={setGenderHandler}>
		        	<input type="radio" value="Male" defaultChecked name="gender"/>Male
		        	<input type="radio" value="Female" name="gender"/>Female
		        	<input type="radio" value="3rd" name="gender"/>I dont want to disclose
		        	</div>
		      	</div>

		      	<div className="form-control">
					<label>Marital Status</label>
					<div onChange={setMaritalHandler}>
		        	<input type="radio" value="Unmarried" defaultChecked name="marital"/>Unmarried
		        	<input type="radio" value="Married" name="marital"/>Married
		        	<input type="radio" value="Divorced" name="marital"/>Divorced
		        	</div>
		      	</div>
			
			<Button type="submit" disabled={!formState.isValid}>Save</Button>

			</form> 
  	</Card></div>
		</div>
  	</React.Fragment>);
	}

	return (
		<div>
		<Err error={error} onClear={clearError}/>
		<Err error={err} onClear={clean}/>
		{element}
		</div>
	);
};


export default Personal;