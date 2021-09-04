import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import {AuthContext} from "./shared/context/auth_context";
import {useAuth} from "./shared/hooks/auth_hook";
import Navigation from './shared/components/navigation/navigation';
import Auth from './user/authenticate/auth';
import Details from './user/user_details/details';
import Applications from './user/user_details/applicationList';
import ResetPass from './user/authenticate/resetPass';
import Footer from './ui/footer';
import './App.css';

function App() {
	const {token,login,logout,email,name,userId}=useAuth();
  let routes;
  if(token){
    routes=(
      <Switch>
        <Route path="/forms" exact>
          <Applications/>
        </Route>
        <Route path="/dashboard" exact>
          <Details/>
        </Route>
        <Redirect to="/dashboard"/>
      </Switch>
    )
  }else{
    routes=(
      <Switch>
        <Route path="/auth/:id/:token" exact>
          <ResetPass/>
        </Route>
        <Route path="/auth" exact>
          <Auth/>
          <Footer/>
        </Route>
        <Redirect to="/auth"/>
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn:!!token,
        token:token,
        email:email,
        name:name,
        userId:userId,
        login:login,
        logout:logout
      }}
    >
    	
        <Router>
          <Navigation/>
            <div className="App">    
              {routes}
            </div>
        </Router>
    </AuthContext.Provider>
  );
}

export default App;
