import React,{useState,useContext} from 'react';
import Card from '../../ui/card';
import './auth.css';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE,VALIDATOR_EMAIL,VALIDATOR_PHONE,VALIDATOR_NUMBER,VALIDATOR_MINLENGTH,VALIDATOR_PASSWORD} from '../../shared/util/validator';
import SweetAlert from 'react-bootstrap-sweetalert';
import {useForm} from '../../shared/hooks/form_hook';
import {useHttp} from '../../shared/hooks/http_hook';
/*import axios from 'axios'; */
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import {GoogleLogin} from 'react-google-login';
import {route} from '../../route';
import {AuthContext} from '../../shared/context/auth_context';
import EmailAuth from '../../thirdPartyApiLib/emailVer';
import MobileAuth from '../../thirdPartyApiLib/mobVer';

const Authenticate=()=>{
	let success_block,res;
	const {loading,error,sendReq,clearError}=useHttp();
	const [isLoginMode,setIsLoginMode]=useState(true);
	const [closeModal,setCloseModal]=useState(false);
	const [timeout,setTimeoutref]=useState(null);
	const [user,setUser]=useState(null);
	const [err,setErr]=useState(false);
	const auth=useContext(AuthContext);
	const [otpValid_email,setOtpValid_email]=useState(false);
	const [otpValid_mobile,setOtpValid_mobile]=useState(false);
	const [errModal,setErrModal]=useState(false);
	const [comeOtp,setComeOtp]=useState(false);
	const [comeOtp_1,setComeOtp_1]=useState(false);
	const [tim,setTime]=useState(150);
	const [resetModal,setReset]=useState(false);
	const [load,setLoad]=useState(null);
	const [created,setCreated]=useState(false);
	const [formState,inputHandler,setFormData]=useForm(
		{
			email:{
				value:'',
				isValid:false
			},
			pass:{
				value:'',
				isValid:false
			},
		},false
	);

	const [otp_form_email,otp_handler_email,setOtp_form_email]=useForm(
		{
			email_otp:{
				value:'',
				isValid:false
			}
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

	const [formStateReset,inputHandlerReset,setFormDataReset]=useForm(
		{
			email_res:{
				value:'',
				isValid:false
			},
		},false
	);

	const switchModeHandler=()=>{
		window.scrollTo(0,0);
		if(!isLoginMode){
			setFormData(
				{
					...formState.inputs,
					first_name:undefined,
					last_name:undefined,
					phone:undefined,
					repass:undefined
				},
				formState.inputs.email.isValid && formState.inputs.pass.isValid
			);
		}else{
			setFormData(
				{
					...formState.inputs,
					first_name:{
						value:"",
						isValid:false,
					},
					last_name:{
						value:"",
						isValid:false,
					},
					phone:{
						value:"",
						isValid:false
					},
					repass:{
						value:'',
						isValid:false
					},
				},
				false
			);
		}
		setIsLoginMode((prev)=>!prev);
	}

	const clean=()=>{
		setErr(false);
	}

	const comeOtpHandleEmail=()=>{
		setLoad(true);
		EmailAuth.sendOTP(formState.inputs.email.value).then((res)=>{
			console.log(res);
			setLoad(false);
			//console.log(formState.inputs.email.value);
			alert('OTP sent to your email');
			setComeOtp(true);
			setTimeoutref(setInterval(()=>{
		      setTime(prevState=>prevState-1);
		    },1000));

		}).catch((err)=>{
			console.log(err);
			setLoad(false);
		})
		
	}


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

	const handleOtpEmail=()=>{
		setLoad(true);
		EmailAuth.verifyOTP(otp_form_email.inputs.email_otp.value).then((res)=>{
			console.log(res);
			setLoad(false);
			if(res==="Email Verified" || res==="Email is already verified"){
				setComeOtp(false);
				setCloseModal(true);
				clearInterval(timeout);
				setTime(150);
				setOtp_form_email(true);
			}else{
				setComeOtp(false);
				setErrModal(true);
				clearInterval(timeout);
				setTime(150);
			}
		}).catch((err)=>{
			console.log(err);
			setLoad(false);
			setErrModal(true);
		})
	}

	const handleOtpMobile=()=>{
		setLoad(true);
		MobileAuth.verifyOTP(otp_form_mobile.inputs.mobile_otp.value).then((res)=>{
			console.log(res);
			setLoad(false);
			if(res){
				setComeOtp_1(false);
				setCloseModal(true);
				clearInterval(timeout);
				setTime(150);
				setOtpValid_mobile(true);
			}
		}).catch((err)=>{
			console.log(err);
			setLoad(false);
			setErrModal(true);
		})
	}


	/*const comeOtpHandleEmail=()=>{
		setLoad(true);
		setLoad(false);
		alert('OTP Sent Succesfully to your Email ID');
		setComeOtp(true);
		setTimeoutref(setInterval(()=>{
	      setTime(prevState=>prevState-1);
	    },1000));
		
	}


	const comeOtpHandleMobile=()=>{
		setLoad(true);
		setLoad(false);
		alert('OTP Sent Succesfully to your Mobile Number');
		setComeOtp_1(true);
		setTimeoutref(setInterval(()=>{
	      setTime(prevState=>prevState-1);
	    },1000));
	}

	const handleOtpEmail=()=>{
		setComeOtp(false);
		setLoad(true);
		setLoad(false);
		setCloseModal(true);
		clearInterval(timeout);
		setTime(150);
		setOtp_form_email(true);
	}

	const handleOtpMobile=()=>{
		setComeOtp_1(false);
		setLoad(true);
		setLoad(false);
		setCloseModal(true);
		clearInterval(timeout);
		setTime(150);
		setOtpValid_mobile(true);
	}*/



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

/*const timer=(set_timer)=>{
	console.log(timerOn);
	let m=Math.floor(set_timer/60);
  	let s=set_timer%60;
  	m=m<10 ? '0' +m : m;
  	s=s<10 ? '0' +s : s;
  	setTime(m + ':' + s);
  	console.log(m + ':' + s)
  	set_timer-=1;
  
  	if(set_timer>= 0 && timerOn){
    	timeout=setTimeout(function(){
        	timer(set_timer);
    	},1000);
    	return;
  	}

  	if(!timerOn){
    	clearInterval();
    	alert('here');
    	return;
  	}
  	alert('Timeout for otp');
}*/


	const closeBlock=()=>{
		setComeOtp(false);
		setComeOtp_1(false);
		clearInterval(timeout);
		setTime(150);
	}


	if(comeOtp || comeOtp_1){
		if(tim===0){
			clearInterval(timeout);
		}
	}


	const resetPassHandler=async ()=>{
		setReset(false);
		try{
			const data={
				email:formStateReset.inputs.email_res.value
			}
			res=await sendReq(route+"/api/accounts/request_reset_email",
				'POST',
				JSON.stringify(data),
				{
					"Content-Type":"application/json"
				}
			);
			console.log(res);
			if('success' in res){
				alert("Reset Password instructions successfully sent to your email");
			}
		}catch(err){
			console.log(err)
		}
	}

	

	const authHandle=async (event)=>{
		event.preventDefault();
		const header={
			"Content-Type":"application/json"
		}
		if(isLoginMode){
			try{
				const data={
					email:formState.inputs.email.value,
					password:formState.inputs.pass.value
				}
				res=await sendReq(
					route+"/api/token/",
					"POST",
					JSON.stringify(data),
					header
				);
				console.log(res);
				auth.login(res.access,res.user,res.name,res.id);
			}catch(err){
				console.log(err);	
			}
		}else{
			try{
				const data={
					first_name:formState.inputs.first_name.value,
					last_name:formState.inputs.last_name.value,
					email:formState.inputs.email.value,
					phone:formState.inputs.phone.value,
					pass:formState.inputs.pass.value,
					repass:formState.inputs.repass.value
				}
				console.log(data);
				res=await sendReq(
					route+"/api/accounts/signup",
					"POST",
					JSON.stringify(data),
					header
				);
				console.log(res);
				if('success' in res){
					setCreated(true);
					setIsLoginMode((prev)=>!prev);
				}else{
					alert(res["error"]);
				}
			}catch(err){
				console.log(err)
			}
			
		}
	};

	const responseGoogle=async (response)=>{
	  	try{
			const data={
				auth_token:response['Zb']['id_token']
			}
			const header={
				"Content-Type":"application/json"
			}
			console.log(data);
			res=await sendReq(
				route+"/api/google",
				"POST",
				JSON.stringify(data),
				header
			);
			console.log(res);
			auth.login(res.access,res.user,res.name,res.id);
		}catch(err){
			console.log(err)
		}
	}

	const failureGoogle=(response)=>{
		console.log(response);
	}



	
	return(
		<React.Fragment>
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			<Card className="authentication" style={{top:"3rem",borderRadius:"1.25rem"}}>
			{(loading || load) && <Loader asOverlay />}
			<h3 style={{fontWeight:'700'}}>Welcome to <a style={{fontWeight:'800',fontStyle:'italic'}}>EnableCap</a></h3>
			<hr/>
			{!isLoginMode ? (<h4>SIGN UP</h4>) : (<h4>LOG IN</h4>)}
			<form onSubmit={authHandle}>
			{!isLoginMode && (<Input
              type="text"
              id="first_name"
              element="input"
              label="Your First Name"
              placeholder="First Name"
              image='fas fa-user'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid Name"
              onInput={inputHandler}
            />)}
            {!isLoginMode && (<Input
              type="text"
              id="last_name"
              element="input"
              label="Your Last Name"
              placeholder="Last Name"
              image='fas fa-user'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid Name"
              onInput={inputHandler}
            />)}
            <Input
              type="email"
              id="email"
              element="input"
              label="Your Email"
              placeholder="Email"
              image='fas fa-envelope'
              validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
              errorText="Please enter a valid Email"
              onInput={inputHandler}
            />
            {!isLoginMode && (<Input 
            	element="input" 
            	type="number"
            	id="phone"
            	label="Your Mobile Number"
            	image='fas fa-mobile-alt'
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_PHONE()]}
				placeholder="Mobile number"
				errorText="Please enter a valid Mobile Number"
				onInput={inputHandler}
			 />)}
            <Input
	            element="input"
	            id="pass"
	            type="password"
	            label="Password"
	            image='fas fa-key'
	            view='fas fa-eye'
	            placeholder= {!isLoginMode ? "Password must be at least 8 char long" : "Password"}
	            validators={[VALIDATOR_REQUIRE()]}
	            errorText="Password should contain Minimum 8 Letters with • a Symbol • an Upper case • a Lower case • a Number"
	            onInput={inputHandler}
	        />
            {!isLoginMode && (<Input
	            element="input"
	            id="repass"
	            type="password"
	            label="Retype Password"
	            image='fas fa-key'
	            view='fas fa-eye'
	            placeholder="Retype same password"
	            validators={[VALIDATOR_REQUIRE()]}
	            errorText="Please Re-enter Password"
	            onInput={inputHandler}
             />)}

          	{!isLoginMode && formState.isValid && formState.inputs.pass.value===formState.inputs.repass.value ? (
          		<Button type="button" size="couple" onClick={comeOtpHandleEmail}>Verify Email</Button>
          	) : null}

          	{!isLoginMode && formState.isValid && formState.inputs.pass.value===formState.inputs.repass.value ? (
          		<Button type="button" onClick={comeOtpHandleMobile}>Verify Mobile</Button>
          	) : null}

          	<Button type="submit" size={!isLoginMode && formState.isValid && formState.inputs.pass.value===formState.inputs.repass.value && "couple"} style={{marginTop:'1rem'}} disabled={isLoginMode ? !formState.isValid : !formState.isValid || !otpValid_email && !otpValid_mobile}>
            	{isLoginMode===true ? "LOG IN" : "SIGN UP"}
          	</Button>

          	</form>

          	<SweetAlert
		       show={comeOtp || comeOtp_1}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={closeBlock}>Close</Button>
		        }
		      ><div><center><React.Fragment><Input element="input" type="text" label="Enter OTP"
							id={`${comeOtp ? "email_otp" : "mobile_otp"}`}
							validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER()]}
							placeholder="enter otp" 
							errorText="Please input otp"
							onInput={comeOtp ? otp_handler_email : otp_handler_mobile} />
							<Button type="button" onClick={comeOtp ? handleOtpEmail : handleOtpMobile} disabled={(comeOtp ? !otp_form_email.isValid : !otp_form_mobile.isValid) || tim===0} style={{marginRight:'1rem',marginLeft:'1rem'}}>VALIDATE OTP</Button>
							<span style={{border:'2px solid',padding:'5px',background:tim<10 && "red"}}>{`${timer_convertor(tim)}`}</span>
							</React.Fragment></center></div>
		    </SweetAlert>

          	<SweetAlert success
				show={closeModal}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={()=>setCloseModal(false)}>OK</Button>
		        }>
				  Verified
			</SweetAlert>

			<SweetAlert success
				show={created}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={()=>setCreated(false)}>OK</Button>
		        }>
				  User Created
			</SweetAlert>

			<SweetAlert warning
				show={errModal}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={()=>setErrModal(false)}>OK</Button>
		        }>
				  Invalid OTP
			</SweetAlert>

	        {isLoginMode && <React.Fragment><div onClick={()=>setReset(true)}><h6 className="forgot_pass" style={{cursor:"pointer",fontWeight:'700'}}>Forgot Password? click here</h6></div><div style={{position:'center',marginBottom:'2rem'}}><GoogleLogin
			    clientId="585894627780-bu55qgqd1skoigeihip64ur8a78ic0qc.apps.googleusercontent.com"
			    buttonText="GOOGLE LOG IN"
			    onSuccess={responseGoogle}
			    onFailure={failureGoogle}
			    cookiePolicy={'single_host_origin'}
			  /></div></React.Fragment>}

	        <Button inverse onClick={switchModeHandler}>
	          SWITCH TO {isLoginMode===true ? "SIGN UP" : "LOG IN"}
	        </Button>

	        <SweetAlert
				show={resetModal}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={()=>setReset(false)}>Close</Button>
		        }>
				  <Input
	              type="email"
	              id="email_res"
	              element="input"
	              label="Please Enter Your Registered Email"
	              placeholder="Email"
	              image='fas fa-envelope'
	              validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
	              errorText="Please enter a valid Email"
	              onInput={inputHandlerReset}
	              initvalue={formStateReset.inputs.email_res.value}
	              initvalid={formStateReset.isValid}
	            />
	            <Button type="button" disabled={!formStateReset.isValid} onClick={resetPassHandler}>Reset</Button>
			</SweetAlert>

	        </Card>

		</React.Fragment>
	);
};

export default Authenticate;
