import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { MdMoodBad } from "react-icons/md";

function Dashboard() {

  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);



  return (
    <div className="dashboardContainer">

      <Link to={"/"}>
        <div className="dashboardBox">
          <MdMoodBad />
          <p>Ha ocurrido un error.</p>
        </div>
      </Link>



    </div>
  );
}

export default Dashboard;