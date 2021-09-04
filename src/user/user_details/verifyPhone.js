import React,{useState} from 'react';
import Card from '../../ui/card';
import '../../user/authenticate/auth.css';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE,VALIDATOR_PHONE,VALIDATOR_NUMBER} from '../../shared/util/validator';
import SweetAlert from 'react-bootstrap-sweetalert';
import {useForm} from '../../shared/hooks/form_hook';
import {useHttp} from '../../shared/hooks/http_hook';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import {route} from '../../route';
import Personal from './personal';
import MobileAuth from '../../thirdPartyApiLib/mobVer';


const PhoneVerify=(props)=>{
	let res;
	const {loading,error,sendReq,clearError}=useHttp();
	const [closeModal,setCloseModal]=useState(false);
	const [timeout,setTimeoutref]=useState(null);
	const [err,setErr]=useState(false);
	const [comeOtp_1,setComeOtp_1]=useState(false);
	const [tim,setTime]=useState(150);
	const [load,setLoad]=useState(null);
	const [next,setNext]=useState(null);
	const [errModal,setErrModal]=useState(false);

	const [formState,inputHandler,setFormData]=useForm(
		{
			phone:{
				value:'',
				isValid:false
			},
		},false
	);

	const [otp_form_mobile,otp_handler_mobile,setOtp_form_mobile]=useForm(
		{
			mobile_otp:{
				value:'',
				isValid:false
			}
		},false
	);

	/*const comeOtpHandleMobile=()=>{
		setLoad(true);
		MobileAuth.sendOTP(formState.inputs.phone.value).then((res)=>{
			console.log(res);
			setLoad(false);
			setComeOtp_1(true);
			setTimeoutref(setInterval(()=>{
		      setTime(prevState=>prevState-1);
		    },1000));
		}).catch((err)=>{
			console.log(err);
		})
	}*/

	const comeOtpHandleMobile=()=>{
		setLoad(true);
		MobileAuth.sendOTP(formState.inputs.phone.value).then((res)=>{
			console.log(res);
			setLoad(false);
			alert('OTP sent to your mobile');
			setComeOtp_1(true);
			setTimeoutref(setInterval(()=>{
		      setTime(prevState=>prevState-1);
		    },1000));
		}).catch((err)=>{
			console.log(err);
			setLoad(false);
		})
	}

	const handleOtpMobile=()=>{
		setLoad(true);
		MobileAuth.verifyOTP(otp_form_mobile.inputs.mobile_otp.value).then((res)=>{
			console.log(res);
			setLoad(false);
			if(res){
				setComeOtp_1(false);
				clearInterval(timeout);
				setTime(150);
				saveMobile();
			}
		}).catch((err)=>{
			console.log(err);
			setLoad(false);
			setErrModal(true);
		})
	}

	const saveMobile=async ()=>{
		try{
			const data={
				id:props.user.userId,
				phone:formState.inputs.phone.value
			}
			const header={
				"Content-Type":"application/json",
				Authorization: "Bearer "+props.user.token
			}
			res=await sendReq(
				route+"/api/accounts/phone_verify",
				"PATCH",
				JSON.stringify(data),
				header
			);
			console.log(res);
			if('success' in res){
				setCloseModal(true);
			}
		}catch(err){
			console.log(err)
		}
	}

	const closeBlock=()=>{
		setComeOtp_1(false);
		clearInterval(timeout);
		setTime(150);
	}


	if(comeOtp_1){
		if(tim===0){
			clearInterval(timeout);
		}
	}



	const timer_convertor=(time)=>{
		try{
			let m=Math.floor(time/60);
	  		let s=time%60;
	  		m=m<10 ? '0' +m : m;
	  		s=s<10 ? '0' +s : s;
	  		return (m + ':' + s);
		}catch(err){
			return time;
		}
	}

	const clean=()=>{
		setErr(false);
	}

	return(

		<React.Fragment>
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			{next ? (<Personal flag={0}/>) : (<Card className="authentication" style={{top:"10rem",borderRadius:"1.25rem"}}>
			{loading || load && <Loader asOverlay />}
			<h4>Hey!</h4>
			<form>

			<Input 
            	element="input" 
            	type="number"
            	id="phone"
            	label="Verify your Mobile Number"
            	image='fas fa-mobile-alt'
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_PHONE()]}
				placeholder="Mobile number"
				errorText="Please enter a valid Mobile Number"
				onInput={inputHandler}
			 />

			 <Button type="button" onClick={comeOtpHandleMobile} disabled={!formState.isValid}>Verify Mobile</Button>
			 </form>

			<SweetAlert
		       show={comeOtp_1}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={closeBlock}>Close</Button>
		        }
		      ><div><center><React.Fragment><Input element="input" type="number" label="Enter OTP"
							id="mobile_otp"
							validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER()]}
							placeholder="enter otp" 
							errorText="Please input otp"
							onInput={otp_handler_mobile} />
							<Button type="button" onClick={handleOtpMobile} disabled={!otp_form_mobile.isValid || tim===0} style={{marginRight:'1rem',marginLeft:'1rem'}}>VALIDATE OTP</Button>
							<span style={{border:'2px solid',padding:'5px',background:tim<10 && "red",fontWeight:'900'}}>{`${timer_convertor(tim)}`}</span>
							</React.Fragment></center></div>
		    </SweetAlert>

		    <SweetAlert success
				show={closeModal}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={()=>{setCloseModal(false); setNext(true);}}>OK</Button>
		        }>
				  Verified
			</SweetAlert>

			<SweetAlert warning
				show={errModal}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={()=>setErrModal(false)}>OK</Button>
		        }>
				  Invalid OTP
			</SweetAlert>

		    </Card>)}

		</React.Fragment>

	);

};


export default PhoneVerify;