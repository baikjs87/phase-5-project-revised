import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import Post from "./Post"
import Favorites from "./Favorites";
import Account from "./Account";
import Details from "./Details";
import "./styles/app.css"

function App() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([])
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatedComment, setUpdatedComment] = useState({})

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])
  

  useEffect(() => {
    fetch('/reviews')
    .then(r => {
      if(r.ok){
        r.json().then((reviews)=>setReviews(reviews))
      }else{
        r.json().then(data => setErrors(data.error))
      }
    })
  },[])

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function addReview(review){
    console.log(review)
    setReviews([...reviews, review])
  }

  function handleNewComment(newComment){
    reviews.map((review) => review.id === newComment.review.id ? review.comments.push(newComment) : null)
  }

  function updateReview(updatedReview){
      reviews.map((review) => review.id === updatedReview.id ? updatedReview : review)
  }

  function updateComment(updatedComment){
    setUpdatedComment(updatedComment)
  }

  return (
    <>
    {loading === false ? (
      <div className="app_wrapper">
        <NavBar user={user} setUser={setUser} />
        <div className="contents_wrapper">
          <main>
          {errors?<div style={{color:'red'}}>{errors}</div>:null}
            {user ? (
              <Routes>
                <Route path="/post" element={<Post user={user} addReview={addReview} />} />
                <Route path="/favorites" element={<Favorites user={user}/>} />
                <Route path="/details/:id" element={
                  <Details 
                  user={user} 
                  reviews={reviews} 
                  addNewComment={handleNewComment} 
                  updatedComment={updatedComment}
                  />} 
                />
                <Route path="/account" element={
                  <Account 
                  user={user} 
                  setUser={setUser} 
                  updateReview={updateReview}
                  updateComment={updateComment}
                   />
                } />
                <Route path="/" element={<Home user={user} reviews={reviews} />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/signup" element={<SignUp setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/" element={<Home />} />
              </Routes>
            )}
          </main>
        </div>
      </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
