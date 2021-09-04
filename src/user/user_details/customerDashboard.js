import React,{useState,useContext,useEffect} from 'react';
import './details.css';
import Input from '../../shared/components/formelements/input';
import {Link} from 'react-router-dom';
import Card from '../../ui/card';
import Button from '../../ui/button';
import logo from '../../Man-Using-Computer.svg';
import {useHttp} from '../../shared/hooks/http_hook';
import {route} from '../../route';
import Loader from '../../ui/loader.js';
import ActiveLoans from './activeLoans';
import {useForm} from '../../shared/hooks/form_hook';
import Err from '../../ui/error.js';
import SweetAlert from 'react-bootstrap-sweetalert';
import OngoingStatus from './ongoingStatus';
import {AuthContext} from '../../shared/context/auth_context';
import CoApp from './coappDetails';
import CoAppHist from './coAppHist';

const CustomerDashboard=(props)=>{
	let element,res;
	const auth=useContext(AuthContext);
	const [viewSbmt,setViewsbmt]=useState(false);
	const [success,setSuccess]=useState(false);
	const [st,setSt]=useState(false);
	const [activeLoanComp,setActiveLoanComp]=useState(false);
	const {loading,error,sendReq,clearError}=useHttp();
	const [err,setErr]=useState(null);
	const [viewCoappModal,setViewCoappModal]=useState(false);
	const [applicantView,setApplicantView]=useState(false);
	const [coAppData,setCoappData]=useState(null);
	const [delModal,setdelModal]=useState(false);
	const [appStatus,setAppStatus]=useState(false);
	const [coappStatus,setCoappStatus]=useState(false);

	const [input,setInput]=useState({
		act:"approve",
		sr:"id"
	})
	const [formState,formInputHandler,setFormData]=useForm(
		{
			id:{
				value:'',
				isValid:false
			},
		},
		true);

	//const [flag,setFlag]=useState(null);

	/*useEffect(()=>{
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
				setFlag(res[0].flag);
			}catch(err){
				console.log(err);
			}	
		}
		getUser();
	},[sendReq,setFlag]);*/

	const modalHandler=()=>{
		setViewsbmt(true);
	}

	const closeBlock=()=>{
		setViewsbmt(false);
		setSuccess(false);
	}

	const closeBlock2=()=>{
		setSuccess(false);
		window.location.reload();
	}

	const clean=()=>{
		setErr(false);
	}

	const submitHandler=async ()=>{
		try{
			setViewsbmt(false);
			const data={
				id:auth.userId,
				mode:props.all_data.coapp_flag.includes('req') ? 'coapp' : 'normal',
				flag:"6",
				form_status:"submit"
			}
			res=await sendReq(route+"/api/accounts/insert_user_details",
				"POST",
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			if("success" in res){
				setSuccess(true);
				setSt(true);
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err);
		}
	}

	const handleDelete=async ()=>{
		setdelModal(false);
		try{
			const data={
				id:auth.userId,
				flag:props.all_data.loan_flag==='sbmt' ? '4' : (props.all_data.flag==='5' ? '4' : props.all_data.flag)
			}
			res=await sendReq(route+"/api/accounts/delete_loan",
				"POST",
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			if("success" in res){
				alert('You can now proceed with your Loan application as a Co-applicant')
				window.location.reload();
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err);
		}
	}

	const viewActiveLoans=()=>{
		setActiveLoanComp(true);
		setCoappData(false);
	}

	const viewOngoingApp=()=>{
		setActiveLoanComp(false);
		setCoappData(false);
	}

	const coAppViewHandler=()=>{
		if((props.all_data.id_n.length>0 && props.all_data.loan_flag==='sbmt' && parseInt(props.all_data.flag)>5) || (props.all_data.id_n.length>0 && props.all_data.loan_flag==='not sbmt' && parseInt(props.all_data.flag)>5)){
			//alert('You already have an ongoing application');
			setAppStatus(true);
			return;
		}else if((props.all_data.id_n.length>0 && props.all_data.loan_flag==='not sbmt' && parseInt(props.all_data.flag)<=5) || (props.all_data.id_n.length>0 && props.all_data.coapp_flag==='coapp' && parseInt(props.all_data.flag)<=5) || (props.all_data.id_n.length>0 && props.all_data.loan_flag==='sbmt' && parseInt(props.all_data.flag)<=5)){
			//alert('You already have an ongoing application');
			setdelModal(true);
			//setViewCoappModal(false);
			return;
		}else if(props.all_data.coapp_flag.includes('req')){
			//alert('You already applied for co applicant');
			setCoappStatus(true);
			return;
		}
		setViewCoappModal(true);
		setCoappData(false);
	}

	const searchByHandler=(event) => {
        setInput({...input,sr:event.target.value});
    }

    const handleSearch=async ()=>{
    	setViewCoappModal(false);
    	try{
	    	if(formState.inputs.id.value===''){
	    		alert('You must specify the search data');
	    		return;
	    	}
    		const data={
	    		type:input.sr,
	    		value:formState.inputs.id.value,
	    	}	
	    	console.log(JSON.stringify(data));
	    	res=await sendReq(route+"/api/accounts/get_coapp",
	    		"POST",
	    		JSON.stringify(data),
	    		{
	    			"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
	    		}
	    	);
	    	console.log(res);
	    	if('error' in res || res.length===0){
	    		setErr("Error : No user found");
	    	}else{
	    		setCoappData(res);
	    	}
	    }catch(err){
	    	console.log(err);
	    }
    }

    if(coAppData){
		element=<CoApp email={auth.email} token={auth.token} id={auth.userId} coapp={coAppData} user={props.all_data} />	
	}else if(activeLoanComp){
		if(props.sbmt==="sbmt"){
			element=<ActiveLoans id={auth.userId} token={auth.token}/>
		}else{
			element=<ActiveLoans text="You don't have any active loans"/>
		}
	}else if(props.all_data['flag']>0 || props.all_data['coapp_flag']!=='not sbmt'){
		element=(
			<>
			 <div className="cardy" style={{marginBottom:'15rem'}}>
			  <div className="container">
			    <center><h4 style={{marginTop:'1rem'}}><b>Ongoing Applications</b></h4><br/></center>
			    <div className="flex-container">
				  		<div className="flex-item-left" style={{flex:'60%'}}>
							<div>
							{props.all_data['flag']<2 && (
								(<><h3>No current Loan application filled</h3><br/><Button component={Link} style={{ color: 'inherit', textDecoration: 'inherit'}} to="/forms">Go To Application</Button></>)
							)}
						 	{props.all_data['flag']>=2 && props.all_data['flag']<=6 && 
								(<><h3>Appication Details</h3><br/><div className="details">
								{!st && props.all_data['flag']==='5' && (<div style={{marginLeft:'1rem','marginBottom':'.5rem'}}>
								<div className="flex-container">
				  					<div className="flex-item-left_details" style={{flex:'70%'}}>
						 				<h6 className="animate-flicker" style={{padding:'1rem',fontWeight:'700',color:'black'}}>Your application is saved !! Click on Submit to confirm</h6>
									</div>
									<div className="flex-item-right_details" style={{flex:'30%'}}>
										
						 			</div>
						 		</div></div>)}
			  				{props.all_data['id_n'].length>0 ? (<div className="container">
			  					<h3 style={{marginLeft:'1rem','marginBottom':'1rem',marginTop:'1rem'}}>Loan Details</h3>
			  					 <div className="flex-container">
				  					<div className="flex-item-left_details" style={{flex:'50%'}}>
						 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Email <p style={{fontStyle:"italic",color:"black"}}>{props.all_data['email']}</p></h6>
						 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Phone <p style={{fontStyle:"italic",color:"black"}}>{props.all_data['phone']}</p></h6>
						 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Name <p style={{fontStyle:"italic",color:"black"}}>{props.all_data["id_n"][0]["course_name"]}</p></h6>
									</div>
									<div className="flex-item-right_details" style={{flex:'50%'}}>
										<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Name <p style={{fontStyle:"italic",color:"black"}}>{props.all_data["id_n"][0]["inst_name"]}</p></h6>
						 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Type <p style={{fontStyle:"italic",color:"black"}}>{props.all_data["id_n"][0]["inst_type"]}</p></h6>
						 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan Amount <p style={{fontStyle:"italic",color:"black"}}>{props.all_data["id_n"][0]["financing_required"]}</p></h6>
						 			</div>
						 		</div>
						 </div>) : <CoAppHist flag={props.all_data['flag']} data={props.all_data['id_c']} findApplicant={coAppViewHandler} />}<br/>

						 
					</div><div style={{marginLeft:'1rem','marginBottom':'3rem'}}>{!st && props.all_data['flag']==='5' ? (<div><Button component={Link} style={{ color: 'inherit', textDecoration: 'inherit'}} to="/forms">View and Update</Button><Button type="button" onClick={modalHandler}>Submit</Button></div>)
					: !st && props.all_data['flag']<=4 && props.all_data['id_n'].length>0 && (<Button component={Link} style={{ color: 'inherit', textDecoration: 'inherit'}} to="/forms">Go To Application</Button>)}</div>
								</>
							)}

					</div>
				  </div><br/>
				  <div className="flex-item-right" style={{flex:'40%'}}>
				  <h3>Ongoing Application Fillup</h3><br/>
					{st ? <OngoingStatus st={6}/> : <OngoingStatus st={props.all_data['flag']}/>}
				</div>
				</div>
				</div>
	  		</div></>
		)
	}else if(loading){
		element=<Loader asOverlay />;
	}else{
		element=(<><div className="no-applications">
		<img src={logo} className="logo" alt="logo"/>
			<div className="help-text">
				<Button component={Link} to="/forms">Go To Application</Button>
			</div>
		</div></>)
	}


	return (
		<div>
		<Err error={error} onClear={clearError}/>
		<Err error={err} onClear={clean}/>
		<div className="flex-container">
	  		<div className="flex-item-left"><div className="sidebar">            
            <div className="sdmnu">
                <div className="sdHeader">
                <div className="arrow"><i className="fa fa-angle-double-right"></i></div>
                </div>
                <div className="menuItems" onClick={viewActiveLoans}><p><i className="fa fa-fw fa-home"></i> <label className="sdLabel">Active Loans</label></p></div>

                <div className="menuItems" onClick={viewOngoingApp}><p><i className="fa fa-fw fa-file-invoice"></i> <label className="sdLabel">Ongoing Applications</label></p></div>                
                <div className="menuItems" onClick={coAppViewHandler}><p><i className="fa fa-fw fa-user-cog"></i> <label className="sdLabel">Apply as Coapplicant</label></p></div>
            
            </div>
        	</div>
        	</div>
        	<div className="flex-item-right"><div className="main">
	  			{element}
	  		</div></div>
	  		</div>
	  		<SweetAlert
		       show={viewSbmt}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <><Button onClick={closeBlock}>CANCEL</Button>
		          <Button type="button" onClick={submitHandler}>CONFIRM</Button></>
		        }
		      >Click Confirm to submit the application !!			
		    </SweetAlert>
		    <SweetAlert
		       show={success}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={closeBlock2}>Ok</Button>
		        }
		      >Thank You ! We have received your Application.		
		    </SweetAlert>

		    <SweetAlert
			title="Find Applicant"
			show={viewCoappModal}
	        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
	         customButtons={
	          <Button onClick={()=>setViewCoappModal(false)}>Close</Button>
	        }>
			<div className="flex-container">
    			<div className="flex-item-left" style={{flex:'5%'}}>
					<label style={{marginRight:'1rem'}}>Search By</label>
			    	<select name="search" id="sr" value={input.sr} onChange={searchByHandler} style={{height:'2.7rem',marginRight:'1rem'}}>
                        <option value="id">Loan ID</option>
                        <option value="email">Email</option>
                    </select>
    			</div>
    			<div className="flex-item-left" style={{flex:'80%'}}>
    			<Input element="input" type="text"
			    	coapp_search={true}
					validators={[]}
					id="id"
					placeholder='&#x1F50E;'
					onInput={formInputHandler}
					 />
				</div>
    			<div className="flex-item-left" style={{flex:'5%',marginTop:'1.5rem'}}>
					<Button onClick={handleSearch} style={{marginLeft:'0rem'}}>Go</Button>
				</div>
			 </div>
			</SweetAlert>

			<SweetAlert
			info
			show={delModal}
	        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
	         customButtons={
	          <><Button onClick={handleDelete}>Proceed</Button>
	          <Button onClick={()=>setdelModal(false)}>No</Button></>
	        }>You have a loan application saved. Do you want to cancel and apply as a Co-applicant?
	        </SweetAlert>

	        <SweetAlert
			info
			show={appStatus}
	       style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		         <Button onClick={()=>setAppStatus(false)}>Ok</Button>
		    }
		    >You already have an Ongoing Application
	        </SweetAlert>


	        <SweetAlert
			info
			show={coappStatus}
	       style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		       		<Button onClick={()=>setCoappStatus(false)}>Ok</Button>
		        }
		    >You are already registered as a Co-Applicant
	        </SweetAlert>

		</div>

	);
};

export default CustomerDashboard;

