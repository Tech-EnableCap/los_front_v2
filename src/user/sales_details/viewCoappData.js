import React,{useState} from 'react';
import Card from '../../ui/card';
import PdfView from '../../user/user_details/pdfView';
import ImagePicker from '../../shared/components/formelements/single_image_picker';
import Button from '../../ui/button';
import CompanyDashboard from './salesDashboard';
import SweetAlert from 'react-bootstrap-sweetalert';
import PanAuth from '../../thirdPartyApiLib/panVer';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';


const CoAppDetails=(props)=>{
	const [loader,setLoader]=useState(null);


	const panVerifyHandle=()=>{
		setLoader(true);
		//console.log(props.data.co_applicant_id.pan_num,props.data.co_applicant_id.dob.split("-").reverse().join("/"),props.data.co_applicant_id.first_name+' '+props.data.co_applicant_id.last_name);
		PanAuth.sendData(props.data.co_applicant_id.pan_num,props.data.co_applicant_id.first_name+' '+props.data.co_applicant_id.last_name,props.data.co_applicant_id.dob.split("-").reverse().join("/")).then((res)=>{
			console.log(res);
			if(res.status==='Active' && res.nameMatch && res.dobMatch){
				console.log(res);
				setLoader(false);
			}else{
				setLoader(false);
			}
		}).catch((err)=>{
			console.log(err);
			alert('document not verified');
			setLoader(false);
		})
	}


	return(
		 <>{loader ? (<Loader asOverlay />) : (<div className="details" style={{top:'0rem',maxWidth:'100rem',background: 'white',padding:'1rem'}}>
		<h3><center>Co-Applicants Details</center></h3><br/>
		<div className="details" ref={props.perRef}>
				<div className="container">
					<h3><center>Personal Details</center></h3>
					<br/>
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan ID <p style={{fontStyle:"italic",color:"black"}}>{props.data.id}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Email <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.email}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Gender <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.gender}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Status <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.marital}</p></h6>
					</div>
				  		<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Name <p style={{fontStyle:"italic",color:"black"}}>{`${props.data.co_applicant_id.first_name} ${props.data.co_applicant_id.last_name}`}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Phone <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.phone}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>DOB <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.dob}</p></h6>

					</div>
					</div>
				
				</div>
		</div>
		<div className="details" ref={props.loanRef}>
				<div className="container">
					<h3><center>Loan Details</center></h3>
					<br/>
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Name <p style={{fontStyle:"italic",color:"black"}}>{props.data.inst_name}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Type <p style={{fontStyle:"italic",color:"black"}}>{props.data.inst_type}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Location <p style={{fontStyle:"italic",color:"black"}}>{props.data.inst_location}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Class Of Student <p style={{fontStyle:"italic",color:"black"}}>{props.data.class_of_student}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan Tenure <p style={{fontStyle:"italic",color:"black"}}>{props.data.loan_tenure}</p></h6>
					</div>
				  		<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Name <p style={{fontStyle:"italic",color:"black"}}>{props.data.course_name}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Tenure <p style={{fontStyle:"italic",color:"black"}}>{props.data.course_tenure}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Fee <p style={{fontStyle:"italic",color:"black"}}>{props.data.course_fee}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan Requested <p style={{fontStyle:"italic",color:"black"}}>{props.data.financing_required}</p></h6>
					</div>
					</div>
				
				</div>
		</div>
		<div className="details" ref={props.resRef}>
				<div className="container">
					<h3><center>Residence Details</center></h3>
					<br/>
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current Address <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.cur_res_add}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current State <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.cur_state}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Residence Type <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.cur_res}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Owned By <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.owned_by}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Permanent Address <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.per_res_add}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Permanent State <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.per_state}</p></h6>
					</div>
				  		<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current City <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.cur_city}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current Postal <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.cur_postal}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Rented By <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.rented_by}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Monthly Rent<p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.monthly_rent}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Permanent City<p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.per_city}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Permanent Postal<p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.per_postal}</p></h6>
					</div>
					</div>
				</div>
		</div>
		<div className="details" ref={props.workRef}>
				<div className="container">
					<h3><center>Work Details</center></h3>
					<br/>
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Employment Type <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.emp_type}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Active Loan <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.active_loan_st}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Total Current EMI <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.tot_cur_emi}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>PAN Number <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.pan_num}</p><Button type="button" onClick={panVerifyHandle}>Verify PAN</Button></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company Name <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.comp_name}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company Address <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.comp_add}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company City <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.comp_city}</p></h6>
					</div>
				  		<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company State <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.comp_state}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company Postal Code <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.comp_postal}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Monthly Salary <p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.monthly_sal}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current Designation<p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.cur_desig}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Total Work Experience<p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.total_work_exp}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current Work Experience<p style={{fontStyle:"italic",color:"black"}}>{props.data.co_applicant_id.cur_job_exp}</p></h6>
					</div>
					</div>
				</div>
		</div>
		<div className="details" ref={props.docRef}>
				<div className="container" style={{position:'center'}}>
					<h3><center>Personal Documents</center></h3>
					<br/>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Selfie</h6>
					<center><ImagePicker center id="file1" formcontrol image={`${props.data.co_applicant_id['file1']}`} view={true}/></center>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>PAN</h6>
					{props.data.co_applicant_id['file2'].split(".").slice(-1)[0]==='pdf' ? <><center><div style={{overflow:"scroll",zIndex:'0'}}><PdfView id="file2" url={`${props.route}${props.data.co_applicant_id["file2"]}`}/></div></center></> : 

					<ImagePicker center id="file2" ft="pdf/image" formcontrol image={`${props.data.co_applicant_id["file2"]}`} view={true}/>}
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>AADHAR Card front side</h6>
					{props.data.co_applicant_id['file3'].split(".").slice(-1)[0]==='pdf' ? <><center><div style={{overflow:"scroll",zIndex:'0'}}><PdfView id="file3" url={`${props.route}${props.data.co_applicant_id["file3"]}`}/></div></center></> : 

					<ImagePicker center id="fil3" ft="pdf/image" formcontrol image={`${props.data.co_applicant_id["file3"]}`} view={true}/>}
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>AADHAR Card back side</h6>
					{props.data.co_applicant_id['file4'].split(".").slice(-1)[0]==='pdf' ? <><center><div style={{overflow:"scroll",zIndex:'0'}}><PdfView id="file4" url={`${props.route}${props.data.co_applicant_id["file4"]}`}/></div></center></> : 

					<ImagePicker center id="file4" ft="pdf/image" formcontrol image={`${props.data.co_applicant_id["file4"]}`} view={true}/>}
				</div>
		</div>
		<div className="details" style={{marginBottom:'2rem'}} ref={props.bankRef}>
				<div className="container" style={{position:'center'}}>
					<h3><center>Bank Statements</center></h3>
					<br/>
					
					{props.files.map((e,idx)=>{
						return (
							<center key={idx}>{e}</center>
						)
					})}
					
				</div>
		</div>
	  	</div>)}</>
	);
};


export default CoAppDetails;