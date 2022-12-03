import { useState } from 'react'
import './styles/myComments.css'

function MyComments({ user, myComments, onUpdateComment, onDeleteComment }) {
    const [commentData, setCommentData] = useState({
        id:'',
        body:'',
        user_id: user.id,
        review_id: ''
    })
    const [startEditing, setStartEditting] = useState({
        active: false,
        comment_id:''
    })
    
    function handleEdit(comment){
        setCommentData({ ...commentData, 'review_id': comment.review.id , 'id': comment.id})
        setStartEditting({
            active: true,
            comment_id: comment.id
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        
        const { name, value } = e.target
        setCommentData({ ...commentData, [name]: value })
        
        fetch(`/comments/${commentData.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify(commentData),
        })
        .then((r)=> r.json())
        .then(onUpdateComment)

        setCommentData({
            id:'',
            body:'',
            user_id: user.id,
            review_id: ''
        })
        setStartEditting({
            active: false,
            review_id:''
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setCommentData({ ...commentData, [name]: value })
    }

    function handleCancel(){
        setCommentData({
            body:'',
            user_id: user.id,
            review_id: ''
        })
        setStartEditting(!startEditing)
    }

    function onClickDeleteComment(comment) {
        fetch(`/comments/${comment.id}`, {
          method: "DELETE",
        }).then(() => (onDeleteComment(comment)));
      }

    return(
        <div>
            <div className="line"></div>
            <h2>My Comments</h2>
            <div className="comments-wrapper">
                {myComments.map((comment) => (
                    <div className="card text-bg-light mb-3 comment-card" key={comment.id}>
                        <div className="card-header">{comment.review.title}</div>
                        {
                            startEditing.active && startEditing.comment_id === comment.id ? <form id="comment-form" onSubmit={handleSubmit}>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Edit comment..." value={commentData.body} name="body" onChange={handleChange}></textarea>
                            </form>
                            : <div className="card-body">{comment.body}</div>
                        
                        }
                        <div className="card-footer bg-transparent">
                            {
                                startEditing.active && startEditing.comment_id === comment.id ? 
                                <button type="button" name="submit" className="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button> 
                                : <button type="button" name="edit" className="btn btn-secondary btn-sm" onClick={() => handleEdit(comment)} data-id={comment.review.id}>Edit</button> 
                            }

                            { 
                                startEditing.active && startEditing.comment_id === comment.id ?
                                <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                                :
                                <button type="button" className="btn btn-danger btn-sm"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => onClickDeleteComment(comment)}>Delete Comment</button>
                                
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyComments