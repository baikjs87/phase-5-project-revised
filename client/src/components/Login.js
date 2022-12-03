import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/login.css'

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])
  const history = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          history('/')
        });
      } else {
        r.json().then(json => setErrors(json.error))
      }
    });
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="heading">Login</h1>
        {errors?<div style={{color:'red'}}>{errors}</div>:null}
        <div className="form">
          <div className="input">
            <label htmlFor="username" className="label">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}

export default Login;
