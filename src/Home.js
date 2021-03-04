import React, {useContext} from "react";
import UserContext from "./UserContext";
import './Home.css'

function Home() {
  const { currUser } = useContext(UserContext);
  return (
    <div className="Home">
      <h1 className="Home-title">Jobly</h1>
      <p className="Home-description">All the jobs in one, convenient place.</p>
      {currUser && <p>Welcome Back, {currUser.username}</p>}
    </div>
  );
}

export default Home;
