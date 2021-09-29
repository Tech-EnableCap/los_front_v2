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
import LoanDetails from './loanDetails';
import Status from './progressStatus';
import {useForm} from '../../shared/hooks/form_hook';
import Work from './work';
import SweetAlert from 'react-bootstrap-sweetalert';

const Resident=(props)=>{
	let res,rent_block,component;
	const auth=useContext(AuthContext);
	const [back,setBack]=useState(false);
	const [user,setUser]=useState(null);
	const [next,setNext]=useState(false);
	const [pos,setPos]=useState(0);
	const [err,setErr]=useState(false);
	const [resi,setResi]=useState("Owned");
	const [rent,setRent]=useState("Family");
	const [own,setOwn]=useState("Self");
	const [checked,setChecked]=useState(false);
	const {loading,error,sendReq,clearError}=useHttp();

	const [formState,formInputHandler,setFormData]=useForm(
		{
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
			}
		},false
	);

	const [formState1,formInputHandler1,setFormData1]=useForm(
		{
			address1:{
				value:'',
				isValid:false
			},
			city1:{
				value:'',
				isValid:false
			},
			state1:{
				value:'',
				isValid:false
			},
			postal1:{
				value:'',
				isValid:false
			}
		},false
	);

	const [formState2,formInputHandler2,setFormData2]=useForm(
		{
			month_rent:{
				value:'',
				isValid:false
			}
		},false
	);

	useEffect(()=>{
		const getUser=async ()=>{
			try{
				const data={
					id:auth.userId
				}
				res=await sendReq(route+"/api/accounts/get_residence_details",
					"POST",
					JSON.stringify(data),
					{
						"Content-Type":"application/json",
						Authorization: "Bearer "+auth.token
					}
				);
				if(parseInt(res[0].flag)>2){

					console.log(res[0]);

					setUser(res[0]);
					setResi(res[0].cur_res);
					setRent(res[0].rented_by);
					setOwn(res[0].owned_by);

					setFormData({
						...formState.inputs,
						address:{
							value:res[0].cur_res_addr,
							isValid:true
						},
						city:{
							value:res[0].cur_city,
							isValid:true
						},
						state:{
							value:res[0].cur_state,
							isValid:true
						},
						postal:{
							value:res[0].cur_postal,
							isValid:true
						}

					},true);

					setFormData1({
						...formState1.inputs,
						address1:{
							value:res[0].per_res_addr,
							isValid:true
						},
						city1:{
							value:res[0].per_city,
							isValid:true
						},
						state1:{
							value:res[0].per_state,
							isValid:true
						},
						postal1:{
							value:res[0].per_postal,
							isValid:true
						}
					},true);

					setFormData2({
						month_rent:{
							value:res[0].month_rent,
							isValid:true
						}
					},true);
				}
						
			}catch(err){
				console.log(err);
			}	
		}
		getUser();
	},[sendReq,setFormData,setFormData1,setFormData2]);

	const setResHandler=(event)=>{
		setResi(event.target.value);
	};

	const setRentHandler=(event)=>{
		setRent(event.target.value);
	};

	const setOwnHandler=(event)=>{
		setOwn(event.target.value);
	};

	const checkHandler=()=>{
		setChecked((prev)=>!prev);
		if(!checked){

			setFormData(
				{
					...formState.inputs,
				},
				formState.isValid
			);
		}
		
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
			id:auth.userId,
			cur_res_add:formState.inputs.address.value,
			cur_city:formState.inputs.city.value,
			cur_state:formState.inputs.state.value,
			cur_postal:formState.inputs.postal.value,
			cur_res:resi,
			rented_by:resi==="Rented" ? (rent==="_" ? "Family" : rent) : "_",
			owned_by:resi==="Rented" ? "_" : (own==="_" ? "Self" : own),
			monthly_rent:resi==="Rented" ? formState2.inputs.month_rent.value : "_",
			per_res_add:formState1.inputs.address1.value,
			per_city:formState1.inputs.city1.value,
			per_state:formState1.inputs.state1.value,
			per_postal:formState1.inputs.postal1.value,
			flag:!user ? 3 : user.flag
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
				setPos(3);
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


	if(resi==="Rented"){
		if(user){
			rent_block=(
				<><div className="form-control" onChange={setRentHandler}>
					<label>Rented By</label>
		        	<input type="radio" value="Family" checked={rent==="Family" || rent==="_"} defaultChecked name="rent"/>Family
		        	<input type="radio" value="Friends" checked={rent==="Friends"} name="rent"/>Friends
		        	<input type="radio" value="Company Provided" checked={rent==="Company Provided"} name="rent"/>Company Provided
		        	<input type="radio" value="Self, Staying Alone" checked={rent==="Self, Staying Alone"} name="rent"/>Self, Staying Alone
		        	<input type="radio" value="Paying Guest" checked={rent==="Paying Guest"} name="rent"/>Paying Guest
		        	<input type="radio" value="Hostel" checked={rent==="Hostel"} name="rent"/>Hostel
		      	</div>

				<Input element="input" type="number" label="Monthly Rent" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="month_rent"
				placeholder="monthly rent"
				errorText="Monthly Rent should be a Valid positive Number"
				onInput={formInputHandler2}
				initvalue={user.monthly_rent==="_" ? formState2.inputs.month_rent.value : user.monthly_rent}
				initvalid={user.monthly_rent==="_" ? !formState2.inputs.month_rent.isValid : true} /></>
			);
		}else{
			rent_block=(

		      	<><div className="form-control" onChange={setRentHandler}>
					<label>Rented By</label>
		        	<input type="radio" value="Family" defaultChecked name="rent"/>Family
		        	<input type="radio" value="Friends" name="rent"/>Friends
		        	<input type="radio" value="Company Provided" name="rent"/>Company Provided
		        	<input type="radio" value="Self, Staying Alone" name="rent"/>Self, Staying Alone
		        	<input type="radio" value="Paying Guest" name="rent"/>Paying Guest
		        	<input type="radio" value="Hostel" name="rent"/>Hostel
		      	</div>

				<Input element="input" type="number" label="Monthly Rent" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="month_rent"
				placeholder="monthly rent"
				errorText="Monthly Rent should be a Valid positive Number"
				onInput={formInputHandler2}
				initvalue={formState2.inputs.month_rent.value}
				initvalid={formState2.inputs.month_rent.isValid} /></>
			);
		}
	}else{
		if(user){
			rent_block=(
				<div className="form-control" onChange={setOwnHandler}>
					<label>Owned By</label>
		        	<input type="radio" value="Self" checked={own==="Self" || own==="_"} defaultChecked name="own"/>Self
		        	<input type="radio" value="Spouse" checked={own==="Spouse"} name="own"/>Spouse
		        	<input type="radio" value="Parents" checked={own==="Parents"} name="own"/>Parents
		        	<input type="radio" value="Siblings" checked={own==="Siblings"} name="own"/>Siblings
		      	</div>
			);
		}else{
			rent_block=(
				<div className="form-control" onChange={setOwnHandler}>
					<label>Owned By</label>
		        	<input type="radio" value="Self" defaultChecked name="own"/>Self
		        	<input type="radio" value="Spouse" name="own"/>Spouse
		        	<input type="radio" value="Parents" name="own"/>Parents
		        	<input type="radio" value="Siblings" name="own"/>Siblings
		      	</div>
			);
		}
	}

	if(next){
		component=<Work app_id={props.app_id && props.app_id} mode={props.mode} flag={user ? user.flag : 3}/>
	}else if(back){
		component=<LoanDetails app_id={props.app_id && props.app_id} mode={props.mode} flag={user ? user.flag : 2}/>;
	}else if(loading){
		component=<Loader asOverlay />
	}else if(props.flag>2){
		if(user){
			component=(
				<React.Fragment>
				<div className="flex-container" style={{marginTop:'3rem',marginBottom:'10rem'}}>
				  <div className="flex-item-left" style={{flex:'40%'}}><Status status={user.flag}/></div>
				  <div className="flex-item-right" style={{flex:'60%'}}>
				<Card className="form" style={{margin:'3rem auto'}}>
				{loading && <Loader asOverlay />}
				<form onSubmit={saveHandle}>
					<h3><center>Residence Details</center></h3>
					<hr/>
					<div className="form-control">
					<Input element="textarea" label="Please enter your Current Residence Address" 
					validators={[VALIDATOR_REQUIRE()]}
					id="address"
					placeholder="Course Name"
					errorText="Please enter your Current Residence Address"
					onInput={formInputHandler}
					initvalue={user.cur_res_add}
					initvalid={true} />

					<Input element="input" type="text" label="Enter City" 
					validators={[VALIDATOR_REQUIRE()]}
					id="city"
					placeholder="City"
					errorText="Please enter Your Current City"
					onInput={formInputHandler}
					initvalue={user.cur_city}
					initvalid={true} />

					<Input element="input" type="text" label="Enter State" 
					validators={[VALIDATOR_REQUIRE()]}
					id="state"
					placeholder="State"
					errorText="Please enter Your Current State"
					onInput={formInputHandler}
					initvalue={user.cur_state}
					initvalid={true} />

					<Input element="input" type="number" label="Postal code" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="postal"
					placeholder="Postal code"
					errorText="Please enter a Valid Numeric Postal Code"
					onInput={formInputHandler}
					initvalue={user.cur_postal}
					initvalid={true} />

					</div>

					<div className="form-control" onChange={setResHandler}>
						<label>Is your current residence</label>
			        	<input type="radio" value="Owned" checked={resi==="Owned"} defaultChecked name="res"/>Owned
			        	<input type="radio" value="Rented" checked={resi==="Rented"} name="res"/>Rented
			      	</div>

			      	
			      	{rent_block}

					<div>
						<label>
					      <input type="checkbox" defaultChecked={checked} onChange={checkHandler}/> Copy my current address to permanent address
					    </label>
					</div>

					{checked ? 
					(<div className="form-control">

					

					<Input element="textarea" label="Please enter your Permanent Residence Address" 
					validators={[VALIDATOR_REQUIRE()]}
					id="address1"
					errorText="Please enter your Permanent Residence Address"
					initvalue={formState.inputs.address.value ? formState.inputs.address.value : null}
					initvalid={formState.inputs.address.isValid}
					onInput={formInputHandler1}
					 />

					<Input element="input" type="text" label="Enter City" 
					validators={[VALIDATOR_REQUIRE()]}
					id="city1"
					placeholder="City"
					errorText="Please enter Your Permanent Residence City"
					initvalue={formState.inputs.city.value ? formState.inputs.city.value : null}
					initvalid={formState.inputs.city.isValid}
					onInput={formInputHandler1}
					 />

					<Input element="input" type="text" label="Enter State" 
					validators={[VALIDATOR_REQUIRE()]}
					id="state1"
					placeholder="State"
					errorText="Please enter Your Permanent Residence State"
					initvalue={formState.inputs.state.value ? formState.inputs.state.value : null}
					initvalid={formState.inputs.state.isValid}
					onInput={formInputHandler1}
					 />

					<Input element="input" type="number" label="Postal code" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="postal1"
					placeholder="Postal code"
					errorText="Please enter a Valid Numeric Postal Code"
					initvalue={formState.inputs.postal.value ? formState.inputs.postal.value : null}
					initvalid={formState.inputs.postal.isValid}
					onInput={formInputHandler1}
					 />


					</div>) :

					(<React.Fragment>
					<div className="form-control">

					<Input element="textarea" label="Please enter your Permanent Residence Address" 
					validators={[VALIDATOR_REQUIRE()]}
					id="address1"
					errorText="Please enter your Permanent Residence Address"
					onInput={formInputHandler1}
					initvalue={user.per_res_add}
					initvalid={true} />

					<Input element="input" type="text" label="Enter City" 
					validators={[VALIDATOR_REQUIRE()]}
					id="city1"
					placeholder="City"
					errorText="Please enter Your Permanent City"
					onInput={formInputHandler1}
					initvalue={user.per_city}
					initvalid={true} />

					<Input element="input" type="text" label="Enter State" 
					validators={[VALIDATOR_REQUIRE()]}
					id="state1"
					placeholder="State"
					errorText="Please enter Your Permanent State"
					onInput={formInputHandler1}
					initvalue={user.per_state}
					initvalid={true} />
					
					<Input element="input" type="number" label="Postal code" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="postal1"
					placeholder="Postal code"
					errorText="Please enter a Valid Numeric Postal Code"
					onInput={formInputHandler1}
					initvalue={user.per_postal}
					initvalid={true} />

					</div>
					</React.Fragment>)
			

					}

					<Button onClick={backHandle}>Back</Button>
					<Button type="submit" disabled={!formState.isValid || !formState1.isValid || (resi==="Rented" ? !formState2.isValid : false)}>Update</Button>
					<Button type="button" onClick={goToNext}>Next</Button>

				</form>
				</Card></div>
			</div>
				</React.Fragment>
			);
		}
	}else{
		component=(
				<React.Fragment>
				<div className="flex-container" style={{marginTop:'3rem',marginBottom:'10rem'}}>
				  <div className="flex-item-left" style={{flex:'40%'}}><Status status={2}/></div>
				  <div className="flex-item-right" style={{flex:'60%'}}>
				<Card className="form" style={{margin:'3rem auto'}}>
				{loading && <Loader asOverlay />}
				<form onSubmit={saveHandle}>
					<h3><center>Residence Details</center></h3>
					<hr/>
					<div className="form-control">
					<Input element="textarea" label="Please enter your Current Residence Address" 
					validators={[VALIDATOR_REQUIRE()]}
					id="address"
					placeholder="Course Name"
					errorText="Please enter your Current Residence Address"
					onInput={formInputHandler} />

					<Input element="input" type="text" label="Enter City" 
					validators={[VALIDATOR_REQUIRE()]}
					id="city"
					placeholder="City"
					errorText="Please enter your Current City"
					onInput={formInputHandler} />

					<Input element="input" type="text" label="Enter State" 
					validators={[VALIDATOR_REQUIRE()]}
					id="state"
					placeholder="State"
					errorText="Please enter your Current State"
					onInput={formInputHandler} />

					<Input element="input" type="number" label="Postal code" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="postal"
					placeholder="Postal code"
					errorText="Please enter a Valid Numeric Postal Code"
					onInput={formInputHandler} />

					</div>

					<div className="form-control" onChange={setResHandler}>
						<label>Is your current residence</label>
			        	<input type="radio" value="Owned" defaultChecked name="res"/>Owned
			        	<input type="radio" value="Rented" name="res"/>Rented
			      	</div>


			      	{rent_block}

					<div>
						<label>
					      <input type="checkbox" defaultChecked={checked} onChange={checkHandler}/> Copy my current address to permanent address
					    </label>
					</div>

					{checked ? 
					<div className="form-control">

					

					<Input element="textarea" label="Please enter your Permanent Residence Address" 
					validators={[VALIDATOR_REQUIRE()]}
					id="address1"
					placeholder="Course Name"
					errorText="Please enter your Permanent Residence Address"
					initvalue={formState.inputs.address.value ? formState.inputs.address.value : null}
					initvalid={formState.inputs.address.isValid}
					onInput={formInputHandler1} />

					<Input element="input" type="text" label="Enter City" 
					validators={[VALIDATOR_REQUIRE()]}
					id="city1"
					placeholder="City"
					errorText="Please enter your Permanent Residence City"
					initvalue={formState.inputs.city.value ? formState.inputs.city.value : null}
					initvalid={formState.inputs.city.isValid}
					onInput={formInputHandler1} />

					<Input element="input" type="text" label="Enter State" 
					validators={[VALIDATOR_REQUIRE()]}
					id="state1"
					placeholder="State"
					errorText="Please enter your Permanent Residence State"
					initvalue={formState.inputs.state.value ? formState.inputs.state.value : null}
					initvalid={formState.inputs.state.isValid}
					onInput={formInputHandler1} />

					<Input element="input" type="number" label="Postal code" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="postal1"
					placeholder="Postal code"
					errorText="Please enter a Valid Numeric Postal Code"
					initvalue={formState.inputs.postal.value ? formState.inputs.postal.value : null}
					initvalid={formState.inputs.postal.isValid}
					onInput={formInputHandler1} />


					</div> :

					<React.Fragment>
					<div className="form-control">

					<Input element="textarea" label="Please enter your Permanent Residence Address" 
					validators={[VALIDATOR_REQUIRE()]}
					id="address1"
					placeholder="Course Name"
					errorText="Please enter your Permanent Residence address"
					onInput={formInputHandler1} />

					<Input element="input" type="text" label="Enter City" 
					validators={[VALIDATOR_REQUIRE()]}
					id="city1"
					placeholder="City"
					errorText="Please enter your Permanent Residence City"
					onInput={formInputHandler1} />

					<Input element="input" type="text" label="Enter State" 
					validators={[VALIDATOR_REQUIRE()]}
					id="state1"
					placeholder="State"
					errorText="Please enter your Permanent Residence State"
					onInput={formInputHandler1} />
					
					<Input element="input" type="number" label="Postal code" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="postal1"
					placeholder="Postal code"
					errorText="Please enter a Valid Numeric Postal Code"
					onInput={formInputHandler1} />

					</div>
					</React.Fragment>
			

					}

					<Button onClick={backHandle}>Back</Button>
					<Button type="submit" disabled={!formState.isValid || !formState1.isValid || (resi==="Rented" ? !formState2.isValid : false)}>Next</Button>

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

}

export default Resident;