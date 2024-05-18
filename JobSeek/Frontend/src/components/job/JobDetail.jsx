import React, { useContext, useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import { Link, useNavigate, useParams } from "react-router-dom";

const JobDetail=()=>{
  const {id}=useParams();
  const[job,setJob]=useState({});
  const navigetTo=useNavigate();
  const {isAuthorized,user}=useContext(Context);
  const navigateTo = useNavigate();
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/job/${id}`,{withCredentials:true}).then(res=>{
      setJob(res.data.job);
    })
    .catch((err)=>{
      navigateTo("/notfound");
    })
  })

  if(!isAuthorized){
    navigetTo('/login')
  }


  return (
    <>
    <div className="jobDetail page">
      <div className="container">
        <h3>Job Detail</h3>
        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Discription: <span>{job.descritption}</span>
          </p>
          <p>
            Salary: <span>{job.salary}</span>
          </p>
          <p>
            {
              user && user.role==="Employer" ? <></>:<Link to={`/application/${job._id}`}>Apply Now</Link>

            }
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default JobDetail;