import React from 'react';

const OngoingStatus=React.memo((props)=>{
	let element;
	console.log(props.st);
	if(parseInt(props.st)<6){
		element=(
			<>
			 <div className="status"><div className="side"><div className="numberCircle">1</div></div>Personal data</div>
			 <div className="status"><div className="side"><div className="numberCircle">2</div></div>documents Upload</div>
			 <div className="status"><div className="side"><div className="numberCircle">3</div></div>Loan Details Fill up</div>
			 <div className="status"><div className="side"><div className="numberCircle">4</div></div>Approval</div>
			 <div className="status"><div className="side"><div className="numberCircle">5</div></div>Disburse</div>
			</>
		);
	}else if(parseInt(props.st)===6){
		element=(
			<>
			 <div className="status"><div className="side"><div className="numberCircle" style={{background:"black",color:'white'}}>1</div></div>Personal data</div>
			 <div className="status"><div className="side"><div className="numberCircle" style={{background:"black",color:'white'}}>2</div></div>documents Upload</div>
			 <div className="status"><div className="side"><div className="numberCircle" style={{background:"black",color:'white'}}>3</div></div>Loan Details Fill up</div>
			 <div className="status"><div className="side"><div className="numberCircle">4</div></div>Approval</div>
			 <div className="status"><div className="side"><div className="numberCircle">5</div></div>Disburse</div>
			</>
		);
	}else if(parseInt(props.st)>6){
		element=(
			<>
			 <div className="status"><div className="side"><div className="numberCircle" style={{background:"black",color:'white'}}>1</div></div>Personal data</div>
			 <div className="status"><div className="side"><div className="numberCircle" style={{background:"black",color:'white'}}>2</div></div>documents Upload</div>
			 <div className="status"><div className="side"><div className="numberCircle" style={{background:"black",color:'white'}}>3</div></div>Loan Details Fill up</div>
			 <div className="status"><div className="side"><div className="numberCircle" style={{background:"black",color:'white'}}>4</div></div>Approval</div>
			 <div className="status"><div className="side"><div className="numberCircle" style={{background:"black",color:'white'}}>5</div></div>Disburse</div>
			</>
		);
	}
	return (
		 <div className="cardy">
  			<div className="container">
				{element}
			 </div>
		</div>
	);
});

export default OngoingStatus;