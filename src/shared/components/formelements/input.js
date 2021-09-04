import React,{useReducer,useEffect} from 'react';
import {validate} from '../../util/validator';
import './input.css';

const inputReducer=(state,action)=>{
	switch(action.type){
		case 'CHANGE':
			return {
				...state,
				value:action.val,
				isValid:validate(action.val,action.validators)
			};
		case 'BLUR':
			return {
				...state,
				isTouched:true
			}
		default:
			return state;
	}
};

const Input=(props)=>{

	const [inputState,dispatch]=useReducer(inputReducer,{
												value:props.initvalue || '',
												isTouched:false,
												isValid:props.initvalid || false
											});

	const {id,onInput}=props;
	const {value,isValid}=inputState;

	useEffect(()=>{
		onInput(id,value,isValid)
	},[id,value,isValid,onInput]);

	const changedHandler=(event)=>{
		dispatch({
			type:"CHANGE",
			val:event.target.value,
			validators:props.validators
		})
	};

	const blurHandler=(event)=>{
		dispatch({
			type:'BLUR'
		});
	};

	const viewPass=(event,id_)=>{
		let val=document.getElementById(id_);
		if(val.type==='password'){
			val.type='text';
		}else{
			val.type='password';
		}
	}

	const element=props.element==='input' ? (<input id={props.id}
	style={{height:props.coapp_search && "2.7rem",width:props.coapp_search && '100%'}}
	type={props.type} 
	placeholder={props.placeholder}
	disabled={props.disable}
	onChange={changedHandler}
	onBlur={blurHandler}
	value={inputState.value} />) : (<textarea id={props.id} 
	rows={props.rows || 3}
	disabled={props.disable ? props.disable : false}
	onChange={changedHandler}
	onBlur={blurHandler}
	value={inputState.value} />);


	return(
		<div className={`${!props.search && !props.coapp_search && `form-control ${!inputState.isValid && inputState.isTouched && 
			"form-control--invalid"}`}`}>
			<label htmlFor={props.id}>{props.label}</label>
			<div style={{display:!props.coapp_search && "flex",flexDirection:!props.coapp_search && "row",height:props.search && "2.05rem"}}>
				<div><i class={`${props.image} fa-lg`}></i></div>{element}<div><i class={`${props.search} fa-lg`} style={{cursor:'pointer'}}></i></div>
				<div><i class={`${props.view} fa-lg`} style={{cursor:'pointer'}} onClick={(event)=>viewPass(event,props.id)}></i></div>
			</div>
			{!props.search && !props.coapp_search && !inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
		</div>
	)
};

export default Input;