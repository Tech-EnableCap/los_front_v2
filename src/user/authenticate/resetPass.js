import React,{useState,useEffect} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import Card from '../../ui/card';
import './auth.css';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE,VALIDATOR_PASSWORD} from '../../shared/util/validator';
import SweetAlert from 'react-bootstrap-sweetalert';
import {useForm} from '../../shared/hooks/form_hook';
import {useHttp} from '../../shared/hooks/http_hook';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import {route} from '../../route';
import logo from '../../errname1.svg';


const ResetPass=()=>{
	let res;
	let history=useHistory();
	const [err,setErr]=useState(false);
	const {id,token}=useParams();
	const [element,setElement]=useState(null);
	const {loading,error,sendReq,clearError}=useHttp();
	const [formStateReset,inputHandlerReset,setFormDataReset]=useForm(
		{
			pass:{
				value:'',
				isValid:false
			},
			repass:{
				value:'',
				isValid:false
			},
		},false
	);

	const clean=()=>{
		setErr(false);
	}

	useEffect(()=>{
		const checkValidity=async ()=>{
			const data={
				id:id,
				token:token
			}
			try{
				res=await sendReq(route+"/api/accounts/check_validity",
					'POST',
					JSON.stringify(data),
					{
						"Content-Type":"application/json"
					}
				);
				console.log(res);
				if('error' in res){
					setElement(true)
				}
			}catch(err){
				console.log(err);
				setElement(true);
			}
		}
		checkValidity();
	},[sendReq]);

	const resetPassHandle=async (e)=>{
		e.preventDefault();
		const data={
			'uidb64':id,
			'token':token,
			'password':formStateReset.inputs.pass.value
		}
		try{
			res=await sendReq(route+"/api/accounts/password_reset",
				'PATCH',
				JSON.stringify(data),
				{
					"Content-Type":"application/json"
				}
			);
			console.log(res);
			if('success' in res){
				alert('password reset !!');
				history.push('/forms');
			}
		}catch(err){
			console.log(err)
		}
	}

	return (
			<React.Fragment>
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			<Card className="authentication" style={{top:"3rem",borderRadius:"1.25rem"}}>
			{loading && <Loader asOverlay />}
			{element ? (<><h4>OOPS...</h4><img src={logo} className="logo" alt="logo"/><h5>Looks like your link has been expired or link is invalid !! </h5></>) : (<><h4>RESET PASSWORD</h4>
			<form onSubmit={resetPassHandle}>
            <Input
	            element="input"
	            id="pass"
	            type="password"
	            label="Password"
	            image='fas fa-key'
	            view='fas fa-eye'
	            placeholder="Password must be at least 8 char long"
	            validators={[VALIDATOR_REQUIRE(),VALIDATOR_PASSWORD()]}
	            errorText="Please enter a valid password of min 8 letter, with at least a symbol, upper and lower case letters and a number"
	            onInput={inputHandlerReset}
	        />
            <Input
	            element="input"
	            id="repass"
	            type="password"
	            label="Retype Password"
	            image='fas fa-key'
	            view='fas fa-eye'
	            placeholder="Retype same password"
	            validators={[VALIDATOR_REQUIRE()]}
	            errorText="Please retype password"
	            onInput={inputHandlerReset}
             />
      
	        <Button type="submit" disabled={!formStateReset.isValid}>Reset</Button>
          	</form></>)}
	        </Card>

		</React.Fragment>
	);
};

export default ResetPass