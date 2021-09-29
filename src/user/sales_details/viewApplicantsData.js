import React,{useState,useContext,useEffect,useRef} from 'react';
import Input from '../../shared/components/formelements/input';
import {useForm} from '../../shared/hooks/form_hook';
import {useHttp} from '../../shared/hooks/http_hook';
import Card from '../../ui/card';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import PdfView from '../../user/user_details/pdfView';
import ImagePicker from '../../shared/components/formelements/single_image_picker';
import Button from '../../ui/button';
import {route} from '../../route';
import {AuthContext} from '../../shared/context/auth_context';
import CompanyDashboard from './salesDashboard';
import CoAppDetails from './viewCoappData';
import SweetAlert from 'react-bootstrap-sweetalert';
import PanAuth from '../../thirdPartyApiLib/panVer';
import Esign from '../../thirdPartyApiLib/esign';
//import CF_ord from '../../thirdPartyApiLib/cashfree';
import Equifax from '../../thirdPartyApiLib/efx';



const Personal=(props)=>{
	console.log(props);
	let res,element,load=true;
	let ele1=[];
	let ele2=[];
	const [formState,inputHandler,setFormData]=useForm(
		{
			loan_fig:{
				value:'',
				isValid:false
			},
			emi_amt:{
				value:'',
				isValid:false
			},
			month:{
				value:'',
				isValid:false
			},
			emi_date:{
				value:'',
				isValid:false
			},
			g_tenure:{
				value:'',
				isValid:false
			},
			p_fee:{
				value:'',
				isValid:false
			},
			start_date:{
				value:'',
				isValid:false
			},
			b_date:{
				value:'',
				isValid:false
			},
			net_tenure:{
				value:'',
				isValid:false
			},
			end_date:{
				value:'',
				isValid:false
			},
			roi:{
				value:'',
				isValid:false
			},
			words:{
				value:'',
				isValid:false
			},
			num_adv:{
				value:'',
				isValid:false
			},
			com_emi:{
				value:'',
				isValid:false
			},
			adv_emi_rs:{
				value:'',
				isValid:false
			},
			date_subemi:{
				value:'',
				isValid:false
			},
		},false
	);

	const [input,setInput]=useState({
		act:"approve",
		sr:"id"
	})

	const [formStateRemark,formRemarkHandler,setFormRemarkData]=useForm(
		{
			remark:{
				value:'',
				isValid:false
			},
		},
		true);


	const scrollToPersonal=(ref)=>window.scrollTo(0,ref.current.offsetTop);
	const perRef=useRef(null);
   	const personalScroll=()=>scrollToPersonal(perRef);

   	const scrollToLoan=(ref)=>window.scrollTo(0,ref.current.offsetTop);
	const loanRef=useRef(null);
   	const loanScroll=()=>scrollToLoan(loanRef);

   	const scrollToRes=(ref)=>window.scrollTo(0,ref.current.offsetTop);
	const resRef=useRef(null);
   	const resScroll=()=>scrollToRes(resRef);

   	const scrollToWork=(ref)=>window.scrollTo(0,ref.current.offsetTop);
	const workRef=useRef(null);
   	const workScroll=()=>scrollToWork(workRef);

   	const scrollToDoc=(ref)=>window.scrollTo(0,ref.current.offsetTop);
	const docRef=useRef(null);
   	const docScroll=()=>scrollToDoc(docRef);

   	const scrollToBank=(ref)=>window.scrollTo(0,ref.current.offsetTop);
	const bankRef=useRef(null);
   	const bankScroll=()=>scrollToBank(bankRef);

   	const scrollToAdd=(ref)=>window.scrollTo(0,ref.current.offsetTop);
	const addRef=useRef(null);
   	const addScroll=()=>{
   		if(!coAppView){
   			scrollToAdd(addRef);
   		}
   	}

	const [gender,setGender]=useState("Male");
	const [marital,setMarital]=useState("Unmarried");
	const auth=useContext(AuthContext);
	const [err,setErr]=useState(false);
	const [next,setNext]=useState(false);
	const [user,setUser]=useState(null);
	const [modal,setModal]=useState(false);
	const [go,setGo]=useState(null);
	const [coAppView,setCoAppView]=useState(null);
	const {loading,error,sendReq,clearError}=useHttp();
	const [loader,setLoader]=useState(null);
	const [fsave,setFsave]=useState(false);
	const [initAdv,setInitadv]=useState(null);
	const [esignSt,setesignSt]=useState(null);

	const actionHandler=(event) => {
        setInput({...input,act:event.target.value});
    }

	const clean=()=>{
		setErr(false);
	}

	const goToDashBoard=()=>{
		setGo(true);
	}


	const panVerifyHandle=()=>{
		//console.log(props.user.applicant_id.pan_num,props.user.applicant_id.dob.split("-").reverse().join("/"),props.user.applicant_id.first_name+' '+props.user.applicant_id.last_name);
		setLoader(true);
		PanAuth.sendData(props.user.applicant_id.pan_num,props.user.applicant_id.first_name+' '+props.user.applicant_id.last_name,props.user.applicant_id.dob.split("-").reverse().join("/")).then((res)=>{
			console.log(res);
			if(res.status==='Active' && res.nameMatch && res.dobMatch){
				console.log(res);
				setLoader(false);
			}else{
				setLoader(false);
			}
		}).catch((err)=>{
			alert('document not verified');
			setLoader(false);
		})
	}

	/*const cashFreeOder=()=>{
		setLoader(true);
		const data={
			orderId:"ORDPRC"+props.user.id,
			orderAmount:formState.inputs.adv_emi_rs.value ? formState.inputs.adv_emi_rs.value : props.user.adv_emi_rs,
			customerName:props.user.applicant_id.first_name+' '+props.user.applicant_id.last_name,
			customerPhone:props.user.applicant_id.phone,
			returnUrl:"https://enablecap.in"
		}
		CF_ord.makeOver(JSON.stringify(data)).then((res)=>{
			setLoader(false);
			console.log(res);
		}).catch((err)=>{
			setLoader(false);
			console.log(err);
		})
	}*/


	const init_process=async ()=>{

		const data={
    		id:[props.user.id],
    		action:input.act,
    		type:props.type,
    		appId:"602662eacc35eb828286e8ac366206",
    		secretKey:"7afbc8ec2dca695d38f3a7f27471fb88721a610c",
    		orderId:"ORDPRC"+props.user.id,
    		orderAmount:formState.inputs.adv_emi_rs.value ? formState.inputs.adv_emi_rs.value : props.user.adv_emi_rs,
			customerName:props.user.applicant_id.first_name+' '+props.user.applicant_id.last_name,
			customerEmail:props.user.applicant_id.email,
			customerPhone:props.user.applicant_id.phone,
			returnUrl:"https://enablecap.in"
    	}
    	console.log(data);
    	try{
    		const res=await sendReq(route+"/api/accounts/sales_action",
	    		"POST",
	    		JSON.stringify(data),
	    		{
	    			"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
	    		}
	    	);
	    	console.log(res);
	    	if('success' in res){
	    		setFsave(true);
	    		setInitadv(true);
	    	}else{
	    		alert(res.error);
	    	}
    	}catch(err){
    		console.log(err);
    	}
	}

	const init_enach=async ()=>{
		const data={
			id:[props.user.id],
    		action:input.act,
    		type:props.type,
			planId:"PLN"+props.user.id,
            planName:"PLN"+props.user.id+"_"+props.user.applicant_id.first_name+' '+props.user.applicant_id.last_name,
            type2:"ON_DEMAND",
            maxAmount:formState.inputs.adv_emi_rs.value ? formState.inputs.adv_emi_rs.value : props.user.adv_emi_rs,
            "X-Client-Id":"602662eacc35eb828286e8ac366206",
    		"X-Client-Secret":"7afbc8ec2dca695d38f3a7f27471fb88721a610c",
    		"content-type":"application/json",
    		cf_pln:"https://test.cashfree.com/api/v2/subscription-plans",
    		cf_sub:"https://test.cashfree.com/api/v2/subscriptions",
    		customerName:props.user.applicant_id.first_name+' '+props.user.applicant_id.last_name,
			customerEmail:props.user.applicant_id.email,
			customerPhone:props.user.applicant_id.phone,
			emi_end_date:formState.inputs.end_date.value ? formState.inputs.end_date.value : props.user.end_date,
			returnUrl:"https://enablecap.in"
		}
		console.log(data);
    	try{
    		const res=await sendReq(route+"/api/accounts/sales_action",
	    		"POST",
	    		JSON.stringify(data),
	    		{
	    			"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
	    		}
	    	);
	    	console.log(res);
	    	if('success' in res){
	    		setFsave(true)
	    	}else{
	    		alert(res.error);
	    	}
    	}catch(err){
    		console.log(err);
    	}
	}

	const generic_action=async ()=>{
		const data={
			id:[props.user.id],
    		action:input.act,
    		type:props.type,
		}
		console.log(data);
    	try{
    		const res=await sendReq(route+"/api/accounts/sales_action",
	    		"POST",
	    		JSON.stringify(data),
	    		{
	    			"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
	    		}
	    	);
	    	console.log(res);
	    	if('success' in res){
	    		setFsave(true)
	    	}else{
	    		alert(res.error);
	    	}
    	}catch(err){
    		console.log(err);
    	}
	}

	/*const gen_efx=()=>{
		setLoader(true);
		const data={
			fname:props.user.applicant_id.first_name+' '+props.user.applicant_id.last_name,
			dob:props.user.applicant_id.dob.split("-").reverse().join("/"),
			addr1:props.user.applicant_id.cur_res_add,
			state:props.user.applicant_id.cur_state,
			postal:props.user.applicant_id.cur_postal,
			mob:props.user.applicant_id.phone,
			pan:props.user.applicant_id.pan_num
		}
		Equifax.getEfx(JSON.stringify(data)).then((res)=>{
			setLoader(false);
			console.log(res);
		}).catch((err)=>{
			console.log(err);
			setLoader(false);
		});
	}*/

	const gen_efx=async ()=>{
		alert('here');
		const data={
			fname:props.user.applicant_id.first_name+' '+props.user.applicant_id.last_name,
			mname:'',
			lname:'',
			dob:props.user.applicant_id.dob.split("-").reverse().join("/"),
			addr1:props.user.applicant_id.cur_res_add,
			state:props.user.applicant_id.cur_state,
			postal:props.user.applicant_id.cur_postal,
			mob:props.user.applicant_id.phone,
			pan:"JMWPS0922L"
		};
		try{
    		const res=await sendReq(route+"/api/accounts/efx",
	    		"POST",
	    		JSON.stringify(data),
	    		{
	    			"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
	    		}
	    	);
	    	console.log(res);
    	}catch(err){
    		console.log(err);
    	}

	}

	const date_convert_guaranter=(today)=>{
		let td=today;
		let dd=today.getDate();
		let mm=today.getMonth()+1;
		let yyyy=today.getFullYear();
		if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        return (dd+'/'+mm+'/'+yyyy);
	}

	const date_convert=(date)=>{
		let yyyy=date.split("-")[0]
		let mm=date.split("-")[1]
		let dd=date.split("-")[2]
		return (dd+'/'+mm+'/'+yyyy);
	}


	const gen_esign=async ()=>{
		setLoader(true);
		let isCoapp={};
		let dgClient="AI7LTQGEP7TVPG8O15J4EN8E2NK3J8GF";
		let dgSec="HXBG4ENM2Z1YBXIK99MYFQIVZ42JK8MT";
		const data={
			"appPhone":props.user.applicant_id.phone,
			"coAppPhone":props.user.coapp_required==="true" ? props.user.co_applicant_id.phone : '',
			"fileName":"ES_"+props.user.id,
			"appEmail":props.user.applicant_id.email,
			"coAppEmail":props.user.coapp_required==="true" ? props.user.co_applicant_id.email : ''
		}
		let formData={};
		formData['processing_fee']=formState.inputs.p_fee.value ? formState.inputs.p_fee.value : props.user.p_fee;
		formData['advance_emi_amount']=formState.inputs.adv_emi_rs.value ? formState.inputs.adv_emi_rs.value : props.user.adv_emi_rs;
		formData['course_name']=props.user.course_name;
		formData['institute_name']=props.user.inst_name;
		formData['borrower_name']=props.user.applicant_id.first_name+" "+props.user.applicant_id.last_name;
		formData['date_of_subsequent_emis']=formState.inputs.date_subemi.value ? formState.inputs.date_subemi.value : props.user.date_subemi;
		formData['application_id']=props.user.id;
		formData['loanee_address']=props.user.applicant_id.per_res_add;
		formData['loan_id']=props.user.id;
		formData['loan_amount']=formState.inputs.loan_fig.value ? formState.inputs.loan_fig.value : props.user.loan_fig;
		formData['loan_in_words']=formState.inputs.words.value ? formState.inputs.words.value : props.user.words;
		formData['place_guarantor']=props.user.coapp_required==="true" ? props.user.co_applicant_id.cur_city : '';
		formData['date_guarantor']=date_convert_guaranter(new Date());

		formData['net_tenure']=formState.inputs.net_tenure.value ? formState.inputs.net_tenure.value : props.user.net_tenure;
		formData['no_of_advance_emis']=formState.inputs.num_adv.value ? formState.inputs.num_adv.value : props.user.num_adv;
		formData['amount_of_emi']=formState.inputs.emi_amt.value ? formState.inputs.emi_amt.value : props.user.emi_amt;
		formData['loan_in_fig']=formState.inputs.loan_fig.value ? formState.inputs.loan_fig.value : props.user.loan_fig;
		formData['rate_of_interest']=formState.inputs.roi.value ? formState.inputs.roi.value : props.user.roi;

		//const date=new Date();
		//const monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];

		//formData['month_name']=monthNames[date.getMonth()];
		formData['month_name']=formState.inputs.month.value ? formState.inputs.month.value : props.user.month;
		formData['emi_end_date']=formState.inputs.end_date.value ? formState.inputs.end_date.value : props.user.end_date;
		formData['loanee_name']=props.user.applicant_id.first_name+" "+props.user.applicant_id.last_name;
		formData['place_borrower']=props.user.applicant_id.cur_city;
		//formData['date_borrower']=date_convert(new Date());
		formData['date_borrower']=formState.inputs.b_date.value ? date_convert(formState.inputs.b_date.value) : date_convert(props.user.b_date)

		formData['date_of_emi']=formState.inputs.emi_date.value ? formState.inputs.emi_date.value : props.user.date;
		formData['commencement_of_advance_emi']=formState.inputs.com_emi.value ? formState.inputs.com_emi.value : props.user.com_emi;

		formData['acc_number']=props.user.applicant_bank_acc;
		formData['guarantor_name']=props.user.coapp_required==="true" ? props.user.co_applicant_id.first_name+" "+props.user.co_applicant_id.last_name : '';
		formData['gross_tenure']=formState.inputs.g_tenure.value ? formState.inputs.g_tenure.value : props.user.g_tenure;
		formData['ifsc_code']=props.user.applicant_ifsc;
		formData['emi_start_date']=formState.inputs.start_date.value ? formState.inputs.start_date.value : props.user.start_date;


		/*if(props.user.coapp_required==="true"){
			isCoapp=true;
		}else if(props.user.coapp_required==="false"){
			isCoapp=false;
		}*/

		isCoapp['coapp']=props.user.coapp_required;
		let key = dgClient + ':' + dgSec;
		console.log(key);

		let header = {
            Authorization : 'Basic ' + Buffer.from(key).toString('base64'),
            'Content-Type' : 'application/json'
        }

        const req_data={
        	json:{
        		isCoapp,
        		data,
        		formData,
        		header
        	}

        }

		/*Esign.sendRequest(data,formData,isCoapp).then((res)=>{
			console.log(res);
			setLoader(false);
		}).catch((err)=>{
			console.log(err);
			setLoader(false);
		});*/

		try{
    		const res=await sendReq(route+"/api/accounts/esign",
	    		"POST",
	    		JSON.stringify(req_data),
	    		{
	    			"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
	    		}
	    	);
	    	console.log(res);
	    	if('success' in res){
	    		alert("Esign initiated");
	    	}else{
	    		alert("Something went wrong");
	    	}
	    	setLoader(false);
    	}catch(err){
    		console.log(err);
    		setLoader(false);
    	}

	}


	const handleAction=()=>{
		if(input.act==="init_process"){
			if(formState.inputs.p_fee.value==='' || formState.inputs.adv_emi_rs.value==='' || formState.inputs.p_fee.value==='0' || formState.inputs.adv_emi_rs.value==='0'){
				alert('You must enter processing fee and advance EMI');
				return ;
			}
			init_process();
		}else if(input.act==="efx"){
			gen_efx();
		}else if(input.act==="e_sign"){
			gen_esign();
		}else if(input.act==="e_nach"){
			init_enach();
		}else{
			generic_action();
		}
    	
    }

    const viewCoapp=()=>{
    	if(!coAppView && (!props.user.co_applicant_id || parseInt(props.user.co_applicant_id.flag)<6)){
    		alert('No Coapplicant');
    		return;
    	}
    	setCoAppView(prev=>!prev);
    }

    const addRemark=async ()=>{
    	const data={
    		loan_id:props.user.id,
    		sales_remarks:props.type==='sales' ? formStateRemark.inputs.remark.value : '',
			credit_remarks:props.type==='credit' ? formStateRemark.inputs.remark.value : ''
    	}
    	try{
    		const res=await sendReq(route+"/api/accounts/insert_additional",
				'PATCH',
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			if('success' in res){
				setFsave(true);
			}else{
				setErr(res.error);
			}
    	}catch(err){
    		console.log(err);
    	}
    }

	const saveHandler=async ()=>{
		try{
			const data={
				loan_id:props.user.id,
				loan_fig:formState.inputs.loan_fig.value,
				emi_amt:formState.inputs.emi_amt.value,
				month:formState.inputs.month.value,
				emi_date:formState.inputs.emi_date.value,
				g_tenure:formState.inputs.g_tenure.value,
				p_fee:formState.inputs.p_fee.value,
				start_date:formState.inputs.start_date.value,
				b_date:formState.inputs.b_date.value,
				net_tenure:formState.inputs.net_tenure.value,
				end_date:formState.inputs.end_date.value,
				roi:formState.inputs.roi.value,
				words:formState.inputs.words.value,
				num_adv:formState.inputs.num_adv.value,
				com_emi:formState.inputs.com_emi.value,
				adv_emi_rs:formState.inputs.adv_emi_rs.value,
				date_subemi:formState.inputs.date_subemi.value,
				file_name:"ES_"+props.user.id+".pdf"
			}
			const res=await sendReq(route+"/api/accounts/insert_additional",
				'PATCH',
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			if('success' in res){
				setFsave(true);
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err)
		}
	}


	/*useEffect(()=>{
		const getUser=async ()=>{
			try{
				const data={
					email:props.email
				}
				res=await sendReq(route+"/api/accounts/getpersonal",
					"POST",
					JSON.stringify(data),
					{
						"Content-Type":"application/json",
						Authorization: "Bearer "+auth.token
					}
				);
				console.log(res);
				setUser(res[0]);
				setFormData({
					...formState.inputs,
					date:{
						value:res[0].dob,
						valid:true
					}
				},true);
				setGender(res[0].gender);
				setMarital(res[0].marital);
			}catch(err){
				setErr(err);
			}	
		}
		getUser();
	},[sendReq,setFormData]); */

	const goToNext=()=>{
		setNext(true);
	}

	if(coAppView){
		for (let i=25;i<=44;i++){
			if(props.user["file"+i]){
				if(props.user["file"+i].split(".").slice(-1)[0]==='pdf'){
					ele1.push(<><div key={i} style={{overflow:"hidden"}}><PdfView id={`file${i}`} url={`${props.user["file"+i]}`}/></div><hr/></>)
				}else{
					ele1.push(<><div key={i}><ImagePicker ft="pdf/image" center id={`file${i}`} view={true} image={`${props.user["file"+i]}`}/></div><hr/></>)
				}
			}
		}
	}else{
		for (let i=5;i<=24;i++){
			if(props.user["file"+i]){
				if(props.user["file"+i].split(".").slice(-1)[0]==='pdf'){
					ele1.push(<><div key={i} style={{overflow:"scroll",zIndex:'0'}}><PdfView id={`file${i}`} url={`${props.user["file"+i]}`}/></div><hr/></>)
				}else{
					ele1.push(<><div key={i}><ImagePicker ft="pdf/image" center id={`file${i}`} view={true} image={`${props.user["file"+i]}`}/></div><hr/></>)
				}
			}
		}
	}


	return (
		<>{go ? <CompanyDashboard type={props.type}/> : loader ?  (<Loader asOverlay />) : (<div className="flex-container"><div className="details" style={{position:'fixed',top:'9.5rem',width:'100%',height:'3.7rem',textAlign:'center',backGround:'transparent',boxShadow:'None',zIndex:'1'}}>
		        	
		        		<div className="container">
		        			<Button type="button" style={{marginTop:'.5rem',background:!coAppView && 'black',marginLeft:'3rem'}} disabled={!coAppView} onClick={viewCoapp}>Applicant</Button>
		        			<Button type="button" style={{background:coAppView && 'black'}} disabled={coAppView} onClick={viewCoapp}>CoApplicant</Button>
		        		
		        	</div>
		        </div>
		  		<div className="flex-item-left"><div className="sidebar">
		  		<div className="sdHeader" style={{fontSize:'1rem'}}>
                 <div className="arrow" style={{cursor:"pointer"}} onClick={goToDashBoard}><i className="fa fa-angle-double-right"></i></div>
                </div>         
	            <div className="sdmnu">
	                <div className="menuItems" onClick={personalScroll}><p><i className="fa fa-user"></i> <label className="sdLabel">Applicants Details</label></p></div>
	                <div className="menuItems" onClick={loanScroll}><p><i className="fa fa-coins"></i> <label className="sdLabel">Loan Details</label></p></div>
	                <div className="menuItems" onClick={resScroll}><p><i className="fa fa-house-user"></i> <label className="sdLabel">Residence Details</label></p></div>
	                <div className="menuItems" onClick={workScroll}><p><i className="fa fa-briefcase"></i> <label className="sdLabel">Work Details</label></p></div>
	                <div className="menuItems" onClick={docScroll}><p><i className="fa fa-user-circle"></i> <label className="sdLabel">Personal Documents</label></p></div>
	                <div className="menuItems" onClick={bankScroll}><p><i className="fa fa-university"></i> <label className="sdLabel">Bank Statements</label></p></div>
	                {props.type==="credit" && <div className="menuItems" onClick={addScroll}><p><i className="fa fa-plus-circle"></i> <label className="sdLabel">Additional Details</label></p></div>}
	               	<div className="menuItems" onClick={()=>setModal(true)}><p><i className="fa fa-plus-circle"></i> <label className="sdLabel">take Action</label></p></div>
	                 
	            </div>
	        	</div>
	        	</div>

	        	<div className="flex-item-right" style={{marginTop:'1rem'}}>
	        		<div className="main">

	        			{!coAppView ? <div className="details" style={{top:'0rem',maxWidth:'100rem',background: 'white',padding:'1rem'}}>
		<h3><center>Applicants Details</center></h3><br/>
		<div className="details" ref={perRef}>
				<div className="container">
					<h3><center>Personal Details</center></h3>
					<br/>
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan ID <p style={{fontStyle:"italic",color:"black"}}>{props.user.id}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Email <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.email}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Gender <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.gender}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Status <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.marital}</p></h6>
					</div>
				  		<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Name <p style={{fontStyle:"italic",color:"black"}}>{`${props.user.applicant_id.first_name} ${props.user.applicant_id.last_name}`}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Phone <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.phone}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>DOB <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.dob}</p></h6>

					</div>
					</div>
				
				</div>
		</div>
		<div className="details" ref={loanRef}>
				<div className="container">
					<h3><center>Loan Details</center></h3>
					<br/>
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Name <p style={{fontStyle:"italic",color:"black"}}>{props.user.inst_name}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Type <p style={{fontStyle:"italic",color:"black"}}>{props.user.inst_type}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Institute Location <p style={{fontStyle:"italic",color:"black"}}>{props.user.inst_location}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Class Of Student <p style={{fontStyle:"italic",color:"black"}}>{props.user.class_of_student}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan Tenure <p style={{fontStyle:"italic",color:"black"}}>{props.user.loan_tenure}</p></h6>
					</div>
				  		<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Name <p style={{fontStyle:"italic",color:"black"}}>{props.user.course_name}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Tenure <p style={{fontStyle:"italic",color:"black"}}>{props.user.course_tenure}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Course Fee <p style={{fontStyle:"italic",color:"black"}}>{props.user.course_fee}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Loan Requested <p style={{fontStyle:"italic",color:"black"}}>{props.user.financing_required}</p></h6>
					</div>
					</div>
				
				</div>
		</div>
		<div className="details" ref={resRef}>
				<div className="container">
					<h3><center>Residence Details</center></h3>
					<br/>
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current Address <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.cur_res_add}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current State <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.cur_state}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Residence Type <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.cur_res}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Owned By <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.owned_by}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Permanent Address <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.per_res_add}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Permanent State <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.per_state}</p></h6>
					</div>
				  		<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current City <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.cur_city}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current Postal <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.cur_postal}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Rented By <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.rented_by}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Monthly Rent<p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.monthly_rent}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Permanent City<p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.per_city}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Permanent Postal<p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.per_postal}</p></h6>
					</div>
					</div>
				</div>
		</div>
		<div className="details" ref={workRef}>
				<div className="container">
					<h3><center>Work Details</center></h3>
					<br/>
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Employment Type <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.emp_type}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Active Loan <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.active_loan_st}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Total Current EMI <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.tot_cur_emi}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>PAN Number <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.pan_num}</p><Button type="button" onClick={panVerifyHandle}>Verify PAN</Button></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company Name <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.comp_name}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company Address <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.comp_add}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company City <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.comp_city}</p></h6>
					</div>
				  		<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company State <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.comp_state}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Company Postal Code <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.comp_postal}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Monthly Salary <p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.monthly_sal}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current Designation<p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.cur_desig}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Total Work Experience<p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.total_work_exp}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Current Work Experience<p style={{fontStyle:"italic",color:"black"}}>{props.user.applicant_id.cur_job_exp}</p></h6>
					</div>
					</div>
				</div>
		</div>
		<div className="details" ref={docRef}>
				<div className="container" style={{position:'center'}}>
					<h3><center>Personal Documents</center></h3>
					<br/>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Selfie</h6>
					<center><ImagePicker center id="file1" formcontrol image={`${props.user.applicant_id['file1']}`} view={true}/></center>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>PAN</h6>
					{props.user.applicant_id['file2'].split(".").slice(-1)[0]==='pdf' ? <><center><div style={{overflow:"scroll",zIndex:'0'}}><PdfView id="file2" url={`${route}${props.user.applicant_id["file2"]}`}/></div></center></> : 

					<ImagePicker center id="file2" ft="pdf/image" formcontrol image={`${props.user.applicant_id["file2"]}`} view={true}/>}
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>AADHAR Card front side</h6>
					{props.user.applicant_id['file3'].split(".").slice(-1)[0]==='pdf' ? <><center><div style={{overflow:"scroll",zIndex:'0'}}><PdfView id="file3" url={`${route}${props.user.applicant_id["file3"]}`}/></div></center></> : 

					<ImagePicker center id="fil3" ft="pdf/image" formcontrol image={`${props.user.applicant_id["file3"]}`} view={true}/>}
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>AADHAR Card back side</h6>
					{props.user.applicant_id['file4'].split(".").slice(-1)[0]==='pdf' ? <><center><div style={{overflow:"scroll",zIndex:'0'}}><PdfView id="file4" url={`${route}${props.user.applicant_id["file4"]}`}/></div></center></> : 

					<ImagePicker center id="file4" ft="pdf/image" formcontrol image={`${props.user.applicant_id["file4"]}`} view={true}/>}
				</div>
		</div>
		<div className="details" style={{marginBottom:'2rem'}} ref={bankRef}>
				<div className="container" style={{position:'center'}}>
					<h3><center>Bank Statements</center></h3>
					<br/>
					
					{ele1.map((e)=>{
						return (
							<center>{e}</center>
						)
					})}
					
				</div>
		</div>
		{props.type==='admin' && (<div className="details">
				<div className="container">
					<h3><center>Sales and Credit Status</center></h3>
					<br/>
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Sales Status <p style={{fontStyle:"italic",color:"black"}}>{props.user.sales_approve}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Sales Remarks <p style={{fontStyle:"italic",color:"black"}}>{props.user.sales_remarks}</p></h6>
					</div>
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Credit Status <p style={{fontStyle:"italic",color:"black"}}>{props.user.credit_approve}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Credit Remarks <p style={{fontStyle:"italic",color:"black"}}>{props.user.credit_remarks}</p></h6>
					</div>
					</div>
				</div>
		</div>)}
	  	</div> : <CoAppDetails files={ele1} data={props.user} perRef={perRef} loanRef={loanRef} resRef={resRef} workRef={workRef} docRef={docRef} bankRef={bankRef} route={route}/>}

	  
			{!coAppView && props.type==="credit" ? (<div className="details" style={{padding:'1rem',marginBottom:'5rem'}}>
				<h3><center>Status</center></h3><br/>
				<div className="container">
					<div className="details">
					<div className="container">
					<div className="flex-container">
				  	<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Processing Fee & Adv. EMI Status <p style={{fontStyle:"italic",color:"black"}}>{initAdv ? "Requested" : props.user.Process_status}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>Processing Fee & Adv. EMI OrderId <p style={{fontStyle:"italic",color:"black"}}>{`ORDPRC${props.user.id}`}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>SalesOp Status <p style={{fontStyle:"italic",color:"black"}}>{props.user.sales_approve}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>CreditOp Status <p style={{fontStyle:"italic",color:"black"}}>{props.user.credit_approve}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>SalesOp Remarks <p style={{fontStyle:"italic",color:"black"}}>{props.user.sales_remarks}</p></h6>
					</div>
				  		<div className="flex-item-left_details" style={{flex:'50%'}}>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>E-NACH Plan ID <p style={{fontStyle:"italic",color:"black"}}>{`PLN${props.user.id}`}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>E-NACH Subscription Ref. ID <p style={{fontStyle:"italic",color:"black"}}>{props.user.subId}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>E-NACH Status <p style={{fontStyle:"italic",color:"black"}}>{props.user.enach_status}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>E-Sign ID <p style={{fontStyle:"italic",color:"black"}}>{props.user.esignId}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>E-Sign File Name<p style={{fontStyle:"italic",color:"black"}}>{`ES_${props.user.id}.pdf`}</p></h6>
					<h6 style={{padding:'1rem',fontWeight:'700',color:'rgb(88 88 88)'}}>E-Sign Status<p style={{fontStyle:"italic",color:"black"}}>{props.user.esign_status}</p></h6>
					</div>
					</div>
					</div>
				</div>
				<h3><center>Additional Details</center></h3><br/>
					 {loading ? <Loader asOverlay style={{position:'relative',background:'transparent'}} /> : (<div className="flex-container" ref={addRef}>
							<div className="flex-item-left_details" style={{flex:'25%',marginRight:'1rem'}}>
	  							
			  							<Input
							              type="text"
							              id="loan_fig"
							              element="input"
							              label="Loan in figure"
							              placeholder="Loan in figure"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.loan_fig.value ? formState.inputs.loan_fig.value : props.user.loan_fig}
							            />

										<Input
							              type="number"
							              id="emi_amt"
							              element="input"
							              label="Emi Amount"
							              placeholder="Emi amount"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.emi_amt.value ? formState.inputs.emi_amt.value : props.user.emi_amt}
							            />

								      	<Input
							              type="text"
							              id="month"
							              element="input"
							              label="Month Name"
							              placeholder="Name of the month"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.month.value ? formState.inputs.month.value : props.user.month}
							            />

							            <Input
							              type="date"
							              id="emi_date"
							              element="input"
							              label="EMI Date"
							              placeholder="emi date"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.emi_date.value ? formState.inputs.emi_date.value : props.user.date}
							            />

							            <Input
							              type="text"
							              id="file_name"
							              element="input"
							              label="Esign File Name (Auto generated)"
							              placeholder="File Name"
							              validators={[]}
							              disable={true}
							              errorText=" "
							              onInput={inputHandler}
							              initvalue={`ES_${props.user.id}.pdf`}
							            />

			  						
			  				</div>
			  				<div className="flex-item-left_details" style={{flex:'25%',marginRight:'1rem'}}>
	  							
			  							<Input
							              type="number"
							              id="g_tenure"
							              element="input"
							              label="Gross Tenure"
							              placeholder="Gross tenure"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.g_tenure.value ? formState.inputs.g_tenure.value : props.user.g_tenure}
							            />

										<Input
							              type="number"
							              id="p_fee"
							              element="input"
							              label="Processing Fees (Rs.)"
							              placeholder="Processing fees"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.p_fee.value ? formState.inputs.p_fee.value : props.user.p_fee}
							            />

								      	<Input
							              type="date"
							              id="start_date"
							              element="input"
							              label="EMI Start Date"
							              placeholder="EMI start date"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.start_date.value ? formState.inputs.start_date.value : props.user.start_date}
							            />

							            <Input
							              type="date"
							              id="b_date"
							              element="input"
							              label="Date Borrower"
							              placeholder="Date borrower"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.b_date.value ? formState.inputs.b_date.value : props.user.b_date}
							            />

			  							
			  						
			  				</div>
			  				<div className="flex-item-left_details" style={{flex:'25%',marginRight:'1rem'}}>
	  							
			  							<Input
							              type="number"
							              id="net_tenure"
							              element="input"
							              label="Net Tenure"
							              placeholder="Net tenure"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.net_tenure.value ? formState.inputs.net_tenure.value : props.user.net_tenure}
							            />

										<Input
							              type="date"
							              id="end_date"
							              element="input"
							              label="EMI End Date"
							              placeholder="EMI start date"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.end_date.value ? formState.inputs.end_date.value : props.user.end_date}
							            />

								      	<Input
							              type="number"
							              id="roi"
							              element="input"
							              label="Rate of Interest"
							              placeholder="roi"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.roi.value ? formState.inputs.roi.value : props.user.roi}
							            />

							            <Input
							              type="text"
							              id="words"
							              element="input"
							              label="Loan in Words"
							              placeholder="Loan in words"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.words.value ? formState.inputs.words.value : props.user.words}
							            />
			  						
			  				</div>
			  				<div className="flex-item-left_details" style={{flex:'25%'}}>
	  							
			  							<Input
							              type="number"
							              id="num_adv"
							              element="input"
							              label="Number of Advance EMI"
							              placeholder="Number of advance EMI"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.num_adv.value ? formState.inputs.num_adv.value : props.user.num_adv}
							            />

										<Input
							              type="text"
							              id="com_emi"
							              element="input"
							              label="Commencemet of Advance EMI"
							              placeholder="Commencemet of advance EMI"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.com_emi.value ? formState.inputs.com_emi.value : props.user.com_emi}
							            />

								      	<Input
							              type="number"
							              id="adv_emi_rs"
							              element="input"
							              label="Advance EMI (Rs.)"
							              placeholder="Advance EMI"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.adv_emi_rs.value ? formState.inputs.adv_emi_rs.value : props.user.adv_emi_rs}
							            />

							            <Input
							              type="date"
							              id="date_subemi"
							              element="input"
							              label="Date of Subsequent EMIs"
							              placeholder="Date of subsequent EMIs"
							              validators={[]}
							              errorText="Please enter valid data"
							              onInput={inputHandler}
							              initvalue={formState.inputs.date_subemi.value ? formState.inputs.date_subemi.value : props.user.date_subemi}
							            />


			  							
			  							<Button type="button" onClick={saveHandler}>Save</Button>
			  							
			  						
			  				</div>
					</div>)}
				</div>
			</div>) : null}
		</div>
		</div>
