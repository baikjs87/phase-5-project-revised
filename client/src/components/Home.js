import Reviews from "./Reviews";
import './styles/home.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import review_image from './assets/review_image.jpg'

function Home({ user, reviews, setUser }) {
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

  if (user) {
    return (
      <div className="main-wrapper">
        <h6 className="welcome">Welcome, {user.username}!</h6>
        <Reviews reviews={reviews} user={user} />
      </div>
    )
  } else {
    return (
    <div className="home-wrapper">
      <h3 className="blurb">The review site to help you decide if you should get the piece that you've been eyeing!</h3>
      {/* <h4>Please Login or Sign Up to continue</h4> */}
      <div>
        <img src={review_image} width="50%" height="auto" id="review_image" alt="reviewing"></img>
        <div className="login_block card">
          <div className="card-body">  
            <form onSubmit={handleSubmit}>
            <h5 className="card-title">Login</h5>
            {errors?<div style={{color:'red'}}>{errors}</div>:null}
            <div className="form">
              <div className="input">
                {/* <label htmlFor="username" className="label">Username</label> */}
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="input">
                {/* <label htmlFor="password" className="label">Password</label> */}
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
            <button type="submit" className="button">Login</button>
            </form>
          </div>
        </div>
      </div>

      <footer id="footer">
          <a href="https://www.freepik.com/free-vector/organic-flat-feedback-concept_13961232.htm#query=review&position=0&from_view=search&track=sph">Image by pikisuperstar</a> on Freepik
      </footer>
    </div>
    )
  }
}

export default Home;
