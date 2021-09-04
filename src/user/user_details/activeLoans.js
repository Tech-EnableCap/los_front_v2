import React,{useEffect,useState} from 'react';
import logo from '../../Man-Using-Computer.svg';
import {useHttp} from '../../shared/hooks/http_hook';
import Button from '../../ui/button';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import {route} from '../../route';

const ActiveLoans=React.memo((props)=>{
	console.log("1");
	let res,element;
	const {loading,error,sendReq,clearError}=useHttp();
	const [user,setUser]=useState(null);
	useEffect(()=>{
		if(props.id)
			getUser()
	},[props.id]);

	const getUser=async ()=>{
		try{
			const data={
				id:props.id
			}
			res=await sendReq(route+"/api/accounts/archive_details",
				"POST",
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+props.token
				}
			);
			console.log(res);
			setUser(res);
		}catch(err){
			console.log(err);
		}	
	}

	if(props.id){
		if(user){
			element=(
				<>
			 <div className="cardy" style={{marginBottom:'15rem'}}>
			  <div className="container">
			    <center><h4 style={{marginTop:'1rem'}}><b>Active Loans</b></h4><br/></center>
			   		{user.map((usr,idx)=>{
			   			return (
			   			<div className="flex-container" key={idx}>
				  			<div className="flex-item-left_details" style={{flex:'100%'}}>
				   				<div className="details"  style={{background:!usr.admin_approve && 'red'}}>
				   					<div className="container">
				   						<h3 style={{marginLeft:'1rem','marginBottom':'1rem',marginTop:'1rem'}}>{usr.admin_approve ? "Approved and Disbursed" : "Not Approved"}</h3>
				   						<div className="flex-container">
					  					<div className="flex-item-left_details" style={{flex:'50%'}}>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institiue Name <p style={{fontStyle:"italic",color:"black"}}>{usr.inst_name}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Name <p style={{fontStyle:"italic",color:"black"}}>{usr.course_name}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Tenure <p style={{fontStyle:"italic",color:"black"}}>{usr.course_tenure}</p></h6>
										</div>
										<div className="flex-item-right_details" style={{flex:'50%'}}>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>{usr.admin_approve ? "Loan Taken" : "Loan Requested"}<p style={{fontStyle:"italic",color:"black"}}>{usr.financing_required}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Fee <p style={{fontStyle:"italic",color:"black"}}>{usr.course_fee}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan Tenure <p style={{fontStyle:"italic",color:"black"}}>{usr.loan_tenure}</p></h6>
										</div>
							 		</div>
				   					</div>
				   				</div>
			   				</div>
			   			</div>
			   			)
			   		})}
				</div></div></>
			)
		}
	}else if(props.text){
		element=(
			<><div className="no-applications" style={{marginTop:'13rem'}}>
			<img src={logo} className="logo" alt="logo"/>
				<div className="help-text">
					{props.text}
				</div>
			</div></>
		)
	}

	return (
		<div>{element}</div>
	);
});

export default ActiveLoans;