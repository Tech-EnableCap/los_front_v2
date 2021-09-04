import React,{useRef,useState,useEffect} from 'react';
import './image_picker.css';
import './input.css';
import Button from '../../../../src/ui/button';

const ImagePicker=(props)=>{
	let element=[];
	//let btn=null;
	//let block=null;
	//let ftype="";
	const [file,setFile]=useState();
	//const [show,setShow]=useState(true);
	const [preview,setPreview]=useState([]);
	const [valid,setValid]=useState(false);

	const imagePick=useRef();

	useEffect(()=>{
		if(!file){
			console.log('here');
			return;
		}
		setPreview([]);
		for (let i=0;i<file.length;i++){
			const fileReader=new FileReader();
			fileReader.onload=()=>{
				setPreview(oldArray=>[...oldArray,fileReader.result]);
				console.log(file);
				
			};
			
			fileReader.readAsDataURL(file[i]);
			}
	},[file]);

	const f_size_func=(fileList)=>{
		let size=0;
		for (let i=0;i<fileList.length;i++){
			size+=fileList[i].size*0.000001
		}
		return size;
	}

	const pickedHandler=(event)=>{
		let pickedFile;
		let fileValid=valid;
		if(event.target.files && event.target.files.length>0 && f_size_func(event.target.files)<=1.5){
			pickedFile=event.target.files;
			setFile(pickedFile);
			setValid(true);
			fileValid=true;
		}else{
			setValid(false);
			fileValid=false;
			if(f_size_func(event.target.files)>1.5){
				alert("File must be under 1.5 MB");
			}
		}
		props.onInput(props.id,pickedFile,fileValid);
	}

	const imageHandler=()=>{
		imagePick.current.click();
	}

	/*const cancelHandler=(e)=>{
		setShow(false);
	}*/

	/*if(props.showbtn){
		//btn=<Button type="button" onClick={cancelHandler}>Pick Image</Button>;
		btn=<span onClick={cancelHandler}><i class="fas fa-trash-alt fa-lg"></i></span>
	}*/

	
	if(preview.length>0){
		console.log(preview.length);
		for (let i=0;i<file.length;i++){
			let ftype=file[i].name.split(".").slice(-1)[0]
			if(ftype==="pdf"){
				//setElement(oldArray=>[...oldArray,file[i].name]);

				element.push(file[i].name);
			}
		}
		for (let j=0;j<preview.length;j++){
			let dtype=preview[j].split(",")[0];
			console.log(typeof(dtype));
			if(dtype.includes("image")){
				element.push(<img src={preview[j]} alt="Preview"/>);
			}
		}
	}else if(props.image){
		/*setElement(oldArray=>[...oldArray,<img src={props.image} alt="Preview"/>]);*/
		element.push(<img src={props.image} alt="Preview"/>);
	}else if(preview.length<1){
		/*setElement(oldArray=>[...oldArray,<p>Please select file</p>]);*/
	}

	return(
		<div><div className="form-control">
			<input id={props.id}
			ref={imagePick}
			style={{display:'none'}} 
			type="file"
			multiple
			onChange={pickedHandler}
			accept={!props.ft ? ".jpg,.png,.jpeg" : ".jpg,.png,.jpeg,.pdf"}/>
			<div className={`image-upload ${props.center && 'center'}`}>
				{element.map((ele,idx)=>{
					return (<div className="image-upload__preview" key={idx}>{ele}</div>)
				})}
				<div style={{flexDirection:"row"}}>
				{!props.view && <Button type="button" onClick={imageHandler}>Select file</Button>}
				</div>
			</div>
			{!valid && <p>{props.errorText}</p>}
			</div>
		</div>
	);
};

export default ImagePicker;
