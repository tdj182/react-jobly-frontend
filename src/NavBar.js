import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./NavBar.css";

function NavBar({logout}) {
  const { currUser } = useContext(UserContext);

  function buildNav(currUser) {
    if (!currUser) {
      return (
        <div className="NavBar-options">
          <NavLink className="NavBar-item" exact to="/login">
            Login
          </NavLink>
          <NavLink className="NavBar-item" exact to="/signup">
            Signup
          </NavLink>
        </div>
      )
    } else {
      return (
        <div className="NavBar-options">
          <NavLink className="NavBar-item" exact to="/companies">
            Companies
          </NavLink>
          <NavLink className="NavBar-item" exact to="/jobs">
            Jobs
          </NavLink>
          <NavLink className="NavBar-item" exact to="/profile">
            Profile
          </NavLink>
          <NavLink className="NavBar-item" exact to="/" onClick={logout}>
            Log out {currUser.username}
          </NavLink>
        </div>
      )
    }
  }
  return (
    
    <nav className="NavBar">
      <NavLink className="NavBar-home" exact to="/">
        Jobly
      </NavLink>
      {buildNav(currUser)}
    </nav>
  );
}

export default NavBar;
