import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { categoryList } from "../js/categoryList.js";
import { ringSizeList } from "../js/ringSizeList.js";
import { stoneColorList } from "../js/stoneColorList.js";
import { stonsList } from "../js/stonsList.js";
import { necklaceLengthList } from "../js/necklaceLengthList.js";

import "../css/imageCss.css";
import "../css/AddPost.css";


const AddPost = () => {


  const handleAddPost = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
  };

  const navigate = useNavigate();

  const [upc, setUpc] = useState("");
  const [name, setName] = useState("");
  const [total_diamonds_weight, setTotal_diamonds_weight] = useState();
  const [main_diamond_clean, setMain_diamond_clean] = useState("VS");
  const [main_diamond_color, setMain_diamond_color] = useState("D-E-F");
  const [gold_weight, setGold_weight] = useState();
  const [main_diamonds_shape, setMain_diamonds_shape] = useState([]);
  const [side_diamond_shape, setSide_diamond_shape] = useState([]);
  const [total_main_diamonds_weight, setTotal_main_diamonds_weight] = useState();
  const [side_diamonds_amount, setSide_diamonds_amount] = useState();
  const [categoryValue, setCategoryValue] = useState(""); // Rename state variable to avoid naming conflict
  const [ringSize, setRingSize] = useState(); 
  const [necklaceLength, setNecklaceLength] = useState(""); 
  const [wholesalePrice, setWholesalePrice] = useState(); 
  const [privatePrice, setPrivatePrice] = useState(); 
  const [description, setDescription] = useState("");
  
  const [images, setImages] = useState([]);
  
  
  
  const [isDragging, setIsDragging] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [server_url] = useState(process.env.REACT_APP_SERVER_URL);

  const AddPost = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("upc", upc);
    formData.append("name", name);
    formData.append("total_diamonds_weight", total_diamonds_weight);
    formData.append("main_diamond_clean", main_diamond_clean);
    formData.append("main_diamond_color", main_diamond_color);
    formData.append("gold_weight", gold_weight);
    formData.append("main_diamonds_shape", main_diamonds_shape);
    formData.append("side_diamond_shape", side_diamond_shape);
    formData.append("total_main_diamonds_weight", total_main_diamonds_weight);
    formData.append("side_diamonds_amount", side_diamonds_amount);
    formData.append("categoryValue", categoryValue);
    formData.append("ringSize", ringSize);
    formData.append("necklaceLength", necklaceLength);
    formData.append("wholesalePrice", wholesalePrice);
    formData.append("privatePrice", privatePrice);
    formData.append("description", description);
    
    formData.append("userId", userId);
    // Append each image file separately
    images.forEach((image) => {
      formData.append("image[]", image);
    });

    try {
      // await axios.post(`${server_url}/posts`, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleUploadClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImages = Array.from(e.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...droppedImages]);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };


  return (

    <div className="container my-5 add-post">
      <div className="row" id="add-post-row">

        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4" >הוסף תכשיט</h1>
              <form onSubmit={AddPost}>

                <div className="form-group" >
                  <label htmlFor="name">מק"ט</label>
                  <input
                    type="text"
                    className="form-control"
                    id="upc"
                    value={upc}
                    onChange={(e) => setUpc(e.target.value)}
                    placeholder='הזן מק"ט'
                    required
                  />

                </div>

                <div className="form-group" >
                  <label htmlFor="name">שם המוצר</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="הזן שם"
                    required
                  />

                </div>

                <div className="form-group">
                  <label htmlFor="category">קטגוריה</label>
                  <select
                    className="form-control"
                    id="category"
                    value={categoryValue} // Use selectedCategory instead of category
                    onChange={(e) => setCategoryValue(e.target.value)} // Update selectedCategory instead of category
                    required
                  >
                    <option value="">בחר קטגוריה</option>
                    {categoryList.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                    <label htmlFor="type">מידת טבעת</label>

                    <select
                      className="form-control"
                      id="ringSize"
                      value={ringSize}
                      onChange={(e) => setRingSize(e.target.value)}
                      
                    >
                      <option value="">Select type</option>
                      {ringSizeList.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="type">אורך שרשרת</label>

                    <select
                      className="form-control"
                      id="necklaceLength"
                      value={necklaceLength}
                      onChange={(e) => setNecklaceLength(e.target.value)}
                      
                    >
                      <option value="">Select type</option>
                      {necklaceLengthList.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                <div className="form-group" >
                  <label htmlFor="name">משקל קראט כולל</label>
                  <input
                    type="number"
                    className="form-control"
                    id="total_diamonds_weight"
                    value={total_diamonds_weight}
                    onChange={(e) => setTotal_diamonds_weight(e.target.value)}
                    placeholder="בחר קראט"
                    required
                  />

                </div>


                <div className="form-group" >
                  <label htmlFor="name">רמת נקיון אבן</label>
                  <input
                    type="text"
                    className="form-control"
                    id="main_diamond_clean"
                    value={main_diamond_clean}
                    onChange={(e) => setMain_diamond_clean(e.target.value)}
                    placeholder="בחר רמת נקיון"
                    required
                  />

                </div>

                <div className="form-group" >
                  <label htmlFor="name">צבע אבן</label>
                  <input
                    type="text"
                    className="form-control"
                    id="main_diamond_color"
                    value={main_diamond_color}
                    onChange={(e) => setMain_diamond_color(e.target.value)}
                    placeholder="בחר צבע אבן"
                    
                  />

                </div>

                <div className="form-group" >
                  <label htmlFor="name">משקל זהב</label>
                  <input
                    type="number"
                    className="form-control"
                    id="gold_weight"
                    value={gold_weight}
                    onChange={(e) => setGold_weight(e.target.value)}
                    placeholder="בחר משקל זהב (בגרמים)"
                    required
                  />

                </div>
                  
                
<div className="form-group">
  <label>צורת אבן ראשית</label>
  <div>
    {stonsList.map((type) => (
      <label key={type} className="checkbox-container">
        <input
          type="checkbox"
          className="checkbox-input"
          value={type}
          checked={main_diamonds_shape.includes(type)}
          onChange={(e) => {
            if (e.target.checked) {
              setMain_diamonds_shape([...main_diamonds_shape, type]);
            } else {
              setMain_diamonds_shape(main_diamonds_shape.filter((shape) => shape !== type));
            }
          }}
        />
        <span className="checkbox-checkmark"></span>
        {type}
      </label>
    ))}
  </div>
</div>


<div className="form-group">
  <label>צורת אבני צד</label>
  <div>
    {stonsList.map((type) => (
      <label key={type} className="checkbox-container">
        <input
          type="checkbox"
          className="checkbox-input"
          value={type}
          checked={side_diamond_shape.includes(type)}
          onChange={(e) => {
            if (e.target.checked) {
              setSide_diamond_shape([...side_diamond_shape, type]);
            } else {
              setSide_diamond_shape(side_diamond_shape.filter((shape) => shape !== type));
            }
          }}
        />
        <span className="checkbox-checkmark"></span>
        {type}
      </label>
    ))}
  </div>
</div>

<div className="form-group" >
                  <label htmlFor="name">משקל יהלומי צד</label>
                  <input
                    type="number"
                    className="form-control"
                    id="total_main_diamonds_weight"
                    value={total_main_diamonds_weight}
                    onChange={(e) => setTotal_main_diamonds_weight(e.target.value)}
                    placeholder="בחר קראט"
                    
                  />

                </div>


                <div className="form-group" >
                  <label htmlFor="name">כמות יהלומי צד</label>
                  <input
                    type="number"
                    className="form-control"
                    id="side_diamonds_amount"
                    value={side_diamonds_amount}
                    onChange={(e) => setSide_diamonds_amount(e.target.value)}
                    placeholder="בחר קראט"
                    
                  />

                </div>

                <div className="form-group" >
                <label htmlFor="name">מחיר ללקוח פרטי</label>
                 
                  <input
                    type="number"
                    className="form-control"
                    id="privatePrice"
                    value={privatePrice}
                    onChange={(e) => setPrivatePrice(e.target.value)}
                    placeholder="הזן מחיר"
                    required
                  />

                </div>

                <div className="form-group" >
                <label htmlFor="name">מחיר לחנויות</label>
                  <input
                    type="number"
                    className="form-control"
                    id="wholesalePrice"
                    value={wholesalePrice}
                    onChange={(e) => setWholesalePrice(e.target.value)}
                    placeholder="הזן מחיר"
                    required
                  />

                </div>
                <div className="form-group">
                    <label htmlFor="description">תיאור המוצר</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="תאר את המוצר..."
                      
                    />
                  </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <small className="text-muted">
                      (You can select multiple images)
                    </small>
                    <div
                      className={`input-group mb-3 ${isDragging ? "dragging" : ""
                        }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="imageInput"
                          onChange={handleImageChange}
                          multiple
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="image"
                          onClick={handleUploadClick}
                        >
                          {isDragging
                            ? "Drop image here 🔽"
                            : images.length === 0
                              ? "Choose file 🖼"
                              : "Upload more files ➕"}
                        </label>
                      </div>
                    </div>
                    {images.length > 0 && (
                      <div className="image-preview">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="image-item position-relative"
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Image ${index + 1}`}
                              className="preview-image img-thumbnail"
                              style={{ width: "200px" }}
                            />
                            <button
                              className="remove-button"
                              onClick={() => removeImage(index)}
                            >
                              <span
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                }}
                              >
                                ✖
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                  >
                    פרסם מוצר
                  </button>

              </form>
            </div>
          </div>



        </div>

      </div>

    </div>



  )

}
export default AddPost;