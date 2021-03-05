import { useEffect, useState } from "react";
import {JoblyApi} from './JoblyApi'
import './App.css';
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";
import Routes from './Routes'


function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [appliedJobs, setAppliedJobs] = useState(new Set([]))


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
  
  /** Login function */
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

  async function logout() {
    setToken(null);
    setCurrUser(null);
    localStorage.setItem('token', null)
  }

  function hasAlreadyApplied(id) {
    return appliedJobs.has(id)
  }

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
