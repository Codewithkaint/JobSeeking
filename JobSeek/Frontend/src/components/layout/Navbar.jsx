import React, { useState, useContext } from "react";
import { Context } from "../../main";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";



const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setisAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/logout", { withCredentials: true });
      console.log(response)
      toast.success(response.data.message);
      setisAuthorized(false);
      navigateTo("/login");
    }
    catch (err) {
      toast.error(err.response.data.message);
      setisAuthorized(true);
    }
  }

  return (
    
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="/jobW.png" alt="Image" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>Home</Link>
            </li>
            <li>
              <Link to={"/job"} onClick={() => setShow(false)}>All Jobs</Link>
            </li>
            <li>
              <Link to={"/applications/me"} onClick={() => setShow(false)}>{
                user && user.role === "Employer" ? "Application's Applications" : "My Application"}</Link>
            </li>
            {
              user && user.role === "Employer" ? (
                <>
                  <li>
                    <Link to={'/job/post'} onClick={() => setShow(false)}>Post new Jobs</Link>
                  </li>
               
              
                <li>
                  <Link to={'/job/me'} onClick={() => setShow(false)}>View Your Jobs</Link>
                </li>
              </>
            ) : (<></>)
            }
            <button onClick={handleLogout}>LogOut</button>


          </ul>
            <div className="hamburger">
              <GiHamburgerMenu onClick={()=>setShow(!show)}></GiHamburgerMenu>
            </div>
        </div>

      </nav>
    
  )
}
console.log("Navbar")
export default Navbar;