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
			file25:{
				value:null,
				isValid:false
			},
			file26:{
				value:null,
				isValid:true
			},
			file27:{
				value:null,
				isValid:true
			},
			file28:{
				value:null,
				isValid:true
			},
			file29:{
				value:null,
				isValid:true
			},
			file30:{
				value:null,
				isValid:true
			},
			file31:{
				value:null,
				isValid:true
			},
			file32:{
				value:null,
				isValid:true
			},
			file33:{
				value:null,
				isValid:true
			},
			file34:{
				value:null,
				isValid:true
			},
			file35:{
				value:null,
				isValid:false
			},
			file36:{
				value:null,
				isValid:true
			},
			file37:{
				value:null,
				isValid:true
			},
			file38:{
				value:null,
				isValid:true
			},
			file39:{
				value:null,
				isValid:true
			},
			file40:{
				value:null,
				isValid:true
			},
			file41:{
				value:null,
				isValid:true
			},
			file42:{
				value:null,
				isValid:true
			},
			file43:{
				value:null,
				isValid:true
			},
			file44:{
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
				res=await sendReq(route+"/api/accounts/get_coapp_docs",
					"POST",
					JSON.stringify(data),
					{
						"Content-Type":"application/json",
						Authorization: "Bearer "+auth.token
					}
				);
				console.log(res);
		
				if(props.sbmt && props.sbmt==="sbmt" && parseInt(res[0].flag)>3 || parseInt(res[0].flag)>4){
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
						file25:{
							value:res[0].id_c[0].file25,
							isValid:res[0].id_c[0].file25 ? true : false
						},
						file26:{
							value:res[0].id_c[0].file26,
							isValid:true
						},
						file27:{
							value:res[0].id_c[0].file27,
							isValid:true
						},
						file28:{
							value:res[0].id_c[0].file28,
							isValid:true
						},
						file29:{
							value:res[0].id_c[0].file29,
							isValid:true
						},
						file30:{
							value:res[0].id_c[0].file30,
							isValid:true
						},
						file31:{
							value:res[0].id_c[0].file31,
							isValid:true
						},file32:{
							value:res[0].id_c[0].file32,
							isValid:true
						},file33:{
							value:res[0].id_c[0].file33,
							isValid:true
						},file34:{
							value:res[0].id_c[0].file34,
							isValid:true
						},file35:{
							value:res[0].id_c[0].file35,
							isValid:res[0].id_c[0].file35 ? true : false
						},file36:{
							value:res[0].id_c[0].file36,
							isValid:true
						},file37:{
							value:res[0].id_c[0].file37,
							isValid:true
						},file38:{
							value:res[0].id_c[0].file38,
							isValid:true
						},file39:{
							value:res[0].id_c[0].file39,
							isValid:true
						},file40:{
							value:res[0].id_c[0].file40,
							isValid:true
						},file41:{
							value:res[0].id_c[0].file41,
							isValid:true
						},file42:{
							value:res[0].id_c[0].file42,
							isValid:true
						},file43:{
							value:res[0].id_c[0].file43,
							isValid:true
						},file44:{
							value:res[0].id_c[0].file44,
							isValid:true
						},
						acc_num:{
							value:res[0].id_c[0].coapp_ban_acc,
							isValid:res[0].id_c[0].coapp_ban_acc==="" ? false : true
						},
						ifsc_num:{
							value:res[0].id_c[0].coapp_ifsc,
							isValid:res[0].id_c[0].coapp_ifsc==="" ? false : true
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

	const viewFirstMulti=()=>{
		if(!multiFirst){
			setMultiFirst(true);
		}else{
			setMultiFirst(false);
			setFormData({
				...formState.inputs,
				file25:{
					value:user.id_c[0].file25,
					isValid:user.id_c[0].file25 ? true : false
				},
				file26:{
					value:user.id_c[0].file26,
					isValid:true
				},
				file27:{
					value:user.id_c[0].file27,
					isValid:true
				},
				file28:{
					value:user.id_c[0].file28,
					isValid:true
				},
				file29:{
					value:user.id_c[0].file29,
					isValid:true
				},
				file30:{
					value:user.id_c[0].file30,
					isValid:true
				},
				file31:{
					value:user.id_c[0].file31,
					isValid:true
				},file32:{
					value:user.id_c[0].file32,
					isValid:true
				},file33:{
					value:user.id_c[0].file33,
					isValid:true
				},file34:{
					value:user.id_c[0].file34,
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
				file35:{
					value:user.id_c[0].file35,
					isValid:user.id_c[0].file35 ? true : false
				},
				file36:{
					value:user.id_c[0].file36,
					isValid:true
				},
				file37:{
					value:user.id_c[0].file37,
					isValid:true
				},
				file38:{
					value:user.id_c[0].file38,
					isValid:true
				},
				file39:{
					value:user.id_c[0].file39,
					isValid:true
				},
				file40:{
					value:user.id_c[0].file40,
					isValid:true
				},
				file41:{
					value:user.id_c[0].file41,
					isValid:true
				},file42:{
					value:user.id_c[0].file42,
					isValid:true
				},file43:{
					value:user.id_c[0].file43,
					isValid:true
				},file44:{
					value:user.id_c[0].file44,
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
			for (let i=0;i<44;i++){
				if(i>=4 && i<=23){
					continue;
				}
				if(typeof(formState["inputs"]["file"+(i+1)].value)!=='string' && formState["inputs"]["file"+(i+1)].value){
					formData.append("file"+(i+1),formState["inputs"]["file"+(i+1)].value)
				}
			}
		}else if(multiFirst && !multiSecond){
			console.log('here');
			console.log(formState.inputs.file25.value);
			if(typeof(formState.inputs.file25.value)==='string'){
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
					formData.append("file"+(i+25),formState["inputs"]["file25"].value[i])
				}catch(err){
					formData.append("file"+(i+25),new File([], ''));
				}

			}
			for (let i=35;i<45;i++){
				if(typeof(formState["inputs"]["file"+(i)].value)!=='string' && formState["inputs"]["file"+(i)].value){
					formData.append("file"+(i),formState["inputs"]["file"+(i)].value)
				}
			}
		}else if(multiSecond && !multiFirst){
			if(typeof(formState.inputs.file35.value)==='string'){
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
					formData.append("file"+(i+35),formState["inputs"]["file35"].value[i])
				}catch(err){
					formData.append("file"+(i+35),new File([], ''));
				}

			}
			for (let i=25;i<35;i++){
				if(typeof(formState["inputs"]["file"+(i)].value)!=='string' && formState["inputs"]["file"+(i)].value){
					formData.append("file"+(i),formState["inputs"]["file"+(i)].value)
				}
			}
		}else if(multiFirst && multiSecond){
			console.log('here alert');
			if(typeof(formState.inputs.file25.value)==='string' || typeof(formState.inputs.file35.value)==='string'){
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
					formData.append("file"+(i+25),formState["inputs"]["file25"].value[i])
				}catch(err){
					formData.append("file"+(i+25),new File([], ''));
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
					formData.append("file"+(i+35),formState["inputs"]["file35"].value[i])
				}catch(err){
					formData.append("file"+(i+35),new File([], ''));
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
		formData.append('coapp_ban_acc',formState.inputs.acc_num.value)
		formData.append('coapp_ifsc',formState.inputs.ifsc_num.value)
		console.log(formData);
		try{
			res=await sendReq(
				route+"/api/accounts/insert_coapp_docs",
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



	const saveHandle=async (event)=>{
		event.preventDefault();
		const formData=new FormData();
		console.log(formState);
		
		formData.append('file1',formState.inputs.file1.value)
		formData.append('file2',formState.inputs.file2.value)
		formData.append('file3',formState.inputs.file3.value)
		formData.append('file4',formState.inputs.file4.value)
		for (let i=0;i<formState.inputs.file25.value.length;i++){
			formData.append("file"+(i+25),formState["inputs"]["file25"].value[i])
		}
		for (let i=0;i<formState.inputs.file35.value.length;i++){
			formData.append("file"+(i+35),formState["inputs"]["file35"].value[i])
		}

		formData.append('id',auth.userId)
		formData.append('flag','5')
		formData.append('coapp_ban_acc',formState.inputs.acc_num.value)
		formData.append('coapp_ifsc',formState.inputs.ifsc_num.value)
		console.log(formData);
		try{
			res=await sendReq(
				route+"/api/accounts/insert_coapp_docs",
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

	console.log(formState);

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
			component=<LoanDetails app_id={props.app_id && props.app_id} back={true} flag={user.flag}/>
		}
		else{
			component=<Work mode={props.mode} app_id={props.app_id && props.app_id} flag={user ? user.flag : 4}/>
		}
	}else if(loading){
		component=<Loader asOverlay />
	}else if(props.sbmt && props.sbmt==="sbmt" && props.flag>3 || props.flag>4){
		console.log('here');
		if(user){
			for (let i=25;i<=34;i++){
				if(user["id_c"][0]["file"+i]){
					if(user["id_c"][0]["file"+i].split(".").slice(-1)[0]==='pdf'){
						ele1.push(<><div><PdfView id={`file${i}`} update inputhandler={inputHandler} url={`${route}${user["id_c"][0]["file"+i]}`}/></div><hr/></>)
					}else{
						ele1.push(<><div><ImagePicker ft="pdf/image" formcontrol center id={`file${i}`} image={`${route}${user["id_c"][0]["file"+i]}`} onInput={inputHandler}/></div><hr/></>)
					}
				}
			}
			for (let i=35;i<=44;i++){
				if(user["id_c"][0]["file"+i]){
					if(user["id_c"][0]["file"+i].split(".").slice(-1)[0]==='pdf'){
						ele2.push(<><div><PdfView id={`file${i}`} update inputhandler={inputHandler} url={`${route}${user["id_c"][0]["file"+i]}`}/></div><hr/></>)
					}else{
						ele2.push(<><div><ImagePicker ft="pdf/image" formcontrol center id={`file${i}`} image={`${route}${user["id_c"][0]["file"+i]}`} onInput={inputHandler}/></div><hr/></>)
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
					<p><strong>Your selfie</strong></p>
					<ImagePicker center id="file1" formcontrol image={`${route}${user['file1']}`} onInput={inputHandler}/>
				
					<p><strong>Your PAN card</strong></p>

					{user["file2"] && user['file2'].split(".").slice(-1)[0]==='pdf' ? <><div className="form-control" style={{overflow:'scroll',height:'30rem'}}><PdfView id="file2" update inputhandler={inputHandler} url={`${route}${user["file2"]}`}/></div></> : 

					<ImagePicker center id="file2" ft="pdf/image" formcontrol image={`${route}${user["file2"]}`} onInput={inputHandler}/>}<br/>


				
					<p><strong>Front side of your AADHAR card</strong></p>

					{user["file3"] && user['file3'].split(".").slice(-1)[0]==='pdf' ? <><div className="form-control" style={{overflow:'scroll',height:'30rem'}}><PdfView id="file3" update inputhandler={inputHandler} url={`${route}${user["file3"]}`}/></div></> : 

					<ImagePicker center id="file3" ft="pdf/image" formcontrol image={`${route}${user["file3"]}`} onInput={inputHandler}/>}<br/>
				
					

					<p><strong>Back side of your AADHAR card</strong></p>

					{user["file4"] && user['file4'].split(".").slice(-1)[0]==='pdf' ? <><div className="form-control" style={{overflow:'scroll',height:'30rem'}}><PdfView id="file4" update inputhandler={inputHandler} url={`${route}${user["file4"]}`}/></div></> : 

					<ImagePicker center id="file4" ft="pdf/image" formcontrol image={`${route}${user["file4"]}`} onInput={inputHandler}/>}<br/>
				
				</div>

				<Input element="input" type="number" label="Bank Account Number" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER()]}
				id="acc_num"
				placeholder="Bank Account Number"
				errorText="Please enter Your Valid Bank Account Number"
				onInput={inputHandler}
				initvalue={user['id_c'][0].coapp_ban_acc}
				initvalid={true}/>

				<Input element="input" type="text" label="Bank IFSC Number" 
				validators={[VALIDATOR_REQUIRE()]}
				id="ifsc_num"
				placeholder="Bank IFSC Number"
				errorText="Please enter Your Valid Bank IFSC Number"
				onInput={inputHandler}
				initvalue={user['id_c'][0].coapp_ifsc}
				initvalid={true}/>

				{(props.payslip==="Salaried") ? (<><div className="form-control" style={{overflow:'scroll',height: !multiFirst && '30rem'}}>

					<p><strong>last 3 months payslip</strong></p>
				
					{!multiFirst ? ele1.length>0 && ele1.map((e)=>{
						return e
					}) : <MultiImagePicker center id="file25" ft="pdf/image" onInput={inputHandler}/>}

				</div>
				<Button type="button" onClick={viewFirstMulti}>{!multiFirst ? "Update All Payslip Docs" : "Cancel"}</Button>


				<div className="form-control" style={{overflow:'scroll',height: !multiSecond && '30rem'}}>

					<p><strong>last 3 months salary a/c bank statement</strong></p>

					{!multiSecond ? ele2.length>0 && ele2.map((e)=>{
						return e
					}) : <MultiImagePicker center id="file35" ft="pdf/image" onInput={inputHandler}/>}

				</div>

				<Button type="button" onClick={viewSecondMulti}>{!multiSecond ? "Update All Salary Docs" : "Cancel"}</Button><br/><br/></>) : 

				(<><div className="form-control" style={{overflow:'scroll',height: !multiFirst && '30rem'}}>

					<p><strong>last 2 years ITR</strong></p>

					{!multiFirst ? ele1.length>0 && ele1.map((e)=>{
						return e
					}) : <MultiImagePicker center id="file25" ft="pdf/image" onInput={inputHandler}/>}

				</div>

				<Button type="button" onClick={viewFirstMulti}>{!multiFirst ? "Update All ITR Docs" : "Cancel"}</Button>

				<div className="form-control" style={{overflow:'scroll',height: !multiSecond && '30rem'}}>

					<p><strong>last 3 months bank statement</strong></p>
					
					{!multiSecond ? ele2.length>0 && ele2.map((e)=>{
						return e
					}): <MultiImagePicker center id="file35" ft="pdf/image" onInput={inputHandler}/>}

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
			
			<h3><center>Documents upload</center></h3>
			<hr/>
			<div className="form-control">
				<p><strong>Please upload selfie</strong></p>
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
					<MultiImagePicker center ft="pdf/image" id="file25" onInput={inputHandler}/>
				</div><div className="form-control">
					<p><strong>Please upload last 3 months salary a/c bank statement</strong></p>
					<MultiImagePicker center id="file35" ft="pdf/image" onInput={inputHandler}/>
				</div></>) : (<><div className="form-control">
					<p><strong>Please upload last 2 years ITR</strong></p>
					<MultiImagePicker center id="file25" ft="pdf/image" onInput={inputHandler}/>
				</div><div className="form-control">
					<p><strong>Please upload last 3 months bank statement</strong></p>
					<MultiImagePicker center id="file35" ft="pdf/image" onInput={inputHandler}/>
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