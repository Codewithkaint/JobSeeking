import React, { useState, useEffect, useContext } from "react"
import { Context } from "../../main"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios.get("http://localhost:3000/api/v1/job/getAll", { withCredentials: true }).then(res => {
        setJobs(res.data);
      })

    }
    catch (err) {
      console.log(err)
    }
  }, []);
  if (!isAuthorized) {
    navigateTo('/login');
  }

  return (
    <>
      <div className="jobs page">
        <div className="container">
          <h1>All available jobs</h1>
          <div className="banner">
            {
              jobs.jobs && jobs.jobs.map((ele) => {
                return (
                  <div className="card" key={ele._id}>
                    <p>{ele.title}</p>
                    <p>{ele.category}</p>
                    <p>{ele.country}</p>
                    <Link to={`/job/${ele._id}`}>Job Details</Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Jobs;