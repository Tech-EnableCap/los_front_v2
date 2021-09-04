import React,{useState,useContext,useEffect} from 'react';
import '../../user/user_details/details.css';
import Card from '../../ui/card';
import Button from '../../ui/button';
import Input from '../../shared/components/formelements/input';
import logo from '../../Man-Using-Computer.svg';
import {useHttp} from '../../shared/hooks/http_hook';
import {route} from '../../route';
import Loader from '../../ui/loader.js';
import {useForm} from '../../shared/hooks/form_hook';
import Err from '../../ui/error.js';
import SweetAlert from 'react-bootstrap-sweetalert';
import Personal from './viewApplicantsData';
import {AuthContext} from '../../shared/context/auth_context';

const SalesDashboard=(props)=>{
	let element,res,perpage=30;
	const auth=useContext(AuthContext);
	const {loading,error,sendReq,clearError}=useHttp();
	const [err,setErr]=useState(false);
	const [total_page,setTotal]=useState(0);
	const [results,setResults]=useState(0);
	let [index,setIndex]=useState(0);
	const [user,setUser]=useState([]);
	const [search,setSearch]=useState([]);
	const [idsearch,setIdsearch]=useState([]);
	const [checked,setChecked]=useState([]);
	const [view,setView]=useState(null);
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

	useEffect(()=>{
		getUser(0,"true");
	},[sendReq,setUser]);

	const getUser=async (idx,count)=>{
		try{
			const data={
				idx:idx,
				count:count,
				type:props.type
			}
			console.log(JSON.stringify(data))
			res=await sendReq(route+"/api/accounts/quick_view",
				"POST",
				JSON.stringify(data),
				{
					"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
				}
			);
			console.log(res);
			if(count==="true"){
				let total=res.slice(-1)[0];
				setResults(total);
				if(parseInt(total)>perpage){
					if(parseInt(total)%perpage===0){
						setTotal(total);
					}else{
						let numpages=parseInt(total/perpage)+1;
						setTotal(numpages);
					}
				}else{
					setTotal(1);
				}	
				res.pop();
			}
			setUser(res);
		}catch(err){
			console.log(err);
		}	
	}

	const previousPage=()=>{

		if(index>=total_page){
			setIndex(total_page-2);
			getUser(total_page-2,"nope");
			return;
		}
		console.log(index);
		index--;
		console.log(index);
		if(index>=0){
			getUser(index,"nope");
			setIndex(prev=>prev-1);
		}else{
			alert("Your are at the start of page");
			setIndex(0);
		}
	}

	const nextPage=()=>{
		if(total_page===1 || total_page===0){
			alert("Your are at the end of page");
			return;
		}
		if(index<=0){
			setIndex(1);
			getUser(1,"nope");
			return;
		}
		index++;
		if(index+1>total_page){
			alert("Your are at the end of page");
			console.log(index)
			setIndex(total_page-1);
		}else{
			getUser(index,"nope");
			setIndex(pre=>pre+1)
		}
	}

	const handleChange=(event,row)=>{
    	//setChecked([...checked,{id:row.id,check:event.target.checked}]);
    	//console.log(checked);
    	if(checked.indexOf(row.id)!==-1){
    		const index=checked.indexOf(row.id);
    		checked.splice(index,1);
    	}else{
    		//det.push(row.id);
    		setChecked([...checked,row.id]);
    	}

    	
	};

	const actionHandler=(event) => {
        setInput({...input,act:event.target.value});
    }

    const searchHandler=(event) => {
        setInput({...input,sr:event.target.value});
    }

    const handleAction=async ()=>{
    	if(checked.length<1){
    		alert('no data selected');
    		return;
    	}
    	const data={
    		id:checked,
    		action:input.act,
    		type:props.type
    	}
    	console.log(data);
    	try{
    		res=await sendReq(route+"/api/accounts/sales_action",
	    		"POST",
	    		JSON.stringify(data),
	    		{
	    			"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
	    		}
	    	);
	    	console.log(res);
	    	if('success' in res){
	    		alert(res.success);
	    		window.location.reload();
	    	}else{
	    		setErr(res.error);
	    	}
    	}catch(err){
    		console.log(err);
    	}
    }

    const handleSearch=async ()=>{
    	try{
	    	if(formState.inputs.id.value===''){
	    		alert('You must specify the search data');
	    		return;
	    	}
    		const data={
	    		type:input.sr,
	    		value:formState.inputs.id.value,
	    		type_prev:props.type
	    	}	
	    	console.log(JSON.stringify(data));
	    	res=await sendReq(route+"/api/accounts/search",
	    		"POST",
	    		JSON.stringify(data),
	    		{
	    			"Content-Type":"application/json",
					Authorization: "Bearer "+auth.token
	    		}
	    	);
	    	console.log(res);
	    	if(res.error){
	    		setErr(res.error)
	    		setUser([]);
	    		setIdsearch([]);
	    	}else{
	    		setUser([]);
	    		setIdsearch(res);
		    	setResults(res.length);
	    	}
	    }catch(err){
	    	setUser([]);
	    	setIdsearch([]);
	    	setResults(0);
	    	console.log(err);
	    }
    }

    const viewUserDeatils=(event,row)=>{
    	console.log(row);
    	setView(row);
    }

    const clean=()=>{
		setErr(false);
	}


	if(user || search || idsearch){
		element=(
			<><div className="details" style={{position:'fixed',top:'9.5rem',width:'100%',background:'white',padding:'1rem',marginLeft:'0rem',marginRight:'0rem'}}>
			    		<div className="container">
			    		<div className="flex-container">
			    			<div className="flex-item-left" style={{flex:'35%'}}>
			    				<div style={{display:'flex'}}>
			    					<div style={{flex:'1'}}>
			    						<label>Search By</label>
								    	<select name="search" id="sr" value={input.sr} onChange={searchHandler} style={{height:'2rem',marginRight:'1rem'}}>
					                        <option value="id">Loan ID</option>
					                        <option value="email">Email</option>
					                    </select>
			    					</div>
			    					<div style={{flex:'2'}}>
			    						<Input element="input" type="text"
								    	search={true}
										validators={[]}
										id="id"
										placeholder="search"
										onInput={formInputHandler}
										 />
			    					</div>
			    					<div style={{flex:'5'}}>
			    						<i class="fas fa-search fa-lg" style={{marginTop:'1.5rem',height:'2rem',cursor:'pointer'}} onClick={handleSearch}></i>
			    					</div>
			    				</div>
			    			</div>
			    			<div className="flex-item-right" style={{flex:'35%'}}>
			    				<div style={{display:'flex'}}>
			    					<div style={{flex:'1'}}>
			    						<label style={{marginLeft:'3rem'}}>Actions</label>
								    	<select name="action" id="act" value={input.act} onChange={actionHandler} style={{height:'2.05rem',marginLeft:'3rem'}}>
					                        <option value="approve">Approve</option>
					     					<option value="reject">Reject</option>
					                        {props.type==="sales" && <option value="coapp">Coapplicant Required</option>}
					                    </select>
			    					</div>
			    					<div style={{flex:'2'}}>
			    						<i class="fas fa-check-circle fa-lg" style={{marginTop:'1.5rem',height:'2rem',cursor:'pointer'}} onClick={handleAction}></i>
			    					</div>
			    				</div>
			    			</div>
			    			<div className="flex-item-left" style={{flex:'30%'}}>
			    				<div style={{display:'flex'}}>
			    					
			    						<i class="fas fa-arrow-alt-circle-left fa-lg" style={{marginTop:'1.5rem',height:'2rem',cursor:'pointer',marginRight:'1.5rem'}} onClick={previousPage}></i>
			    					
			    					
			    						<div style={{marginTop:'1.5rem',height:'2rem',marginRight:'1.5rem'}}>{index+1}</div>
			    					
			    						<i class="fas fa-arrow-alt-circle-right fa-lg" style={{marginTop:'1.5rem',height:'2rem',cursor:'pointer',marginRight:'3rem'}} onClick={nextPage}></i>

			    						<button className="refreshbtn" type="button" onClick={()=>window.location.reload()}>Refresh</button>
			    			</div>
			    		</div>
			    	</div>
			    	</div></div><br/>

			    	<div className="main" style={{marginLeft:'0rem',marginTop:'15rem'}}>
	        			<Err error={error} onClear={clearError}/>
						<Err error={err} onClear={clean}/>
				<div className="cardy" style={{marginBottom:'15rem',overflow:'scroll'}}>
			  		<div className="container">
			    	<center><h4 style={{marginTop:'1rem'}}><b>Applications</b></h4><br/></center>
			    	
			    	<h6 style={{height:'2rem',cursor:'pointer',marginRight:'1.5rem'}}>Results {results}, Show {perpage}/Page</h6>
			    		
			    		<table>
			    		<thead>
						  <tr>
						  	<th>Select Row</th>
						    <th>Loan Id</th>
						    <th>Email</th>
						    <th>Name</th>
						    <th>Course name</th>
						    <th>Loan requsted</th>
						    <th>Coapplicat Required</th>
						    <th>Action</th>
						  </tr>
						  </thead>
						  {search.length>0 ? search.map((usr)=>{
						  	return(
						  		<tbody><tr className="border_bottom" key={usr.id_n[0].id}>
						  			<td><input type="checkbox" style={{margin:"10px"}} onChange={(event)=>handleChange(event,usr)}/></td>
								    <td>{usr.id_n[0].id}</td>
								    <td>{usr.email}</td>
								    <td>{`${usr.first_name} ${usr.last_name}`}</td>
								    <td>{usr.id_n[0].course_name}</td>
								    <td>{usr.id_n[0].financing_required}</td>
								     <td>{JSON.stringify(usr.id_n[0].coapp_required)}</td>
								    <td><Button type="button" onClick={(event)=>viewUserDeatils(event,usr)}>View</Button></td>
						  		</tr></tbody>
						  	)
						  }) : idsearch.length>0 ? idsearch.map((usr)=>{
						  	return(
						  		<tbody><tr className="border_bottom" key={usr.id}>
						  			<td><input type="checkbox" style={{margin:"10px"}} onChange={(event)=>handleChange(event,usr)}/></td>
								    <td>{usr.id}</td>
								    <td>{usr.applicant_id.email}</td>
								    <td>{`${usr.applicant_id.first_name} ${usr.applicant_id.last_name}`}</td>
								    <td>{usr.course_name}</td>
								    <td>{usr.financing_required}</td>
								     <td>{JSON.stringify(usr.coapp_required)}</td>
								    <td><Button type="button" onClick={(event)=>viewUserDeatils(event,usr)}>View</Button></td>
						  		</tr></tbody>
						  	)
						  }) : user.length>0 ? user.map((usr)=>{
						  	return(
						  		<tbody><tr  className="border_bottom" key={usr.id}>
						  			<td><input type="checkbox" style={{margin:"10px"}} onChange={(event)=>handleChange(event,usr)}/></td>
								    <td>{usr.id}</td>
								    <td>{usr.applicant_id.email}</td>
								    <td>{`${usr.applicant_id.first_name} ${usr.applicant_id.last_name}`}</td>
								    <td>{usr.course_name}</td>
								    <td>{usr.financing_required}</td>
								     <td>{JSON.stringify(usr.coapp_required)}</td>
								    <td><Button type="button" onClick={(event)=>viewUserDeatils(event,usr)}>View</Button></td>
						  		</tr></tbody>
						  	)
						  }) : null}
						</table><br/>
				  	</div>
			  	</div>
			  	</div>
			</>
		);
	}if(loading){
		element=<Loader asOverlay />
	}if(view){
		element=<Personal type={props.type} user={view}/>
	}

	return element
};

export default SalesDashboard;