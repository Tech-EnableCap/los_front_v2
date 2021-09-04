import React,{useState} from 'react';
import logo from '../../Man-Using-Computer.svg';
import {useHttp} from '../../shared/hooks/http_hook';
import {useHistory} from 'react-router-dom'
import Button from '../../ui/button';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import {route} from '../../route';
import {useForm} from '../../shared/hooks/form_hook';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE} from '../../shared/util/validator';
import Applications from './applicationList';
import SweetAlert from 'react-bootstrap-sweetalert';

const CoApp=React.memo((props)=>{
	console.log(props);
	let history=useHistory()
	let res,element;
	const {loading,error,sendReq,clearError}=useHttp();
	const [select,setSelect]=useState(null);
	const [checked,setChecked]=useState(false);
	const [err,setErr]=useState(false);
	const [modal,setModal]=useState(false);
	const [coAppConfirm,setcoappConfirm]=useState(false);

	const [formState,inputHandler,setFormData]=useForm(
		{
			relation:{
				value:'',
				isValid:false
			},
		},false
	);

	const checkHandler=()=>{
		setChecked((prev)=>!prev);
	};

	const clean=()=>{
	    setErr(false);
	  }


	const coApphandle=async (id,app_id,email,f_name,l_name)=>{
		setChecked(false);
		const data={
			co_applicant_id:props.id,
			applicant_id:app_id,
			coapp_first_name:props.user.first_name,
			coapp_last_name:props.user.last_name,
			relation_to_applicant:formState.inputs.relation.value,
			loan_id:id,
			flag:props.user.loan_flag==='sbmt' ? '4' : (props.user.flag===5 ? '4' : props.user.flag),
			applicant_email:email,
			applicant_name:f_name+' '+l_name
		}
		try{
			res=await sendReq(route+"/api/accounts/register_coapp",
				"POST",
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+props.token
				}
			);
			if ('success' in res){
				//alert('You are successfully registered as a Co-Applicant to Loan Id '+id);
				//history.push('/forms')
				setcoappConfirm(true);
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err);
		}
	}


	/*const MailHandle=async ()=>{
		try{
			const data={
				id:'5'
			}
			res=await sendReq(route+"/api/accounts/mail",
				"POST",
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+props.token
				}
			);
			console.log(res);
		}catch(err){
			console.log(err);
		}	
	}*/

	if(loading){
		element=<Loader asOverlay />
	}if(select){
		element=<Applications id={select}/>
	}else if(props.coapp){
		element=(
			<>
			 <div className="cardy" style={{marginBottom:'15rem'}}>
			  <div className="container">
			    <center><h4 style={{marginTop:'1rem'}}><b>Applicantions, Related to Your Search</b></h4><br/></center>
			   		{props.coapp.map((usr,idx)=>{
			   			return (
			   			<div className="flex-container" key={idx}>
				  			<div className="flex-item-left_details" style={{flex:'100%'}}>
				   				<div className="details">
				   					<div className="container">
				   						<div className="flex-container">
					  					<div className="flex-item-left_details" style={{flex:'50%'}}>
					  						<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan ID <p style={{fontStyle:"italic",color:"black"}}>{usr.id}</p></h6>
					  						<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Applicant's Email <p style={{fontStyle:"italic",color:"black"}}>{usr.applicant_id.email}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institiue Name <p style={{fontStyle:"italic",color:"black"}}>{usr.inst_name}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Name <p style={{fontStyle:"italic",color:"black"}}>{usr.course_name}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Tenure <p style={{fontStyle:"italic",color:"black"}}>{usr.course_tenure}</p></h6>
										</div>
										<div className="flex-item-right_details" style={{flex:'50%'}}>
											<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Applicant's Name <p style={{fontStyle:"italic",color:"black"}}>{`${usr.applicant_id.first_name} ${usr.applicant_id.last_name}`}</p></h6>
											<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Applicant's Mobile <p style={{fontStyle:"italic",color:"black"}}>{usr.applicant_id.phone}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>{usr.admin_approve ? "Loan Taken" : "Loan Requested"}<p style={{fontStyle:"italic",color:"black"}}>{usr.financing_required}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Fee <p style={{fontStyle:"italic",color:"black"}}>{usr.course_fee}</p></h6>
							 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan Tenure <p style={{fontStyle:"italic",color:"black"}}>{usr.loan_tenure}</p></h6>
										</div>
							 		</div>
							 		{props.email!==usr.applicant_id.email && (<div style={{marginBottom:'3rem'}}>
						 				<label style={{border:'2px solid',padding:'1rem',marginRight:'2rem',marginLeft:'1rem'}}>
									      <input type="checkbox" style={{margin:"10px"}} checked={checked} onChange={checkHandler} />I Confirm
									    </label>

									    <SweetAlert
									       show={checked}
									        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
									         customButtons={
									          <><Button onClick={()=>coApphandle(usr.id,usr.applicant_id.id,usr.applicant_id.email,usr.applicant_id.first_name,usr.applicant_id.last_name)} disabled={!formState.isValid}>Submit</Button>
									          <Button onClick={()=>{setChecked(false)}}>Close</Button></>
									        }
									      ><Input element="input" type="text" label="Relation to Applicant"
														id="relation"
														validators={[VALIDATOR_REQUIRE()]}
														placeholder="Relation" 
														errorText="Please enter details"
														onInput={inputHandler} />
									    </SweetAlert>

									    <SweetAlert success
											show={coAppConfirm}
									        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
									         customButtons={
									          <Button onClick={()=>{setcoappConfirm(false); history.push('/forms');}}>OK</Button>
									        }>
											  You are successfully registered as a Co-Applicant
										</SweetAlert>

								    </div>)}
				   				</div>
				   				</div>
			   				</div>
			   			</div>
			   			)
			   		})}
				</div></div></>);
	}

	return (
		<div>{element}</div>
	);
});

export default CoApp;