import React,{useState} from 'react';
import './navigation.css';
import Header from './header';
//import {Link} from 'react-router-dom';
import Navlinks from './navlink';
import SideDrawer from './sideDrawer';
import Backdrop from '../../../ui/backdrop';
import logo from '../../../logo.svg';

const Navigation=(props)=>{
	const [drawerIsOpen,setDrawerIsOpen]=useState(false);

	const openDrawer=()=>{
		setDrawerIsOpen(true);
	};

	const closeDrawer=()=>{
		setDrawerIsOpen(false);
	}

	return (
		<React.Fragment>
			{drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
			<SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
				<nav className="main-navigation__drawer-nav">
					<Navlinks/>
				</nav>
			</SideDrawer>
			<Header>
				<button className="main-navigation__menu-btn" onClick={openDrawer}>
					<span/>
					<span/>
					<span/>
				</button>
				
				
				<h5 style={{fontWeight:"300"}} className="main-navigation__title">
				<img src={logo} className="App-logo" alt="logo"/>
					EnableCap
				</h5>

				<nav className="main-navigation__header-nav">
					<Navlinks/>
				</nav>
			</Header>
		</React.Fragment>
	);
};

export default Navigation;