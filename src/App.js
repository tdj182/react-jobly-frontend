import { useEffect, useState } from "react";
import {JoblyApi} from './JoblyApi'
import './App.css';
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";
import Routes from './Routes'

/** Jobly App
 * 
 * -currUser keeps track of the current user logged in
 * 
 * -Token keeps track of the token that is passed along with login/signup
 * 
 * -appliedJobs will be pulled from the currUser's info
 */

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [appliedJobs, setAppliedJobs] = useState(new Set([]))


  //Make adjustments to the currUser/token if token is ever adjusted
  //Login
  //Signup
  //Logout
  useEffect(() => {
    async function getCurrUser() {
      if (token === "null" || token === null ){
        return
      } else {
        try {
          JoblyApi.token = token
          let {username} = jwt.decode(token)
          let currUser = await JoblyApi.getUser(username)
          setCurrUser(currUser)
          setAppliedJobs(new Set(currUser.applications))
        } catch (e) {
          console.log(`Error: ${e}`)
        }
      }
    }
    getCurrUser();
  }, [token])
  
  /** Login function 
   * gets token and sets it in the local storage
   * will call the useEffect function to adjust currUser/token
  */
  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      localStorage.setItem('token', token)
      setToken(token);
      return { success: true };
    } catch (e) {
      console.error(`Error: ${e}`);
      return e;
    }
  }

  /** signup function 
   * gets token and sets it in the local storage
   * will call the useEffect function to adjust currUser/token
   */
  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      localStorage.setItem('token', token)
      setToken(token);
      return { success: true };
    } catch (e) {
      console.error(`Error: ${e}`);
      return e;
    }
  }

  /** logout
  * clears the token and currUser
  */
  async function logout() {
    setToken(null);
    setCurrUser(null);
    localStorage.setItem('token', null)
  }

  /** Checks to see if job has already been applied for*/
  function hasAlreadyApplied(id) {
    return appliedJobs.has(id)
  }

  /** Will apply to job only if not already applied for(uses function above) */
  function applyToJob(id) {
    if (!hasAlreadyApplied(id)) {
      JoblyApi.applyToJob(currUser.username, id);
      setAppliedJobs(new Set([...appliedJobs, id]))
    } 
  }

  return (
    <div className="App">
      <UserContext.Provider value={{currUser, setCurrUser, hasAlreadyApplied, applyToJob}}>
        <Routes login={login} signup={signup} logout={logout}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
