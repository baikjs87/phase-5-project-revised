import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/post.css'
 
function Post({ addReview, user }) {
    const [formData, setFormData] = useState({ user_id: user.id })
    const [errors, setErrors] = useState([])
    const [imageErrors, setImageErrors] = useState('')
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [imageFile, setImageFile] = useState({
        file: '',
        fileName: ''
    })
    const [showImage, setShowImage] = useState("");
    const [showImageError, setImageError] = useState("hidden");
    const LOCAL_RAILS_HOST = "http://localhost:3000/images";
    const REMOTE_HOST = LOCAL_RAILS_HOST;
    const redirect = useNavigate()
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
 
    const handleChangeBrand = (e) => {
        const brand = e.target.value.toUpperCase()
        setFormData({ ...formData, 'brand': brand })
    }
 
    const handleChangeCategory = (e) => {
        const category = e.target.value.toUpperCase()
        setFormData({ ...formData, 'category': category })
    }
    
    function onSubmit(e){
        e.preventDefault()
        let newData = {formData}
        
        if(formData.image_url){
            fetch('/brands',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({'brand': formData.brand})
            }).then(r => {
                r.json().then((newBrand) => {
                    setFormData({ ...formData, 'brand_id': newBrand.id })
                    newData = { ...formData, 'brand_id': newBrand.id }
     
                    fetch('/categories',{
                        method:'POST',
                        headers: {'Content-Type': 'application/json'},
                        body:JSON.stringify({'category': formData.category})
                    }).then(r => {
                        r.json().then((newCategory) => {
                            setFormData({ ...formData, 'category_id': newCategory.id })
                            newData = { ...newData, 'category_id': newCategory.id }
                            console.log(newData)
                            
                            fetch('/reviews',{
                                method:'POST',
                                headers: {'Content-Type': 'application/json'},
                                body:JSON.stringify(newData),
                            }).then(r => {
                                if(r.ok){
                                    r.json().then((newReview) => {
                                        console.log(newReview)
                                        addReview(newReview)
                                        redirect('/')
                                    })
                                } else {
                                    r.json().then((err) => setErrors(err.errors));
                                }
                            })
                        })
                    })
                })
            })
        } else {
            setImageError('')
            setTimeout(() => {
                setImageError('hidden')
              }, 5000);
        }
    }

    useEffect(() => {
        if(imageFile.file){
            let file = imageFile.file
            file = URL.createObjectURL(file)
            setShowImage(file);
            console.log(file)
        }
    },[imageFile.file])

    const onClickUpload = async(e) => {
        e.preventDefault()

        const newData = new FormData()
        newData.append('file', imageFile.file)
        newData.append('fileName', imageFile.file.name)
        console.log('imageFile ', imageFile) 

        const config = {
            method: "POST",
            headers: {"Access-Control-Allow-Origin":"*"},
            credentials: 'include',
            body: newData
        };

        let response = await fetch(REMOTE_HOST, config)
        response = await response.json()
        console.log('resp ',response)
        if(response.error){
            setImageErrors(response.error)
        } else if (response.id){
            setFormData({ ...formData, 'image_url': response.url})
            setImageError('hidden')
            setUploadSuccess(true)
            setTimeout(() => {
                setUploadSuccess(false)
              }, 3000);
        }
    }
 
    const onChangeFile = (e) => {
        const file = e.target.files[0]
        const fileName = file.name
        setImageFile({file, fileName})
    }
    
    return(
        <div className="post_wrapper">
            <h3 className="pagename">Post Reviews</h3>
            {errors?errors.map(e => <div style={{color:'red'}}>{e}</div>):null}
            <form onSubmit={(e) => onSubmit(e)}>
                <label className="form-label">Title </label>
                <input type='text' name='title' value={formData.title} onChange={handleChange} className="form-control" required/>
 
                <div className="brand-category">
                    <div className="col-sm-5 label">
                        <label className="form-label"> Brand</label>
                        <input type='text' name='brand' onChange={handleChangeBrand} className="form-control" required/>
                    </div>
 
                    <div className="col-sm-5 label category">
                        <label className="form-label"> Category</label>
                        <input type='text' name='category' onChange={handleChangeCategory} className="form-control" required/>
                    </div>
                </div>
           
                <div className="col-sm-5 label price-block">
                    <label className="form-label">Price</label>
                    <input type='number' name='price' value={formData.price} onChange={handleChange} className="form-control" />
                </div>
 
                <div className="input-group" onSubmit={onClickUpload}>
                    <input type="file" className="form-control" id="inputGroupFile04" onChange={onChangeFile} />
                    <button className="btn btn-outline-secondary" type="submit" id="inputGroupFileAddon04"  onClick={onClickUpload}>Upload</button>
                </div>
                {imageErrors? <div style={{color:'red'}}>{imageErrors}</div> : null}
                {uploadSuccess? <div className="alert alert-success" role="alert">An image has been successfully uploaded</div> : null}

                <div>
                    <img width="500px" src={showImage} alt={imageFile.fileName} />
                </div>
           
                <label className="label ">Rating</label>
                <div>
                    <span className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rating" id="inlineRadio1" value="1" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                    </span>
                    <span className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rating" id="inlineRadio2" value="2" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                    </span>
                    <span className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rating" id="inlineRadio3" value="3" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                    </span>
                    <span className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rating" id="inlineRadio4" value="4" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                    </span>
                    <span className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rating" id="inlineRadio5" value="5" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                    </span>            
                </div>
 
                <label className="label ">Recommend?</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="recommend" id="flexRadioDefault1" value="yes" onChange={handleChange} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Yes
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="recommend" id="flexRadioDefault2" value="no" onChange={handleChange} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        No
                    </label>
                </div>        
 
                <label className="label ">Description</label>
                <textarea type='text' rows='0' cols='80' name='description' value={formData.description} onChange={handleChange} className="form-control" required/>
                
                <div className="alert alert-warning" hidden={showImageError} id='warning' role="alert">
                    ⚠️ Please upload an image!
                </div>
                
                <input type='submit' value='Post Review' className="submit_button" />
                    
            </form>
            {errors?errors.map(e => <h2 style={{color:'red'}}>{e.toUpperCase()}</h2>):null}
        </div>
    )
}
 
export default Post

