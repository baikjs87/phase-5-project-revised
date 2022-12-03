import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import './styles/details.css'

function Details({ user, reviews, addNewComment, updatedComment }) {
    const location = useLocation()
    const review = location.state.review
    const review_id = location.state.review.id
    const [commentData, setCommentData] = useState({
        body:'',
        user_id: user.id,
        review_id: review.id
    })
    const [thisReview, setThisReview] = useState([])
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        reviews.map((review) => review.id === review_id ? setThisReview(review.comments) : null)
        // if(updatedComment !== {}) {
        //     setThisReview([...thisReview, updatedComment])
        // }
    },[reviews, review_id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setCommentData({ ...commentData, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        }).then((r) => {
            if (r.ok) {
                r.json().then((comment) => {
                    addNewComment(comment)
                    setCommentData({ ...commentData, body:'' })
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }
    
    
    return(
        <div className="page-wrapper" id="wrapper">
            <div className="card-body review-wrapper">
                <h1>{review.title}</h1>
                <div>
                    <h5>Rating: {review.rating}</h5>
                    <h5>Brand: {review.brand.name}</h5>
                    <h5>Category: {review.category.name}</h5> 
                    <h5>Price: ${review.price}</h5> 
                    <h5>Recommend? {review.recommend}</h5> 
                </div>
                <div id="review-wrapper">
                    <div>
                        <h5>Review</h5>
                        <img className="mb-3 review_image" src={review.image_url} alt={review.fileName} />
                        <p className="review_desc">{review.description}</p>
                    </div>
                </div>
                <div className="line"></div>
                <form id="form" onSubmit={handleSubmit}>
                    {errors?errors.map(e => <div style={{color:'red'}}>{e}</div>):null}
                    <div className="mb-3">
                        <div className="mb-3">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Add a comment..." value={commentData.body} name="body" onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Post Comment</button>
                </form>
                <div id="comments">
                    {thisReview.map((comment) => 
                        <div className="card" id="comments-wrapper" key={comment.id}>
                            <div className="card-header">
                                {comment.user.username}
                            </div>
                            <div className="card-body">
                                <p key={comment.id} className="card-text">
                                    {comment.body}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Details