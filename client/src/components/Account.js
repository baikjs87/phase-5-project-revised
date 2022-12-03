import './styles/account.css'
import { useEffect, useState } from 'react';
import MyReviews from './MyReviews';
import MyComments from './MyComments';
import {useNavigate} from 'react-router-dom'

function Account({ user, setUser, updateReview, updateComment }) {
    const [reviewsShown, setReviewsShown] = useState(false);
    const [commentsShown, setCommentsShown] = useState(false);
    const [myComments, setMyComments] = useState([])
    const [myReviews, setMyReviews] = useState([])
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    // console.log("comments:", myComments)
    // console.log("reviews: ", myReviews)


    useEffect(() => {
        fetch('/reviews')
        .then(r => {
          if(r.ok){
            r.json().then((reviews) => {
              const reviewsList = []
              reviews.map((review) => {
                if(review.user.id === user.id){
                  reviewsList.push(review)
                }
                return reviewsList
              })
              setMyReviews(reviewsList)
            });
          } else {
            r.json().then(json => setErrors(json.error))
          }
        });

        fetch('/comments')
        .then((r) => {
              r.json().then((comments) => {
                const commentsList = []
                comments.map((comment) => {
                  if(comment.user.id === user.id){
                    commentsList.push(comment)
                  }
                  return commentsList
                })
                setMyComments(commentsList)
              });
          });
    },[user.id])

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
            navigate('/')
          } else {
            r.json().then(json => setErrors(json.error))
          }
        });
      }

    const handleClickReviews = () => {
      setReviewsShown(true);
      setCommentsShown(false);
    };

    function handleUpdateReview(updatedReview){
      setMyReviews((reviews) =>
        reviews.map((review) => {
          return review.id === updatedReview.id ? updatedReview : review
        })
      )
      updateReview(updatedReview)
    }

    function handleDeleteReview(deleteReview){
      setMyReviews((reviews) =>
        reviews.filter((review) => review.id !== deleteReview.id)
      )
    }
    
    const handleClickComments = () => {
      setCommentsShown(true);
      setReviewsShown(false);
    };

    function handleUpdateComment(updatedComment){
      setMyComments((comments) => 
        comments.map((comment) => {
          return comment.id === updatedComment.id ? updatedComment : comment
        })
      ) 
      updateComment(updatedComment)
    }
    
    function handleDeleteComment(deletedComment){
      setMyComments((comments) => 
        comments.filter((comment) => comment.id !== deletedComment.id)
      )
    }

    return(
      <div className="account-wrapper">
        <div className="menu-block">
          <div className="sidebar">
            <small className="text-muted pl-3">MY ACCOUNT</small>
            <ul className="list">
              <li onClick={handleClickReviews} className="links">My Reviews</li>
              <li onClick={handleClickComments} className="links">My Comments</li>
              <li className="logout" onClick={handleLogoutClick}>Log Out</li>
            </ul>
          </div>
        </div>
        <div className="account-body">
          <h5>Hello {user.username}</h5>
        </div>
        <div className="account-subbody">
        {errors?<div style={{color:'red'}}>{errors}</div>:null}
          {reviewsShown && (
            <MyReviews user={user} 
            myReviews={myReviews}
            onUpdateReview={handleUpdateReview}
            onDeleteReview={handleDeleteReview} />
          )}
          {commentsShown && (
            <MyComments user={user} 
            myComments={myComments} 
            onUpdateComment={handleUpdateComment} 
            onDeleteComment={handleDeleteComment} />
          )}
        </div>
      </div>
  )
}

export default Account