</div>)}
			<SweetAlert
			title="Take Action"
			show={modal}
	        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
	         customButtons={
	          <Button onClick={()=>setModal(false)}>Close</Button>
	        }>
	        {loading ? <Loader asOverlay style={{position:'relative',background:'transparent'}} /> : (<div>{props.type!=="admin" && (<><div><Input
              type="text"
              id="remark"
              element="textarea"
              label="Add Remarks"
              validators={[]}
              errorText="Please enter valid data"
              onInput={formRemarkHandler}
              initvalue={formStateRemark.inputs.remark.value ?  formStateRemark.inputs.remark.value : props.type==='sales' ? props.user.sales_remarks : props.user.credit_remarks}
            />
            <Button onClick={addRemark}>Add Remark</Button></div><br/></>)}
        
			 <select name="action" id="act" style={{height:'2.05rem'}} value={input.act} onChange={actionHandler}>
                <option value="approve">Approve</option>
					<option value="reject">Reject</option>
					{props.type==="sales" && <option value="coapp">Co-applicant Required</option>}
                	{props.type==="credit" && (<><option value="efx">Generate Equifax</option>
                	<option value="vkyc">Init VKYC</option>
                	<option value="e_sign">Init E-Sign</option>
                	<option value="e_nach">Init E-NACH</option>
                	<option value="init_process">Init Process Fee & Adv. EMI</option></>)}
            </select>
  
            <Button onClick={handleAction} style={{marginLeft:'0rem'}}>Go</Button></div>
            )}
			</SweetAlert>


			<SweetAlert success
				show={fsave}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={()=>setFsave(false)}>OK</Button>
		        }>
				  Done
			</SweetAlert>
</>
		
	);
};


export default Personal;