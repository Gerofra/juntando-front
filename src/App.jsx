import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Error from "./components/error/Error";
import nav from "./components/styles/navStyle.css";
import { MdAccountCircle, MdHome, MdLogout, MdEvent, MdSentimentSatisfiedAlt } from "react-icons/md";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Index from "./components/index.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";




class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (

      <BrowserRouter>
        
        <nav className="navbar__full">


          <div className="navbar__links__left">
            {currentUser && (
                <Link to={"/home"} className="nav__link">
                  <MdSentimentSatisfiedAlt/> Hola {currentUser.username}
                </Link>
              )}
          </div>


          {currentUser ? (
            <div className="navbar__links__right">
              
              {showModeratorBoard && (
                  <Link to={"/mod"} className="nav__link">
                    Moderator Board
                  </Link>
              )}

              {showAdminBoard && (
                  <Link to={"/admin"} className="nav__link">
                    Admin Board
                  </Link>
              )}

              {currentUser && (
                  <Link to={"/user"} className="nav__link">
                    <MdEvent/> Agenda
                  </Link>
              )}

                <Link to={"/profile"} className="nav__link">
                  <MdAccountCircle/> Perfíl
                </Link>

                <a href="/login" className="nav__link" onClick={this.logOut}>
                  <MdLogout/> Salir
                </a>

            </div>

          ) : (

            <></>

          )}
        </nav>


        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>

      </BrowserRouter>

    );
  }
}

export default App;


