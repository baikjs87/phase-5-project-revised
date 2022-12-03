import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css"
import logo from "./assets/re3.png"

function NavBar({ user }) {

  return (
    <header className="header">
      <div className="header-div">
        <div>
          <Link to="/" className="title"><img src={logo} alt="reviewed"/></Link>
          
        </div>
        <div className="nav_buttons">
          {user ? (
            <div className="links">
              <Link to="/post" id="post" className="buttons_after_login">Post</Link>
              {/* <Link to="/favorites" id="favorites" className="buttons_after_login">Favorites</Link> */}
              <Link to="/account" id="account" className="buttons_after_login">Account</Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="buttons_before_login" id="login">Login</Link>
              <Link to="/signup" className="buttons_before_login" id="signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
