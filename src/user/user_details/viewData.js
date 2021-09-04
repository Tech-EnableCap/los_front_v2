import React from 'react';
import Card from '../../ui/card';
import PdfView from './pdfView';
import {route} from '../../route';
import ImagePicker from '../../shared/components/formelements/single_image_picker';
import Button from '../../ui/button';

const ViewData=(props)=>{
	console.log(props);
	let selfie,imgfiles=[],pdffiles=[],element;

	for (let i in props.details){
		if (i.includes('file')){
			if (props.details[i].split(".").slice(-1)[0]!=='pdf'){
				if(i==='file1'){
					selfie=<ImagePicker center id={props.details[i]} view={true} image={`${route}${props.details[i]}`}/>;
				}else{
					imgfiles.push(
						<ImagePicker center id={props.details[i]} view={true} image={`${route}${props.details[i]}`}/>
					)
				}
			}else{
				pdffiles.push(
					<PdfView url={`${route}${props.details[i]}`}/>
				)
			}
		}
	}


	return(
		<Card className="form">
			<div className="form-control">
				<p><strong>Your Selfie</strong></p>
				{selfie}
			</div>
			<h5>Email : {props.details.email}</h5>
			<hr/>
			<h5>Gender : {props.details.gender}</h5>
			<hr/>
			<h5>Date of birth : {props.details.dob}</h5>
			<hr/>
			<h5>Address : {props.details.address}</h5>
			<hr/>
			<h5>City : {props.details.city}</h5>
			<hr/>
			<h5>Postal : {props.details.postal}</h5>
			<hr/>
			<h5>State : {props.details.state}</h5>
			<hr/>

			<div className="form-control">
				<p><strong>Your documents</strong></p>
				{imgfiles.map((img,idx)=>{
					return <div key={idx}>{img}</div>
				})}
				<div className="form-control">
					{pdffiles.map((pdf,idx)=>{
						return <div key={idx}>{pdf}</div>
					})}
				</div>
			</div>

		
		</Card>
	);
};

export default ViewData