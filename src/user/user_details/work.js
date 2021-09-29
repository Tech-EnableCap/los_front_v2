import React,{useState,useContext,useEffect} from 'react';
import {VALIDATOR_REQUIRE,VALIDATOR_NUMBER,VALIDATOR_POSITIVE,VALIDATOR_PAN} from '../../shared/util/validator';
import Input from '../../shared/components/formelements/input';
import {useForm} from '../../shared/hooks/form_hook';
import {useHttp} from '../../shared/hooks/http_hook';
import './details.css';
import Card from '../../ui/card';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import Residence from './resident';
import Status from './progressStatus';
import Doc from './doc';
import CoaAppDoc from './docCoapp';
import {route} from '../../route';
import {AuthContext} from '../../shared/context/auth_context';
import PanAuth from '../../thirdPartyApiLib/panVer';

const Work=(props)=>{
	let res,component,element;
	const [err,setErr]=useState(false);
	const [user,setUser]=useState(null);
	const [loader,setLoader]=useState(false);
	const {loading,error,sendReq,clearError}=useHttp();
	const auth=useContext(AuthContext);
	const [salaried,setSalaried]=useState("Salaried");
	const [activeloan,setActiveloan]=useState("true");
	const [next,setNext]=useState(false);
	const [pos,setPos]=useState(0);
	const [back,setBack]=useState(false);
	const [dob,setDob]=useState('');
	const [verifypan,setVerifyPan]=useState(false);
	const [formState,formInputHandler,setFormData]=useForm(
		{
			pan:{
				value:'',
				isValid:false
			},
			comp:{
				value:'',
				isValid:false
			},
			address:{
				value:'',
				isValid:false
			},
			city:{
				value:'',
				isValid:false
			},
			state:{
				value:'',
				isValid:false
			},
			postal:{
				value:'',
				isValid:false
			},
			sal:{
				value:'',
				isValid:false
			},
			desig:{
				value:'',
				isValid:false
			},
			work_exp:{
				value:'',
				isValid:false
			},
			cur_job:{
				value:'',
				isValid:false
			}
		},false
	);

	const [formState1,formInputHandler1,setFormData1]=useForm({
		no_emi:{
			value:'',
			isValid:false
		},
	},false);

	const setSalHandler=(event)=>{
		setSalaried(event.target.value);
	};

	const setLoanHandler=(event)=>{
		setActiveloan(event.target.value);
	};

	const clean=()=>{
		setErr(false);
	};

	const backHandle=()=>{
		setBack(true);
	}

	const goToNext=()=>{
		setNext(true);
	}

	useEffect(()=>{
		const getUser=async ()=>{
			try{
				const data={
					id:auth.userId
				}
				res=await sendReq(route+"/api/accounts/get_work_details",
					"POST",
					JSON.stringify(data),
					{
						"Content-Type":"application/json",
						Authorization: "Bearer "+auth.token
					}
				);
				setDob(res[0].dob);
				if(parseInt(res[0].flag)>3){
				
					setUser(res[0]);
					setSalaried(res[0].emp_type);
					setActiveloan(res[0].active_loan_st.toString());

					setFormData1({
						...formState1.inputs,
						no_emi:{
							value:res[0].tot_cur_emi,
							isValid:true
						},
					},true);

					setFormData({
						...formState.inputs,
						pan:{
							value:res[0].data.pan_num,
							isValid:true
						},
						comp:{
							value:res[0].comp_name,
							isValid:true
						},
						address:{
							value:res[0].comp_add,
							isValid:true
						},
						city:{
							value:res[0].comp_city,
							isValid:true
						},
						state:{
							value:res[0].comp_state,
							isValid:true
						},
						postal:{
							value:res[0].comp_postal,
							isValid:true
						},
						acc_num:{
							value:res[0].acc_num,
							isValid:true
						},
						sal:{
							value:res[0].monthly_sal,
							isValid:true
						},
						desig:{
							value:res[0].cur_desig,
							isValid:true
						},
						work_exp:{
							value:res[0].total_work_exp,
							isValid:true
						},
						cur_job:{
							value:res[0].cur_job_exp,
							isValid:true
						}

					},true);

				}
			
			}catch(err){

			}	
		}
		getUser();
	},[sendReq,setFormData]);

	console.log(activeloan);

	const panVerifyHandle=()=>{
		setLoader(true);
		console.log(dob);
		console.log(formState.inputs.pan.value,auth.name,dob.split("-").reverse().join("/"));
		PanAuth.sendData(formState.inputs.pan.value,auth.name,dob.split("-").reverse().join("/")).then((res)=>{
			console.log(res);
			if(res.status==='Active' && res.nameMatch && res.dobMatch){
				console.log(res);
				saveHandle();
				setLoader(false);
			}else{
				alert(res.status,res.nameMatch,res.dobMatch);
				return;
				setLoader(false);
			}
		}).catch((err)=>{
			alert('document not verified');
			setLoader(false);
			return;
		})
	}


	const saveHandle=async ()=>{
		//event.preventDefault();
		/// pan authentication....
		
		const data={
			id:auth.userId,
			emp_type:salaried,
			active_loan_st:activeloan,
			tot_cur_emi:element ? formState.inputs.no_emi.value : '_',
			pan_num:formState.inputs.pan.value,
			comp_name:formState.inputs.comp.value,
			comp_add:formState.inputs.address.value,
			comp_city:formState.inputs.city.value,
			comp_state:formState.inputs.state.value,
			comp_postal:formState.inputs.postal.value,
			monthly_sal:formState.inputs.sal.value,
			cur_desig:formState.inputs.desig.value,
			total_work_exp:formState.inputs.work_exp.value,
			cur_job_exp:formState.inputs.cur_job.value,
			flag:!user ? 4 : user.flag
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
				setPos(4);
				setNext(true);
			}else{
				setErr(res.error)
			}
		}catch(err){
			console.log(err);
		}
	}

	if(activeloan==="true"){
		if(user){
			element=(
				<Input element="input" type="number" label="Total Current EMIs" 
				validators={[VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="no_emi"
				placeholder="0"
				errorText="Please enter a Valid positive Number"
				onInput={formInputHandler}
				initvalue={user.tot_cur_emi}
				initvalid={true} />
			)
		}else{
			element=(
				<Input element="input" type="number" label="Total Current EMIs" 
				validators={[VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="no_emi"
				placeholder="0"
				errorText="Please enter a Valid positive Number"
				onInput={formInputHandler1}
				initvalue={formState1.inputs.no_emi.value}
				initvalid={formState1.inputs.no_emi.isValid} />
			)
		}
	}else{
		element=null;
	}

	console.log(formState1);


	if(next){
		if(props.mode==='req'){
			component=<CoaAppDoc mode={props.mode} app_id={props.app_id && props.app_id} payslip={(salaried==="Salaried") ? "Salaried" : "Self"} flag={user ? user.flag : 4}/>
		}else{
			component=<Doc mode={props.mode} app_id={props.app_id && props.app_id} payslip={(salaried==="Salaried") ? "Salaried" : "Self"} flag={user ? user.flag : 4}/>
		}
	}else if(back){
		component=<Residence mode={props.mode} app_id={props.app_id && props.app_id} flag={user ? user.flag : 3}/>
	}else if(loading || loader){
		component=<Loader asOverlay />
	}else if(props.flag>3){
		if(user){
			component=(
				<React.Fragment>
				<div className="flex-container" style={{marginTop:'3rem',marginBottom:'10rem'}}>
				  <div className="flex-item-left" style={{flex:'40%'}}><Status status={user.flag}/></div>
				  <div className="flex-item-right" style={{flex:'60%'}}>
				<Card className="form" style={{margin:'3rem auto'}}>
				{loading && <Loader asOverlay />}
				<form>
				<h3><center>Work Details</center></h3>
				<hr/>
				<div className="form-control" onChange={setSalHandler}>
					<label>I am</label>
		        	<input type="radio" value="Salaried" checked={salaried==="Salaried"} defaultChecked name="sal"/>Salaried
		        	<input type="radio" value="Self Employed Professional" checked={salaried==="Self Employed Professional"} name="sal"/>Self Employed Professional
		        	<input type="radio" value="Self Employed Non Professional" checked={salaried==="Self Employed Non Professional"} name="sal"/>Self Employed Non Professional
		      	</div>

		      	<div className="form-control" onChange={setLoanHandler}>
					<label>Do you have an active loan ?</label>
		        	<input type="radio" value="true" checked={activeloan==="true"} defaultChecked name="loan"/>Yes
		        	<input type="radio" value="false" checked={activeloan==="false"} name="loan"/>No
		      	</div>

		      	{element}

				<Input element="input" type="text" label="Please enter PAN card number" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_PAN()]}
					id="pan"
					placeholder="PAN number"
					errorText="Invalid PAN"
					onInput={formInputHandler}
					initvalue={user.pan_num}
					initvalid={true} />

				<Input element="input" type="text" label="Company name" 
					validators={[VALIDATOR_REQUIRE()]}
					id="comp"
					placeholder="Company name"
					errorText="Please Enter Full Name as per ROC (Example : TCS - Tata Consultancy Services)"
					onInput={formInputHandler}
					initvalue={user.comp_name}
					initvalid={true} />

					<div className="form-control">
						<Input element="textarea" label="Company address" 
						validators={[VALIDATOR_REQUIRE()]}
						id="address"
						errorText="Please enter your Company Address"

						onInput={formInputHandler}
						initvalue={user.comp_add}
						initvalid={true} />

						<Input element="input" type="text" label="Enter City" 
						validators={[VALIDATOR_REQUIRE()]}
						id="city"
						placeholder="City"
						errorText="Please enter City"

						onInput={formInputHandler}
						initvalue={user.comp_city}
						initvalid={true} />

						<Input element="input" type="text" label="Enter State" 
						validators={[VALIDATOR_REQUIRE()]}
						id="state"
						placeholder="State"
						errorText="Please enter State"

						onInput={formInputHandler}
						initvalue={user.comp_state}
						initvalid={true} />

						<Input element="input" type="number" label="Postal code" 
						validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
						id="postal"
						placeholder="Postal code"

						errorText="Please enter a Valid Numeric Postal Code"
						onInput={formInputHandler}
						initvalue={user.comp_postal}
						initvalid={true} />
					</div>

					<Input element="input" type="number" label="Monthly Net Salary / Income (Rs.)" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="sal"
					placeholder="0"
					errorText="Please enter a Valid positive Number"
					onInput={formInputHandler}
					initvalue={user.monthly_sal}
					initvalid={true}/>

					<Input element="input" type="text" label="Current Designation" 
					validators={[VALIDATOR_REQUIRE()]}
					id="desig"
					placeholder="Current Designation"
					errorText="Please Enter Current Designation"
					onInput={formInputHandler}
					initvalue={user.cur_desig}
					initvalid={true} />

					<Input element="input" type="number" label="Total Work Experience (in years)" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="work_exp"
					placeholder="Total Work Experience (in years)"
					errorText="Please enter a Valid positive Number"
					onInput={formInputHandler}
					initvalue={user.total_work_exp}
					initvalid={true} />
			
					<Input element="input" type="number" label="Number of years in Current Job" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="cur_job"
					placeholder="Number of years in Current Job"
					errorText="Please enter a Valid positive Number"
					onInput={formInputHandler}
					initvalue={user.cur_job_exp}
					initvalid={true} />

					<Button onClick={backHandle}>Back</Button>
					<Button type="button" disabled={!formState.isValid || (element ? !formState1.isValid : false)} onClick={saveHandle}>Update</Button>
					<Button type="button" onClick={goToNext}>Next</Button>

					</form>
					</Card></div>
			</div>
			</React.Fragment>)
		}
	}else{
		component=(<React.Fragment>
				<div className="flex-container" style={{marginTop:'3rem',marginBottom:'10rem'}}>
				  <div className="flex-item-left" style={{flex:'40%'}}><Status status={3}/></div>
				  <div className="flex-item-right" style={{flex:'60%'}}>
				<Card className="form" style={{margin:'3rem auto'}}>
				{loading && <Loader asOverlay />}
				<form onSubmit={saveHandle}>
				<h3><center>Work Details</center></h3>
				<hr/>
				<div className="form-control" onChange={setSalHandler}>
					<label>I am</label>
		        	<input type="radio" value="Salaried" checked={salaried==="Salaried"} name="sal"/>Salaried
		        	<input type="radio" value="Self Employed Professional" checked={salaried==="Self Employed Professional"} name="sal"/>Self Employed Professional
		        	<input type="radio" value="Self Employed Non Professional" checked={salaried==="Self Employed Non Professional"} name="sal"/>Self Employed Non Professional
		      	</div>

		      	<div className="form-control" onChange={setLoanHandler}>
					<label>Do you have an active loan ?</label>
		        	<input type="radio" value="true" checked={activeloan==="true"} name="loan"/>Yes
		        	<input type="radio" value="false" checked={activeloan==="false"} name="loan"/>No
		      	</div>

		      	{element}

				<Input element="input" type="text" label="Please enter PAN card number" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_PAN()]}
					id="pan"
					placeholder="PAN number"
					errorText="Invalid PAN"
					onInput={formInputHandler}
					initvalue={formState.inputs.pan.value}
					initvalid={formState.inputs.pan.isValid} />

				<Input element="input" type="text" label="Company name" 
					validators={[VALIDATOR_REQUIRE()]}
					id="comp"
					placeholder="Company name"
					errorText="Please Enter Full Name as per ROC (Example : TCS - Tata Consultancy Services)"
					onInput={formInputHandler}
					initvalue={formState.inputs.comp.value}
					initvalid={formState.inputs.comp.isValid} />

				<div className="form-control">
					<Input element="textarea" label="Company address" 
					validators={[VALIDATOR_REQUIRE()]}
					id="address"
					errorText="Please enter your Company Address"
					onInput={formInputHandler}
					initvalue={formState.inputs.address.value}
					initvalid={formState.inputs.address.isValid} />

					<Input element="input" type="text" label="Enter City" 
					validators={[VALIDATOR_REQUIRE()]}
					id="city"
					placeholder="City"
					errorText="Please enter City"
					onInput={formInputHandler}
					initvalue={formState.inputs.city.value}
					initvalid={formState.inputs.city.isValid} />

					<Input element="input" type="text" label="Enter State" 
					validators={[VALIDATOR_REQUIRE()]}
					id="state"
					placeholder="State"
					errorText="Please enter State"
					onInput={formInputHandler}
					initvalue={formState.inputs.state.value}
					initvalid={formState.inputs.state.isValid} />

					<Input element="input" type="number" label="Postal code" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="postal"
					placeholder="Postal code"
					errorText="Please enter a Valid Numeric Postal Code"
					onInput={formInputHandler}
					initvalue={formState.inputs.postal.value}
					initvalid={formState.inputs.postal.isValid} />
					</div>

					<Input element="input" type="number" label="Monthly Net Salary / Income (Rs.)" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="sal"
					placeholder="0"
					errorText="Please enter a Valid positive Number"
					onInput={formInputHandler}
					initvalue={formState.inputs.sal.value}
					initvalid={formState.inputs.sal.isValid} />

					<Input element="input" type="text" label="Current Designation" 
					validators={[VALIDATOR_REQUIRE()]}
					id="desig"
					placeholder="Current Designation"
					errorText="Please Enter Current Designation"
					onInput={formInputHandler}
					initvalue={formState.inputs.desig.value}
					initvalid={formState.inputs.desig.isValid} />

					<Input element="input" type="number" label="Total Work Experience (in years)" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="work_exp"
					placeholder="Total Work Experience (in years)"
					errorText="Please enter a Valid positive Number"
					onInput={formInputHandler}
					initvalue={formState.inputs.work_exp.value}
					initvalid={formState.inputs.work_exp.isValid} />
			
					<Input element="input" type="number" label="Number of years in Current Job" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="cur_job"
					placeholder="Number of years in Current Job"
					errorText="Please enter a Valid positive Number"
					onInput={formInputHandler}
					initvalue={formState.inputs.cur_job.value}
					initvalid={formState.inputs.cur_job.isValid} />

					<Button onClick={backHandle}>Back</Button>
					<Button type="form" disabled={!formState.isValid || (element ? !formState1.isValid : false)}>Next</Button>

					</form>
			</Card></div>
			</div>
			</React.Fragment>
		)
	}

	return(
		<div>
		<Err error={error} onClear={clearError}/>
		<Err error={err} onClear={clean}/>
		{component}
		</div>
	);
};

export default Work;