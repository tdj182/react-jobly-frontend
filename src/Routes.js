import {useContext} from 'react'
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Profile from "./Profile"
import NavBar from './NavBar'
import Home from './Home'
import CompanyList from './CompanyList'
import JobList from './JobList'
import UserContext from "./UserContext";
import CompanyDetails from './CompanyDetails'
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

function Routes({login, signup, logout, saveChanges}) {
  const { currUser } = useContext(UserContext);

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
          {currUser ? <CompanyList /> : <Redirect to='./login'/>}
        </Route>
        <Route exact path="/companies/:handle">
          {currUser ? <CompanyDetails /> : <Redirect to='./login'/>} 
        </Route>
        <Route exact path="/jobs"> 
          {currUser ? <JobList />  : <Redirect to='./login'/>} 
        </Route>
        <Route exact path="/profile"> 
          {currUser ? <Profile saveChanges={saveChanges}/>  : <Redirect to='./login'/>} 
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;