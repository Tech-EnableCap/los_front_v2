import React from 'react';
import ImagePicker from '../../shared/components/formelements/single_image_picker';


const Imageblock=(props)=>{
	return (
			<ImagePicker center id={`file${(props.id)}`} onInput={props.inpHandle} showbtn={props.show}/>
	);
};

export default Imageblock;