import { useEffect, useState } from "react";
import {JoblyApi} from './JoblyApi'
import './App.css';
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";
import Routes from './Routes'


function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));


  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        try {
          JoblyApi.token = token
          let {username} = jwt.decode(token)
          setCurrUser(await JoblyApi.getUser(username))
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
      alert("Error: check password and username")
      return e;
    }
  }

  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      localStorage.setItem('token', token)
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

  async function saveChanges(data) {
    console.log(data)
    try {
      let user = await JoblyApi.saveChanges(currUser.username, data);
      console.log(user)
      return { success: true };
    } catch (e) {
      console.error(`Error: ${e}`);
      return e;
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{currUser, setCurrUser}}>
        <Routes login={login} signup={signup} logout={logout} saveChanges={saveChanges}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
