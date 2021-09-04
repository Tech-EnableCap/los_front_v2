import React,{useEffect,useState} from 'react';
import logo from '../../Man-Using-Computer.svg';
import {useHttp} from '../../shared/hooks/http_hook';
import Button from '../../ui/button';
import {Link} from 'react-router-dom'
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import {route} from '../../route';

const CoApp=React.memo((props)=>{
	console.log("1");
	let res,element;
	const {loading,error,sendReq,clearError}=useHttp();
	const [user,setUser]=useState(null);
	const [select,setSelect]=useState(null);

	if(props.data.length===0){
		element=(
			<div className="no-applications" style={{margin:'0rem auto'}}>
			<img src={logo} className="logo1" style={{margin:'1rem auto'}} alt="logo"/>
				<div className="help-text" style={{marginRight:'1rem'}}>
					You can now apply as a Co-Applicant  &#8287;&#8287;<Button onClick={props.findApplicant}>Find Applicant</Button>
				</div>
			</div>
		);
	}else {
		element=(
			<><div className="container">
  					<h3 style={{marginLeft:'1rem','marginBottom':'1rem',marginTop:'1rem'}}>Applicant's Loan Details</h3>
  					<div className="flex-container">
	  					<div className="flex-item-left_details" style={{flex:'50%'}}>
	  						<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan ID <p style={{fontStyle:"italic",color:"black"}}>{props.data[0]['id']}</p></h6>
			 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Email <p style={{fontStyle:"italic",color:"black"}}>{props.data[0]['applicant_id']['email']}</p></h6>
			 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Phone <p style={{fontStyle:"italic",color:"black"}}>{props.data[0]['applicant_id']['phone']}</p></h6>
			 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Name <p style={{fontStyle:"italic",color:"black"}}>{props.data[0]["course_name"]}</p></h6>
							<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Co Applicant ID <p style={{fontStyle:"italic",color:"black"}}>{props.data[0]['co_applicant_id']}</p></h6>
						</div>
						<div className="flex-item-right_details" style={{flex:'50%'}}>
							<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Name <p style={{fontStyle:"italic",color:"black"}}>{props.data[0]["inst_name"]}</p></h6>
			 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Type <p style={{fontStyle:"italic",color:"black"}}>{props.data[0]["inst_type"]}</p></h6>
			 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan Amount <p style={{fontStyle:"italic",color:"black"}}>{props.data[0]["financing_required"]}</p></h6>
			 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Co Applicant <p style={{fontStyle:"italic",color:"black"}}>{`${props.data[0]["coapp_first_name"]} ${props.data[0]["coapp_last_name"]}`}</p></h6>
			 				<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Co Applicant Relation <p style={{fontStyle:"italic",color:"black"}}>{props.data[0]['relation_to_applicant']}</p></h6>
			 			</div>
			 		</div>
			 </div>
			 {props.flag<=4 && (<div style={{marginLeft:'1rem','marginBottom':'1rem'}}>
			 	<Button component={Link} style={{ color: 'inherit', textDecoration: 'inherit'}} to="/forms">Go To Application</Button>
			 </div>)}</>
		)
	}

	return (
		<div>{element}</div>
	);
});

export default CoApp;