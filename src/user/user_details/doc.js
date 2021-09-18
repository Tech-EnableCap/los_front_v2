import React,{useState,useContext,useEffect} from 'react';
import Input from '../../shared/components/formelements/input';
import {useForm} from '../../shared/hooks/form_hook';
import {useHttp} from '../../shared/hooks/http_hook';
import {VALIDATOR_REQUIRE,VALIDATOR_NUMBER} from '../../shared/util/validator';
import './details.css';
import Card from '../../ui/card';
import Loader from '../../ui/loader.js';
import SweetAlert from 'react-bootstrap-sweetalert';
import ImagePicker from '../../shared/components/formelements/single_image_picker';
import MultiImagePicker from '../../shared/components/formelements/multiple_image_picker';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import Imageblock from './imageblock';
import LoanDetails from './loanDetails';
import {route} from '../../route';
import Status from './progressStatus';
import {Link} from 'react-router-dom'
import PdfView from './pdfView';
import {AuthContext} from '../../shared/context/auth_context';
import Work from './work';

const Doc=(props)=>{
	let res,component;
	let ele1=[];
	let ele2=[];
	const {loading,error,sendReq,clearError}=useHttp();
	const [err,setErr]=useState(false);
	const auth=useContext(AuthContext);
	const [back,setBack]=useState(false);
	const [multiFirst,setMultiFirst]=useState(false);
	const [multiSecond,setMultiSecond]=useState(false);
	const [update,setUpdate]=useState(false);
	const [user,setUser]=useState(null);
	const [paysl,setPaysl]=useState(6);
	const [statem,setStatem]=useState(16);
	const [init,setInit]=useState({});
	const [mod,setMod]=useState([]);
	const [dom,setDom]=useState([]);
	const [pos,setPos]=useState(false);
	const [next,setNext]=useState(false);
	const [ok,setOk]=useState(false);
	const [formState,inputHandler,setFormData]=useForm(
		{
			file1:{
				value:null,
				isValid:false
			},
			file2:{
				value:null,
				isValid:false
			},
			file3:{
				value:null,
				isValid:false
			},
			file4:{
				value:null,
				isValid:false
			},
			file5:{
				value:null,
				isValid:false
			},
			file6:{
				value:null,
				isValid:true
			},
			file7:{
				value:null,
				isValid:true
			},
			file8:{
				value:null,
				isValid:true
			},
			file9:{
				value:null,
				isValid:true
			},
			file10:{
				value:null,
				isValid:true
			},
			file11:{
				value:null,
				isValid:true
			},
			file12:{
				value:null,
				isValid:true
			},
			file13:{
				value:null,
				isValid:true
			},
			file14:{
				value:null,
				isValid:true
			},
			file15:{
				value:null,
				isValid:false
			},
			file16:{
				value:null,
				isValid:true
			},
			file17:{
				value:null,
				isValid:true
			},
			file18:{
				value:null,
				isValid:true
			},
			file19:{
				value:null,
				isValid:true
			},
			file20:{
				value:null,
				isValid:true
			},
			file21:{
				value:null,
				isValid:true
			},
			file22:{
				value:null,
				isValid:true
			},
			file23:{
				value:null,
				isValid:true
			},
			file24:{
				value:null,
				isValid:true
			},
			acc_num:{
				value:null,
				isValid:false
			},
			ifsc_num:{
				value:null,
				isValid:false
			},
		},false
	);

	useEffect(()=>{
		const getUser=async ()=>{
			try{
				const data={
					id:auth.userId
				}
				res=await sendReq(route+"/api/accounts/get_documents_details",
					"POST",
					JSON.stringify(data),
					{
						"Content-Type":"application/json",
						Authorization: "Bearer "+auth.token
					}
				);
				console.log(res);
				console.log(res[0].id_n[0].file5)
				if(props.sbmt && props.sbmt==="sbmt" && parseInt(res[0].flag)>3 || parseInt(res[0].flag)>4){
					console.log(res[0].id_n[0].applicant_ifsc);
					setUser(res[0]);
					setFormData({
						...formState.inputs,
						file1:{
							value:res[0].file1,
							isValid:true
						},
						file2:{
							value:res[0].file2,
							isValid:true
						},
						file3:{
							value:res[0].file3,
							isValid:true
						},
						file4:{
							value:res[0].file4,
							isValid:true
						},
						file5:{
							value:res[0].id_n[0].file5,
							isValid:res[0].id_n[0].file5 ? true : false
						},
						file6:{
							value:res[0].id_n[0].file6,
							isValid:true
						},
						file7:{
							value:res[0].id_n[0].file7,
							isValid:true
						},
						file8:{
							value:res[0].id_n[0].file8,
							isValid:true
						},
						file9:{
							value:res[0].id_n[0].file9,
							isValid:true
						},
						file10:{
							value:res[0].id_n[0].file10,
							isValid:true
						},
						file11:{
							value:res[0].id_n[0].file11,
							isValid:true
						},file12:{
							value:res[0].id_n[0].file12,
							isValid:true
						},file13:{
							value:res[0].id_n[0].file13,
							isValid:true
						},file14:{
							value:res[0].id_n[0].file14,
							isValid:true
						},file15:{
							value:res[0].id_n[0].file15,
							isValid:res[0].id_n[0].file15 ? true : false
						},file16:{
							value:res[0].id_n[0].file16,
							isValid:true
						},file17:{
							value:res[0].id_n[0].file17,
							isValid:true
						},file18:{
							value:res[0].id_n[0].file18,
							isValid:true
						},file19:{
							value:res[0].id_n[0].file19,
							isValid:true
						},file20:{
							value:res[0].id_n[0].file20,
							isValid:true
						},file21:{
							value:res[0].id_n[0].file21,
							isValid:true
						},file22:{
							value:res[0].id_n[0].file22,
							isValid:true
						},file23:{
							value:res[0].id_n[0].file23,
							isValid:true
						},file24:{
							value:res[0].id_n[0].file24,
							isValid:true
						},
						acc_num:{
							value:res[0].id_n[0].applicant_bank_acc,
							isValid:true
						},
						ifsc_num:{
							value:res[0].id_n[0].applicant_ifsc,
							isValid:true
						},
					},true);
				}
				
			}catch(err){
				console.log(err)
			}
		}
		getUser();
	},[sendReq]);

	const upDate=()=>{
		setUpdate(true);
	}

	console.log(formState);

	const viewFirstMulti=()=>{
		if(!multiFirst){
			setMultiFirst(true);
		}else{
			setMultiFirst(false);
			setFormData({
				...formState.inputs,
				file5:{
					value:user.id_n[0].file5,
					isValid:user.id_n[0].file5 ? true : false
				},
				file6:{
					value:user.id_n[0].file6,
					isValid:true
				},
				file7:{
					value:user.id_n[0].file7,
					isValid:true
				},
				file8:{
					value:user.id_n[0].file8,
					isValid:true
				},
				file9:{
					value:user.id_n[0].file9,
					isValid:true
				},
				file10:{
					value:user.id_n[0].file10,
					isValid:true
				},
				file11:{
					value:user.id_n[0].file11,
					isValid:true
				},file12:{
					value:user.id_n[0].file12,
					isValid:true
				},file13:{
					value:user.id_n[0].file13,
					isValid:true
				},file14:{
					value:user.id_n[0].file14,
					isValid:true
				}
			});
		}
	}

	const viewSecondMulti=()=>{
		if(!multiSecond){
			setMultiSecond(true)
		}else{
			setMultiSecond(false);
			setFormData({
				...formState.inputs,
				file15:{
					value:user.id_n[0].file15,
					isValid:user.id_n[0].file15 ? true : false
				},
				file16:{
					value:user.id_n[0].file16,
					isValid:true
				},
				file17:{
					value:user.id_n[0].file17,
					isValid:true
				},
				file18:{
					value:user.id_n[0].file18,
					isValid:true
				},
				file19:{
					value:user.id_n[0].file19,
					isValid:true
				},
				file20:{
					value:user.id_n[0].file20,
					isValid:true
				},
				file21:{
					value:user.id_n[0].file21,
					isValid:true
				},file22:{
					value:user.id_n[0].file22,
					isValid:true
				},file23:{
					value:user.id_n[0].file23,
					isValid:true
				},file24:{
					value:user.id_n[0].file24,
					isValid:true
				}
			});
		}
	}

	const upDateDom=(event)=>{
		console.log(event.target.parentNode)
	}

	const clean=()=>{
		setErr(false);
	}

	const updateHandle=async (event)=>{
		event.preventDefault();
		const formData=new FormData();
		console.log(formState);

		if(!multiFirst && !multiSecond){
			for (let i=0;i<24;i++){
				console.log(formState["inputs"]["file5"].value)
				if(typeof(formState["inputs"]["file"+(i+1)].value)!=='string' && formState["inputs"]["file"+(i+1)].value){
					formData.append("file"+(i+1),formState["inputs"]["file"+(i+1)].value)
				}
			}
		}else if(multiFirst && !multiSecond){
			if(typeof(formState.inputs.file5.value)==='string'){
				setErr("Please select files")
				return;
			}
			for (let i=0;i<4;i++){
				if(typeof(formState["inputs"]["file"+(i+1)].value)!=='string' && formState["inputs"]["file"+(i+1)].value){
					formData.append("file"+(i+1),formState["inputs"]["file"+(i+1)].value)
				}
			}
			for (let i=0;i<10;i++){
				//formData.append("file"+(i+5),formState["inputs"]["file"+(i+5)].value[i]);
				//if(typeof(formState["inputs"]["file"+(i+5)].value)==='string'){
					//formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				//}else{
				//formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				//}
				try{
					formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				}catch(err){
					formData.append("file"+(i+5),new File([], ''));
				}

			}
			for (let i=15;i<25;i++){
				if(typeof(formState["inputs"]["file"+(i)].value)!=='string' && formState["inputs"]["file"+(i)].value){
					formData.append("file"+(i),formState["inputs"]["file"+(i)].value)
				}
			}
		}else if(multiSecond && !multiFirst){
			if(typeof(formState.inputs.file15.value)==='string'){
				setErr("Please select files")
				return;
			}
			for (let i=0;i<4;i++){
				if(typeof(formState["inputs"]["file"+(i+1)].value)!=='string' && formState["inputs"]["file"+(i+1)].value){
					formData.append("file"+(i+1),formState["inputs"]["file"+(i+1)].value)
				}
			}
			for (let i=0;i<10;i++){
				//formData.append("file"+(i+5),formState["inputs"]["file"+(i+5)].value[i]);
				//if(typeof(formState["inputs"]["file"+(i+5)].value)==='string'){
					//formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				//}else{
				//formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				//}
				try{
					formData.append("file"+(i+15),formState["inputs"]["file15"].value[i])
				}catch(err){
					formData.append("file"+(i+15),new File([], ''));
				}

			}
			for (let i=5;i<15;i++){
				if(typeof(formState["inputs"]["file"+(i)].value)!=='string' && formState["inputs"]["file"+(i)].value){
					formData.append("file"+(i),formState["inputs"]["file"+(i)].value)
				}
			}
		}else if(multiFirst && multiSecond){
			console.log('here alert');
			if(typeof(formState.inputs.file5.value)==='string' || typeof(formState.inputs.file15.value)==='string'){
				setErr("Please select files")
				return;
			}
			for (let i=0;i<4;i++){
				if(typeof(formState["inputs"]["file"+(i+1)].value)!=='string' && formState["inputs"]["file"+(i+1)].value){
					formData.append("file"+(i+1),formState["inputs"]["file"+(i+1)].value)
				}
			}
			console.log(formState)
			for (let i=0;i<10;i++){
				//formData.append("file"+(i+5),formState["inputs"]["file"+(i+5)].value[i]);
				//if(typeof(formState["inputs"]["file"+(i+5)].value)==='string'){
					//formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				//}else{
				//formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				//}
				try{
					formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				}catch(err){
					formData.append("file"+(i+5),new File([], ''));
				}

			}
			for (let i=0;i<10;i++){
				//formData.append("file"+(i+5),formState["inputs"]["file"+(i+5)].value[i]);
				//if(typeof(formState["inputs"]["file"+(i+5)].value)==='string'){
					//formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				//}else{
				//formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
				//}
				try{
					formData.append("file"+(i+15),formState["inputs"]["file15"].value[i])
				}catch(err){
					formData.append("file"+(i+15),new File([], ''));
				}

			}
		}

		
		/*formData.append('file1',formState.inputs.file1.value)
		formData.append('file2',formState.inputs.file2.value)
		formData.append('file3',formState.inputs.file3.value)
		formData.append('file4',formState.inputs.file4.value)
		for (let i=0;i<formState.inputs.file5.value.length;i++){
			formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
		}
		for (let i=0;i<formState.inputs.file15.value.length;i++){
			formData.append("file"+(i+15),formState["inputs"]["file15"].value[i])
		}*/

		formData.append('id',auth.userId)
		formData.append('flag','5')
		formData.append('applicant_bank_acc',formState.inputs.acc_num.value)
		formData.append('applicant_ifsc',formState.inputs.ifsc_num.value)
		console.log(formData);
		try{
			res=await sendReq(
				route+"/api/accounts/insert_documents_details",
				"POST",
				formData,
				{
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			if('success' in res){
				setOk(true);
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err);
		}
	}

	console.log(formState);



	const saveHandle=async (event)=>{
		event.preventDefault();
		const formData=new FormData();
		console.log(formState);
		
		formData.append('file1',formState.inputs.file1.value)
		formData.append('file2',formState.inputs.file2.value)
		formData.append('file3',formState.inputs.file3.value)
		formData.append('file4',formState.inputs.file4.value)
		for (let i=0;i<formState.inputs.file5.value.length;i++){
			formData.append("file"+(i+5),formState["inputs"]["file5"].value[i])
		}
		for (let i=0;i<formState.inputs.file15.value.length;i++){
			formData.append("file"+(i+15),formState["inputs"]["file15"].value[i])
		}

		formData.append('id',auth.userId)
		formData.append('flag','5')
		formData.append('applicant_bank_acc',formState.inputs.acc_num.value)
		formData.append('applicant_ifsc',formState.inputs.ifsc_num.value)
		console.log(formData);
		try{
			res=await sendReq(
				route+"/api/accounts/insert_documents_details",
				"POST",
				formData,
				{
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			if('success' in res){
				setOk(true);
			}else{
				setErr(res.error);
			}
		}catch(err){
			console.log(err);
		}
	}

	const backHandle=()=>{
		setBack(true);
	};

	/*
	const addPayslipHandle=()=>{
		setPaysl(paysl+1);
		if(paysl>14){
			alert("max 10 images you can upload for this section");
			return;
		}
		setMod([...mod,<Imageblock id={paysl} inpHandle={inputHandler} show={true}/>]);

	}


	const addStatementHandle=()=>{
		setStatem(statem+1);
		if(statem>24){
			alert("max 10 images you can upload for this section");
			return;
		}
		setDom([...dom,<Imageblock id={statem} inpHandle={inputHandler} show={true}/>]);
	}

	const formHandle=()=>{
		setNext(false);
		window.location.href="http://localhost:3000/dashboard";
	}*/

	if(back){
		if(props.sbmt && props.sbmt==="sbmt"){
			component=<LoanDetails back={true} flag={user.flag}/>
		}
		else{
			component=<Work mode={props.mode} app_id={props.app_id && props.app_id} flag={user ? user.flag : 4}/>
		}
	}else if(loading){
		component=<Loader asOverlay />
	}else if(props.sbmt && props.sbmt==="sbmt" && props.flag>3 || props.flag>4){
		if(user){
			for (let i=5;i<=14;i++){
				if(user["id_n"][0]["file"+i]){
					if(user["id_n"][0]["file"+i].split(".").slice(-1)[0]==='pdf'){
						ele1.push(<><div><PdfView id={`file${i}`} update inputhandler={inputHandler} url={`${user["id_n"][0]["file"+i]}`}/></div><hr/></>)
					}else{
						ele1.push(<><div><ImagePicker ft="pdf/image" formcontrol center id={`file${i}`} image={`${user["id_n"][0]["file"+i]}`} onInput={inputHandler}/></div><hr/></>)
					}
				}
			}
			for (let i=15;i<=24;i++){
				if(user["id_n"][0]["file"+i]){
					if(user["id_n"][0]["file"+i].split(".").slice(-1)[0]==='pdf'){
						ele2.push(<><div><PdfView id={`file${i}`} update inputhandler={inputHandler} url={`${user["id_n"][0]["file"+i]}`}/></div><hr/></>)
					}else{
						ele2.push(<><div><ImagePicker ft="pdf/image" formcontrol center id={`file${i}`} image={`${user["id_n"][0]["file"+i]}`} onInput={inputHandler}/></div><hr/></>)
					}
				}
			}

			component=(
				<React.Fragment>
				<div className="flex-container" style={{marginTop:'3rem',marginBottom:'10rem'}}>
				<div className="flex-item-left" style={{flex:'40%'}}><Status status={props.flag}/></div>)}
				<div className="flex-item-right" style={{flex:'60%'}}>
				<Card className="form" style={{margin:'3rem auto'}}>
				{loading && <Loader asOverlay />}
				<form onSubmit={updateHandle}>
				
				<h3><center>Your Documents</center></h3>
				<hr/>
				<div className="form-control">
					<p><strong>Your Selfie</strong></p>
					<ImagePicker center id="file1" formcontrol image={`${user['file1']}`} onInput={inputHandler}/>
				
					<p><strong>Your PAN card</strong></p>

					{user["file2"] && user['file2'].split(".").slice(-1)[0]==='pdf' ? <><div className="form-control" style={{overflow:'scroll',height:'30rem'}}><PdfView id="file2" update inputhandler={inputHandler} url={`${user["file2"]}`}/></div></> : 

					<ImagePicker center id="file2" ft="pdf/image" formcontrol image={`${user["file2"]}`} onInput={inputHandler}/>}<br/>


				
					<p><strong>Front side of your AADHAR card</strong></p>

					{user["file3"] && user['file3'].split(".").slice(-1)[0]==='pdf' ? <><div className="form-control" style={{overflow:'scroll',height:'30rem'}}><PdfView id="file3" update inputhandler={inputHandler} url={`${user["file3"]}`}/></div></> : 

					<ImagePicker center id="file3" ft="pdf/image" formcontrol image={`${user["file3"]}`} onInput={inputHandler}/>}<br/>
				
					

					<p><strong>Back side of your AADHAR card</strong></p>

					{user["file4"] && user['file4'].split(".").slice(-1)[0]==='pdf' ? <><div className="form-control" style={{overflow:'scroll',height:'30rem'}}><PdfView id="file4" update inputhandler={inputHandler} url={`${user["file4"]}`}/></div></> : 

					<ImagePicker center id="file4" ft="pdf/image" formcontrol image={`${user["file4"]}`} onInput={inputHandler}/>}<br/>
				
				</div>

				<Input element="input" type="number" label="Bank Account Number" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER()]}
				id="acc_num"
				placeholder="Bank Account Number"
				errorText="Please enter Your Valid Bank Account Number"
				onInput={inputHandler}
				initvalue={user['id_n'][0].applicant_bank_acc}
				initvalid={true}/>

				<Input element="input" type="text" label="Bank IFSC Number" 
				validators={[VALIDATOR_REQUIRE()]}
				id="ifsc_num"
				placeholder="Bank IFSC Number"
				errorText="Please enter Your Valid Bank IFSC Number"
				onInput={inputHandler}
				initvalue={user['id_n'][0].applicant_ifsc}
				initvalid={true}/>

				{(props.payslip==="Salaried") ? (<><div className="form-control" style={{overflow:'scroll',height: !multiFirst && '30rem'}}>

					<p><strong>last 3 months payslip</strong></p>
				
					{!multiFirst ? ele1.length>0 && ele1.map((e)=>{
						return e
					}) : <MultiImagePicker center id="file5" ft="pdf/image" onInput={inputHandler}/>}

				</div>
				<Button type="button" onClick={viewFirstMulti}>{!multiFirst ? "Update All Payslip Docs" : "Cancel"}</Button>


				<div className="form-control" style={{overflow:'scroll',height: !multiSecond && '30rem'}}>

					<p><strong>last 3 months salary a/c bank statement</strong></p>

					{!multiSecond ? ele2.length>0 && ele2.map((e)=>{
						return e
					}) : <MultiImagePicker center id="file15" ft="pdf/image" onInput={inputHandler}/>}

				</div>

				<Button type="button" onClick={viewSecondMulti}>{!multiSecond ? "Update All Salary Docs" : "Cancel"}</Button><br/><br/></>) : 

				(<><div className="form-control" style={{overflow:'scroll',height: !multiFirst && '30rem'}}>

					<p><strong>last 2 years ITR</strong></p>

					{!multiFirst ? ele1.length>0 && ele1.map((e)=>{
						return e
					}) : <MultiImagePicker center id="file5" ft="pdf/image" onInput={inputHandler}/>}

				</div>

				<Button type="button" onClick={viewFirstMulti}>{!multiFirst ? "Update All ITR Docs" : "Cancel"}</Button>

				<div className="form-control" style={{overflow:'scroll',height: !multiSecond && '30rem'}}>

					<p><strong>last 3 months bank statement</strong></p>
					
					{!multiSecond ? ele2.length>0 && ele2.map((e)=>{
						return e
					}): <MultiImagePicker center id="file15" ft="pdf/image" onInput={inputHandler}/>}

				</div><Button type="button" onClick={viewSecondMulti}>{!multiSecond ? "Update All Bank Docs" : "Cancel"}</Button></>)}<br/><br/>

				<Button type="button" onClick={backHandle}>Back</Button>
				<Button type="submit" disabled={!formState.isValid}>Update</Button>
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
				  <div className="flex-item-left" style={{flex:'40%'}}><Status status={4}/></div>
				  <div className="flex-item-right" style={{flex:'60%'}}>
				<Card className="form" style={{margin:'3rem auto'}}>
			{loading && <Loader asOverlay />}
			<form onSubmit={saveHandle}>
			
			<h3><center>Documents & Bank Details</center></h3>
			<hr/>

			<div className="form-control">
				<p><strong>Please upload Selfie</strong></p>
				<ImagePicker center id="file1" onInput={inputHandler}/>
			</div>
			<div className="form-control">
				<p><strong>Please select PAN card</strong></p>
				<ImagePicker center ft="pdf/image" id="file2" onInput={inputHandler}/>
			</div>
			<div className="form-control">
				<p><strong>Please select front side of AADHAR card</strong></p>
				<ImagePicker center ft="pdf/image" id="file3" onInput={inputHandler}/>
			</div>
			<div className="form-control">
				<p><strong>Please select back side of AADHAR card</strong></p>
				<ImagePicker center ft="pdf/image" id="file4" onInput={inputHandler}/>
			</div>

			<Input element="input" type="number" label="Bank Account Number" 
			validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER()]}
			id="acc_num"
			placeholder="Bank Account Number"
			errorText="Please enter Your Valid Bank Account Number"
			onInput={inputHandler}
			initvalue={formState.inputs.acc_num.value}
			initvalid={formState.inputs.acc_num.isValid}/>

			<Input element="input" type="text" label="Bank IFSC Number" 
			validators={[VALIDATOR_REQUIRE()]}
			id="ifsc_num"
			placeholder="Bank IFSC Number"
			errorText="Please enter Your Valid Bank IFSC Number"
			onInput={inputHandler}
			initvalue={formState.inputs.ifsc_num.value}
			initvalid={formState.inputs.ifsc_num.isValid}/>

			{(props.payslip==="Salaried") ? (<><div className="form-control">
					<p><strong>Please upload last 3 months payslip</strong></p>
					<MultiImagePicker center ft="pdf/image" id="file5" onInput={inputHandler}/>
				</div><div className="form-control">
					<p><strong>Please upload last 3 months salary a/c bank statement</strong></p>
					<MultiImagePicker center id="file15" ft="pdf/image" onInput={inputHandler}/>
				</div></>) : (<><div className="form-control">
					<p><strong>Please upload last 2 years ITR</strong></p>
					<MultiImagePicker center id="file5" ft="pdf/image" onInput={inputHandler}/>
				</div><div className="form-control">
					<p><strong>Please upload last 3 months bank statement</strong></p>
					<MultiImagePicker center id="file15" ft="pdf/image" onInput={inputHandler}/>
				</div></>)}

			
			<Button onClick={backHandle}>Back</Button>
			<Button type="submit" disabled={!formState.isValid}>Done</Button>
			</form>
			</Card></div>
			</div>
			</React.Fragment>
		);
	}

	return (
		<div>
			{loading && <Loader asOverlay />}
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			{component}
			<SweetAlert success
				show={ok}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={()=>{setOk(false); window.location.reload();}}>OK</Button>
		        }>
				  Your Data is Saved!
			</SweetAlert>
		</div>
	);
};

export default Doc;