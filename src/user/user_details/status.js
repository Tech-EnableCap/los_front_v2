import React from 'react';
import Card from '../../ui/card';

const Status=(props)=>{
	let res,st_data=[];
	console.log(props.flag);
	let st_list=["Personal details","Loan details","Residence details","Work details","Documents Upload"];

	for (let i=0;i<st_list.length;i++){
		if(i>props.flag-1){
			break;
		}
		st_data.push(<><div className="status" style={{marginLeft:'2rem'}} key={i}>
				<div className="numberCircle" style={{marginRight:'2rem',background:'#09b506'}}><i class="fa fa-check" aria-hidden="true"></i></div>
				{st_list[i]}
			</div>
			<hr/></>);
	}
	if(props.flag<st_list.length){
		for (let i=props.flag;i<st_list.length;i++){
			st_data.push(<><div className="status" style={{marginLeft:'2rem'}} key={i}>
					<div className="numberCircle" style={{marginRight:'2rem'}}><i class="fa fa-times" aria-hidden="true"></i></div>
					{st_list[i]}
				</div>
				<hr/></>);
		}
	}

	return (
		<Card className="authentication" style={{margin:"6rem auto",marginBottom:"1rem"}}>
		  <form>
		  <h3><center>Form status</center></h3>
		  <hr/>
		  {st_data}
		  </form>
		 </Card>
	);
};

export default Status;