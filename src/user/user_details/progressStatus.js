import React from 'react';
import '../../shared/components/status/status.css';
import Card from '../../ui/card';

const status=React.memo((props)=>{
	let element=null;
	console.log("ggg");
	if(parseInt(props.status)===0){
		element=(
			<>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-user fa-lg" style={{borderRadius:"52px",padding:".5em .5em",background: "white"}}></i></div>Personal Data</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-coins fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Loan Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-landmark fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Residence Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-keyboard fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Work Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-id-card-alt fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Decuments Details</div>
			</>
		);
	}
	if(parseInt(props.status)===1){
		element=(
			<>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-user fa-lg" style={{borderRadius:"52px",padding:".5em .5em"}}></i></div>Personal Data</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-coins fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Loan Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-landmark fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Residence Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-keyboard fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Work Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-id-card-alt fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Decuments Details</div>
			</>
		);
	}if(parseInt(props.status)===2){
		element=(
			<>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-user fa-lg" style={{borderRadius:"52px",padding:".5em .5em"}}></i></div>Personal Data</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-coins fa-lg" style={{borderRadius:"52px"}}></i></div>Loan Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-landmark fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Residence Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-keyboard fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Work Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-id-card-alt fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Decuments Details</div>
			</>
		);
	}if(parseInt(props.status)===3){
		element=(
			<>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-user fa-lg" style={{borderRadius:"52px",padding:".5em .5em"}}></i></div>Personal Data</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-coins fa-lg" style={{borderRadius:"52px"}}></i></div>Loan Details</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-landmark fa-lg" style={{borderRadius:"52px"}}></i></div>Residence Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-keyboard fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Work Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-id-card-alt fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Decuments Details</div>
			</>
		);
	}if(parseInt(props.status)===4){
		element=(
			<>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-user fa-lg" style={{borderRadius:"52px",padding:".5em .5em"}}></i></div>Personal Data</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-coins fa-lg" style={{borderRadius:"52px"}}></i></div>Loan Details</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-landmark fa-lg" style={{borderRadius:"52px"}}></i></div>Residence Details</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-keyboard fa-lg" style={{borderRadius:"52px"}}></i></div>Work Details</div>
			<div className="status1">
			<div className="side1" style={{background: "white"}}><i class="fas fa-id-card-alt fa-lg" style={{borderRadius:"52px",background: "white"}}></i></div>Decuments Details</div>
			</>
		);
	}if(parseInt(props.status)===5){
		element=(
			<>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-user fa-lg" style={{borderRadius:"52px",padding:".5em .5em"}}></i></div>Personal Data</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-coins fa-lg" style={{borderRadius:"52px"}}></i></div>Loan Details</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-landmark fa-lg" style={{borderRadius:"52px"}}></i></div>Residence Details</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-keyboard fa-lg" style={{borderRadius:"52px"}}></i></div>Work Details</div>
			<div className="status1">
			<div className="side1" style={{background: "#a6a9ae"}}><i class="fas fa-id-card-alt fa-lg" style={{borderRadius:"52px"}}></i></div>Decuments Details</div>
			</>
		);
	}
	return(
		<Card className="authentication" style={{margin:"3rem auto",marginBottom:"1rem"}}>
		  <form>
		  <h3><center>Form status</center></h3>
		  <hr/>
		  {element}
		  </form>
		 </Card>
	);
});

export default status;
