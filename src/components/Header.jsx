import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import logo from "../uploads/logo.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [server_url] = useState(process.env.REACT_APP_SERVER_URL);


  useEffect(() => {
    changeHeader();
    fetchUnreadMessageCount();
  }, []);

  const changeHeader = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return setIsLoggedIn(false); // add check for token existence
      const response = await axios.get(`${server_url}/Header`, {
        headers: { Authorization: token },
      });
      console.log(response.data);
      setIsLoggedIn(true);
      setUser(response.data.data);
      setImage(response.data.data.image);
      // response.data.data contains the user name
    } catch (error) {
      console.error(error);
    }
  };

  
  const fetchUnreadMessageCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`${server_url}/unreadMessageCount`, {
        headers: { Authorization: token },
      });
      setUnreadMessageCount(response.data.count);
    } catch (error) {
      console.error('Error fetching unread message count:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload(true);
  };

  return (
    <header style={{marginBottom:'80px'}}>
    <Navbar variant="dark" expand="lg" fixed="top" style={{backgroundImage:"url(https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" , backgroundSize:'cover', backgroundPosition:'center' ,textAlign:'center'}}>
      <Container>
        <Navbar.Brand className="d-flex align-items-center justify-content-center">
          <a href="/" className="d-flex align-items-center" style={{ textDecoration: 'none' }}>
            <img 
              src={logo}
              alt="Logo"
              
              style={{ height:'100px',position:'relative',backgroundColor:'white', borderStyle:'solid' ,borderColor:'#9e861c', borderRadius:'30%', marginRight:'10px' }}
            />
            <span style={{ fontSize: '20px', fontWeight: 'bold' , color:'white'}}>Eliyahu Hanavi Stock</span>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="/AboutUs">עלינו</Nav.Link>
              <Nav.Link href="/ContactUs">צור קשר</Nav.Link>
              <Nav.Link href="/AdoptedPosts">העלאת תכשיט חדש</Nav.Link>
              <Nav.Link href="/AllPosts">כל התכשיטים</Nav.Link>
            </Nav>
            <Nav className="ms-auto mb-2 mb-lg-0">
              {!isLoggedIn ? (
                <>
                  <Nav.Link href="/confirm-registration">בדיקה</Nav.Link>
                  <Nav.Link href="/register">הרשמה</Nav.Link>
                  <Nav.Link href="/userLogin">התחבר/י</Nav.Link>
                </>
              ) : (
                <>
                {user.isAdmin &&(
                  <Nav.Link href="/WaitingPosts">אישור פוסטים</Nav.Link>
                )}
                  
                  <Nav.Link onClick={handleLogout}>התנתק/י</Nav.Link>
                  <Nav.Link href="/Profile">הפרופיל שלי</Nav.Link>
                  <Nav.Link href="/MyPosts">הפוסטים שלי</Nav.Link>
                  <Nav.Link href="/AllMessages">
                    {unreadMessageCount > 0 && (
                      <span className="badge bg-danger">{unreadMessageCount}</span>
                    )}
                    <span className="large ml">הודעות</span>
                  </Nav.Link>
                  <Nav.Link disabled>ברוך הבא ,{user.name}</Nav.Link>
                  <img
                    src={`${server_url}/${image}`}
                    alt="Logo"
                    className="mr-2 rounded-circle"
                    style={{ width: "45px", borderStyle: 'double', borderColor: 'white' }}
                  />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        
        
    </header>
  );
};

export default Header;
