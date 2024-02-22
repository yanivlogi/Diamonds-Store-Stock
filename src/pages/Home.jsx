import React from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox"; // Import the ChatBox component
import SomePosts from "../components/SomePosts"; // Import the ChatBox component
import homeImage from "../uploads/logo.png";

const Home = () => {
  
  return (
    <div className="container mt-5" >
      <div className="row" style={{direction:'rtl', backgroundColor:"white", padding:'20px', border:"thick double #9e861c"}}>
        <div className="col-md-6" >
          <div>
            <h1 className="display-4">Eliyahu Hanavi Diamonds</h1>
            <p className="lead" style={{ direction: "rtl" }}>
            ברוכים הבאים לאתר התכשיטים המקצועי! כאן תמצאו מגוון רחב של תכשיטי זהב ויהלומים, מיוצרים מחומרים איכותיים. התכשיטים כוללים טבעות, שרשראות, צמידים, ועגילים. כל פריט מלווה בתיאור מפורט, כולל מידות, חומרים וסוגי יהלומים. התמונות האיכותיות מציגות את התכשיטים מכל זווית. אנחנו מתחייבים למראה מקצועי ולשירות מותאם אישית. נשמח לעמוד לרשותך!
            </p>
            <div className="justify-content-center" style={{padding:'30px', margin:"10px"}}>
              <Link to="/AllPosts" className="btn btn-dark" style={{padding:'10px', margin:"5px", minWidth:"150px"}} >
                מעבר לסטוק
              </Link>
              <Link to="/addPost" className="btn btn-dark" style={{padding:'10px', margin:"5px", minWidth:"150px"}} >
                פרסם מוצר חדש
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <img style={{marginTop:"50px"}}
              src={homeImage}
              alt="Cute animals"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Home;
