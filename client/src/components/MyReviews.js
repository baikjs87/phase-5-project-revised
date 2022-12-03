import { useState } from "react"
import './styles/myReviews.css'

function MyReviews({ myReviews, user, onUpdateReview, onDeleteReview }) {
    const [startEditing, setStartEditting] = useState({
        active: false,
        review_id:''
    })
    const [reviewData, setReviewData] = useState({
        id:'',
        description:'',
        user_id: user.id
    })
    const [errors, setErrors] = useState([])


    function handleSubmit(e){
        e.preventDefault()
        
        const { name, value } = e.target
        setReviewData({ ...reviewData, [name]: value })
        // console.log(reviewData)
        fetch(`/reviews/${reviewData.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify(reviewData),
        })
        .then((r)=> r.json())
        .then(onUpdateReview)

        setReviewData({
            id:'',
            description:'',
            user_id: user.id
        })
        setStartEditting({
            active: false,
            review_id:''
        })
    }

    function handleEdit(review){
        setReviewData({ ...reviewData, 'review_id': review.id , 'id': review.id})
        setStartEditting({
            active: true,
            review_id: review.id
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setReviewData({ ...reviewData, [name]: value })
    }

    function handleCancel(){
        setReviewData({
            body:'',
            user_id: user.id,
            review_id: ''
        })
        setStartEditting(!startEditing)
    }

    function onClickDeleteReview(review) {
        fetch(`/reviews/${review.id}`, {
          method: "DELETE",
        }).then((r) => {
            if (r.ok) {
            onDeleteReview(review);
            } else {
                r.json().then(json => setErrors(json.error))
            }
        });
      }

    return(
        <div>
            <div className="line"></div>
            <h2 className="page-name">My Reviews</h2>
            <div className="row row-cols-1 row-cols-md-1 g-5 reviews-wrapper" data-masonry='{"percentPosition": true }'>
            {errors?<div style={{color:'red'}}>{errors}</div>:null}
                {myReviews.map((review) => (
                    <div className="card reviews-card" key={review.id}>
                        <h3 className="card-header">{review.title}</h3>
                            <div className="card-body">
                                <div className="review-details">
                                    <img src={review.image_url} className="review-image" />
                                    <div className="review-details-2">
                                        <h5>Rating: {review.rating}</h5>
                                        <h5>Brand: {review.brand.name}</h5>
                                        <h5>Category: {review.category.name}</h5> 
                                        <h5>Price: ${review.price}</h5> 
                                        <h5>Recommend? {review.recommend}</h5> 
                                    </div>
                                </div>
                                <div className="line"></div>
                                <div className="review-wrapper">
                                    <div>
                                        <h5>Review</h5>
                                        {
                                            startEditing.active && startEditing.review_id === review.id ? <form id="review-form" onSubmit={handleSubmit}>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Edit review..." value={reviewData.description} name="description" onChange={handleChange}></textarea>
                                            </form> : <p>{review.description}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        <div className="card-footer bg-transparent">
                            {
                                startEditing.active && startEditing.review_id === review.id ? 
                                <button type="button" name="submit" className="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button> 
                                : <button type="button" name="edit" className="btn btn-secondary btn-sm" onClick={() => handleEdit(review)} data-id={review.id}>Edit</button> 
                            }

                            { 
                                startEditing.active && startEditing.review_id === review.id ?
                                <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                                :
                                <button type="button" className="btn btn-danger btn-sm"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => onClickDeleteReview(review)}>Delete Review</button>
                                
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyReviews