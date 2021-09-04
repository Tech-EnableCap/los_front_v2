import React,{useContext} from 'react';
import './navlink.css';
import {NavLink} from 'react-router-dom';
import {AuthContext} from "../../context/auth_context";

const Navlinks=(props)=>{
	const auth=useContext(AuthContext);
	//console.log(auth.userId);
	return(
		<ul className="nav-links">
			{!auth.isLoggedIn &&
			(<li>
				<NavLink to="/auth">Authenticate</NavLink>
			</li>)}
			{auth.isLoggedIn &&
			(<li>
				<NavLink to="/forms">Loan Application</NavLink>
			</li>)}
			{auth.isLoggedIn &&
			(<li>
				<NavLink to="/dashboard">Dashboard</NavLink>
			</li>)}
			{auth.isLoggedIn && 
		    (<li>
	          {" "}
	          <NavLink to='' onClick={auth.logout}>Log out</NavLink>
	        </li>)}
		</ul>
	);
};

export default Navlinks;