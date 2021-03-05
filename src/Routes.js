import React from 'react'
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Profile from "./Profile"
import NavBar from './NavBar'
import Home from './Home'
import CompanyList from './CompanyList'
import JobList from './JobList'
import CompanyDetails from './CompanyDetails'
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

function Routes({login, signup, logout}) {
  return (
    <BrowserRouter>
      <NavBar logout={logout}/>
      <Switch>
        <Route exact path="/"> 
          <Home /> 
        </Route>
        <Route exact path="/login"> 
          <LoginForm login={login}/> 
        </Route>
        <Route exact path="/signup"> 
          <SignupForm signup={signup}/> 
        </Route>
        
        {/* These routes need authorization  */}
        <Route exact path="/companies"> 
          {localStorage.getItem('token') !== 'null' ? <CompanyList /> : <Redirect to='./login'/>}
        </Route>
        <Route exact path="/companies/:handle">
          {localStorage.getItem('token') !== 'null' ? <CompanyDetails /> : <Redirect to='./login'/>} 
        </Route>
        <Route exact path="/jobs"> 
          {localStorage.getItem('token') !== 'null' ? <JobList />  : <Redirect to='./login'/>} 
        </Route>
        <Route exact path="/profile"> 
          {localStorage.getItem('token') !== 'null' ? <Profile />  : <Redirect to='./login'/>} 
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;