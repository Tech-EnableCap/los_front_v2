import React from 'react';
import logo from '../../Man-Using-Computer.svg';

const Info=()=>{
	return (
		<><div className="no-applications" style={{marginTop:'13rem'}}>
		<img src={logo} className="logo" alt="logo"/>
			<div className="help-text">
				Your application has already been submitted !!
			</div>
		</div></>
	);
};

export default Info;