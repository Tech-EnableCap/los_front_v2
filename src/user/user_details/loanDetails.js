import React,{useState,useContext,useEffect} from 'react';
import './details.css';
import {AuthContext} from '../../shared/context/auth_context';
import Card from '../../ui/card';
import {useHttp} from '../../shared/hooks/http_hook';
import {route} from '../../route';
import Loader from '../../ui/loader.js';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE,VALIDATOR_NUMBER,VALIDATOR_EMAIL,VALIDATOR_POSITIVE} from '../../shared/util/validator';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import Personal from './personal';
import Residence from './resident';
import Doc from './doc';
import CoaAppDoc from './docCoapp';
import Status from './progressStatus';
import {useForm} from '../../shared/hooks/form_hook';
import Work from './work';
import SweetAlert from 'react-bootstrap-sweetalert';


const LoanDetails=(props)=>{
	console.log(props);
	let component,element,res
	const [school,setSchool]=useState("Other");
	const [back,setBack]=useState(false);
	const auth=useContext(AuthContext);
	const [front,setFront]=useState(false);
	const [user,setUser]=useState(null);
	const [next,setNext]=useState(false);
	const [pos,setPos]=useState(0);
	const [err,setErr]=useState(false);
	const {loading,error,sendReq,clearError}=useHttp();
	const [formState,formInputHandler,setFormData]=useForm(
		{
			inst_name:{
				value:'',
				isValid:false
			},
			loc:{
				value:'',
				isValid:false
			},
			c_name:{
				value:'',
				isValid:false
			},
			tenure:{
				value:'',
				isValid:false
			},
			amount:{
				value:'',
				isValid:false
			},
			amount_fn:{
				value:'',
				isValid:false
			},
			loan_tenure:{
				value:'',
				isValid:false
			}
		},false
	);

	const [formState1,formInputHandler1,setFormData1]=useForm({
		cls:{
			value:'',
			isValid:false
		},
	},false);

	useEffect(()=>{
		const getUser=async ()=>{
			try{
				const data={
					id:props.app_id ? props.app_id : auth.userId
				}
				res=await sendReq(route+"/api/accounts/get_loan_details",
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
				if(parseInt(res[0].flag)>1){
					if(res[0].id_n.length>0){
						setSchool(res[0].id_n[0].inst_type);
						setFormData({
						...formState.inputs,
						inst_name:{
							value:res[0].id_n[0].inst_name,
							isValid:true
						},
						loc:{
							value:res[0].id_n[0].inst_location,
							isValid:true
						},
						c_name:{
							value:res[0].id_n[0].course_name,
							isValid:true
						},
						tenure:{
							value:res[0].id_n[0].course_tenure,
							isValid:true
						},
						amount:{
							value:res[0].id_n[0].course_fee,
							isValid:true
						},
						amount_fn:{
							value:res[0].id_n[0].financing_required,
							isValid:true
						},
						loan_tenure:{
							value:res[0].id_n[0].loan_tenure,
							isValid:true
						}

					},true);

					setFormData1({
						...formState1.inputs,
						cls:{
							value:res[0].id_n[0].class_of_student,
							isValid:true
						},
					},true);
				}
					setUser(res[0]);

					
				}
					/*}else{
						setErr("server error");
					}
				}else{
					setErr("server error");
				}*/
			}catch(err){
				console.log(err);
			}	
		}
		getUser();
	},[sendReq,setFormData])


	const setSchoolHandler=(event)=>{
		setSchool(event.target.value);
	};

	const backHandle=()=>{
		setBack(true);
	};

	const clean=()=>{
		setErr(false);
	};

	const saveHandle=async (event)=>{
		event.preventDefault();
		const data={
			applicant_id:auth.userId,
			email:auth.email,
			inst_name:formState.inputs.inst_name.value,
			inst_type:school,
			inst_location:formState.inputs.loc.value,
			class_of_student:element ? formState1.inputs.cls.value : "_",
			course_name:formState.inputs.c_name.value,
			course_tenure:formState.inputs.tenure.value,
			course_fee:formState.inputs.amount.value,
			financing_required:formState.inputs.amount_fn.value,
			loan_tenure:formState.inputs.loan_tenure.value,
			flag:props.sbmt && props.sbmt==="sbmt" ? 4 : user && user.id_n.length===0 ? user.flag : 2
		}
		console.log(JSON.stringify(data));
		try{
			res=await sendReq(
				route+"/api/accounts/loan_insert",
				"POST",
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			if('success' in res){
				setPos(2);
				setNext(true);
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err);
		}
	}


	const updateLoanDetails=async (event)=>{
		event.preventDefault();
		const data={
			applicant_id:auth.userId,
			inst_name:formState.inputs.inst_name.value,
			inst_type:school,
			inst_location:formState.inputs.loc.value,
			class_of_student:element ? formState1.inputs.cls.value : "_",
			course_name:formState.inputs.c_name.value,
			course_tenure:formState.inputs.tenure.value,
			course_fee:formState.inputs.amount.value,
			financing_required:formState.inputs.amount_fn.value,
			loan_tenure:formState.inputs.loan_tenure.value,
			flag:props.sbmt && props.sbmt==="sbmt" ? 5 : user.flag
		}
		console.log(JSON.stringify(data));
		try{
			res=await sendReq(
				route+"/api/accounts/update_user_details",
				"PATCH",
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			if('success' in res){
				alert('data updated');
				setPos(2);
				setNext(true);
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err);
		}
	}

	const goNext=()=>{
		setNext(true);
	}


	

	if(school==="School"){
		if(user && props.flag>1 || props.app_id){
			element=(
				<Input element="input" type="text" label="Class of Student" 
				validators={[VALIDATOR_REQUIRE()]}
				id="cls"
				placeholder="Class of Student"
				errorText="Please enter class"
				disable={props.app_id && true}
				onInput={formInputHandler1}
				initvalue={user.id_n.length>0 ? user.id_n[0].class_of_student : formState1.inputs.cls.value}
				initvalid={user.id_n.length>0 ? true : formState1.inputs.cls.isValid} />
			);
		}else{
			element=(
				<Input element="input" type="text" label="Class of Student" 
				validators={[VALIDATOR_REQUIRE()]}
				id="cls"
				placeholder="Class of Student"
				errorText="Please enter class"
				onInput={formInputHandler1}
				initvalue={formState1.inputs.cls.value}
				initvalid={formState1.inputs.cls.isValid} />
			);
		}
	}else{
		element=null;
	}


	if(next){
		if(props.sbmt && props.sbmt==="sbmt" || props.back){
			if(props.app_id){
				component=<CoaAppDoc app_id={props.app_id && props.app_id} sbmt="sbmt" flag={4}/>
			}else{
				component=<Doc sbmt="sbmt" flag={user ? user.flag : 4}/>
			}			
		}else{
			component=<Residence mode={props.mode} app_id={props.app_id && props.app_id} flag={props.flag ? props.flag : (user ? user.flag : 2)}/>
		}
	}else if(back){
		component=<Personal mode={props.mode} app_id={props.app_id} flag={user ? user.flag : 1}/>
	}else if(loading){
		component=<Loader asOverlay />
	}else if(props.flag>1 || props.app_id){
		if(user){
			component=(
				<React.Fragment>
				<div className="flex-container" style={{marginTop:'3rem',marginBottom:'10rem'}}>
				  <div className="flex-item-left" style={{flex:'40%'}}><Status status={user.id_n.length>0 && props.app_id ? props.flag : (user.id_n.length>0 ? user.flag : 1)}/></div>
				  <div className="flex-item-right" style={{flex:'60%'}}>
				<Card className="form" style={{margin:'3rem auto'}}>
				{loading && <Loader asOverlay />}
	  			<form onSubmit={updateLoanDetails}>
				<h3><center>Loan Details</center></h3>
				<hr/>
				<Input element="input" type="text" label="Institute name"
				id="inst_name" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Institute name" 
				errorText="Please Enter a Valid Institute Name"
				disable={props.app_id && true}
				onInput={formInputHandler}
				initvalue={user.id_n.length>0 ? user.id_n[0].inst_name : formState.inputs.inst_name.value}
				initvalid={user.id_n.length>0 ? true : formState.inputs.inst_name.isValid} />

				<div className="form-control">
					<label>Type Of Institute</label>
					<div onChange={setSchoolHandler}>
		        		<input type="radio" value="School" checked={school==="School"} name="sch"/>School
		        		<input type="radio" value="Other" checked={school==="Other"} name="sch"/>Other
		        	</div>
		      	</div>

				<Input element="input" type="text" label="Location of Institute"
				id="loc" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Location"
				errorText="Please enter a Valid Location"
				disable={props.app_id && true}
				onInput={formInputHandler}
				initvalue={user.id_n.length>0 ? user.id_n[0].inst_location : formState.inputs.loc.value}
				initvalid={user.id_n.length>0 ? true : formState.inputs.loc.isValid} />

				{element}

				<Input element="input" type="text" label="Course Name" 
				validators={[VALIDATOR_REQUIRE()]}
				id="c_name"
				placeholder="Course Name"
				errorText="Please enter the Full Course Name (Example , PGDM - Post Graduate Diploma in Management)"
				disable={props.app_id && true}
				onInput={formInputHandler}
				initvalue={user.id_n.length>0 ? user.id_n[0].course_name : formState.inputs.c_name.value}
				initvalid={user.id_n.length>0 ? true : formState.inputs.c_name.isValid} />

				<Input element="input" type="number" label="Course Tenure (months)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="tenure"
				placeholder="0"
				errorText="Course Tenure must be greater than zero"
				disable={props.app_id && true}
				onInput={formInputHandler}
				initvalue={user.id_n.length>0 ? user.id_n[0].course_tenure : formState.inputs.tenure.value}
				initvalid={user.id_n.length>0 ? true : formState.inputs.tenure.isValid} />

				<Input element="input" type="number" label="Course Fee Amount" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="amount"
				placeholder="0"
				errorText="Amount should be greater than zero"
				disable={props.app_id && true}
				onInput={formInputHandler}
				initvalue={user.id_n.length>0 ? user.id_n[0].course_fee : formState.inputs.amount.value}
				initvalid={user.id_n.length>0 ? true : formState.inputs.amount.isValid} /> 

				<Input element="input" type="number" label="Amount of financing required (Rs.)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="amount_fn"
				placeholder="0"
				errorText="Amount of financing required must be greater than zero and should not exceed Course Fee Amount"
				disable={props.app_id && true}
				onInput={formInputHandler}
				initvalue={user.id_n.length>0 ? user.id_n[0].financing_required : formState.inputs.amount_fn.value}
				initvalid={user.id_n.length>0 ? true : formState.inputs.amount_fn.isValid} />

				<Input element="input" type="number" label="Loan Tenure (months)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="loan_tenure"
				placeholder="0"
				errorText="Loan Tenure must be greater than zero should not exceed Course Tenure"
				disable={props.app_id && true}
				onInput={formInputHandler}
				initvalue={user.id_n.length>0 ? user.id_n[0].loan_tenure : formState.inputs.loan_tenure.value}
				initvalid={user.id_n.length>0 ? true : formState.inputs.loan_tenure.isValid} />

				{props.sbmt!=="sbmt" && !props.back ? (<Button onClick={backHandle}>Back</Button>) : null}
				{!props.app_id && user.id_n.length>0 && <Button type="submit" disabled={!formState.isValid || (element ? !formState1.isValid : false)}>Update</Button>}
				<Button type="button" onClick={user.id_n.length>0 ? goNext : saveHandle} disabled={!formState.isValid || (element ? !formState1.isValid : false)}>Next</Button>

				</form>
					</Card></div>
			</div>
				</React.Fragment>
			);
		}
		}else{
			console.log(props);
			component=(
				<React.Fragment>
				<div className="flex-container" style={{marginTop:'3rem',marginBottom:'10rem'}}>
				  <div className="flex-item-left" style={{flex:'40%'}}><Status status={1}/></div>
				  <div className="flex-item-right" style={{flex:'60%'}}>
				<Card className="form" style={{margin:'3rem auto'}}>
				{loading && <Loader asOverlay />}
	  			<form onSubmit={saveHandle}>
				
				<h3><center>Loan Details</center></h3>
				<hr/>
				<Input element="input" type="text" label="Institute name"
				id="inst_name" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Institute name" 
				errorText="Please Enter a Valid Institute Name"
				initvalue={formState.inputs.inst_name.value}
				initvalid={formState.inputs.inst_name.isValid}
				onInput={formInputHandler} />

				<div className="form-control">
					<label>Type Of Institute</label>
					<div onChange={setSchoolHandler}>
		        		<input type="radio" value="School" name="sch"/>School
		        		<input type="radio" value="Other" defaultChecked name="sch"/>Other
		        	</div>
		      	</div>

				<Input element="input" type="text" label="Location of Institute"
				id="loc" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Location"
				errorText="Please enter a Valid Location"
				initvalue={formState.inputs.loc.value}
				initvalid={formState.inputs.loc.isValid}
				onInput={formInputHandler} />

				{element}

				<Input element="input" type="text" label="Course Name" 
				validators={[VALIDATOR_REQUIRE()]}
				id="c_name"
				placeholder="Course Name"
				errorText="Please enter the Full Course Name, (Example , PGDM - Post Graduate Diploma in Management)"
				initvalue={formState.inputs.c_name.value}
				initvalid={formState.inputs.c_name.isValid}
				onInput={formInputHandler} />

				<Input element="input" type="number" label="Course Tenure (months)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="tenure"
				placeholder="0"
				errorText="Course Tenure must be greater than zero"
				initvalue={formState.inputs.tenure.value}
				initvalid={formState.inputs.tenure.isValid}
				onInput={formInputHandler} />

				<Input element="input" type="number" label="Course Fee Amount" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="amount"
				placeholder="0"
				errorText="Amount should be greater than zero"
				initvalue={formState.inputs.amount.value}
				initvalid={formState.inputs.amount.isValid}
				onInput={formInputHandler} /> 

				<Input element="input" type="number" label="Amount of financing required (Rs.)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="amount_fn"
				placeholder="0"
				errorText="Amount of financing required must be greater than zero and should not exceed Course Fee Amount"
				initvalue={formState.inputs.amount_fn.value}
				initvalid={formState.inputs.amount_fn.isValid}
				onInput={formInputHandler} />

				<Input element="input" type="number" label="Loan Tenure (months)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="loan_tenure"
				placeholder="0"
				errorText="Loan Tenure must be greater than zero should not exceed Course Tenure"
				initvalue={formState.inputs.loan_tenure.value}
				initvalid={formState.inputs.loan_tenure.isValid}
				onInput={formInputHandler} />

				{props.sbmt!=="sbmt" && !props.back ? (<Button onClick={backHandle}>Back</Button>) : null}
				<Button type="submit" disabled={!formState.isValid || (element ? !formState1.isValid : false)}>Save</Button> 

				</form>
					</Card></div>
			</div>
				</React.Fragment>
			);
		}
		


	return (
		<div>
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			{component}
		</div>
	);
};

export default LoanDetails;