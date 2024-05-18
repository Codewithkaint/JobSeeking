import React from "react"
import { MdFindInPage } from "react-icons/md";
import {IoMdSend} from 'react-icons/io';
import { FaUserPlus } from "react-icons/fa";

const HowItWork=()=>{
  return (
    <>
    <div className="howitworks">
      <div className="container">
        <h3>How JobPao Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus></FaUserPlus>
            <p>Create Account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, amet.</p>

          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find a Job/ Post Job</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, amet.</p>

          </div>
          <div className="card">
            <IoMdSend />
            <p>Create Account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, amet.</p>

          </div>

          


        </div>
      </div>
    </div>
    </>
  )
}

export default HowItWork;