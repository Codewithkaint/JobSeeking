import React, { useContext, useState } from "react"
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const Postjob = () => {
  const [title, setTitle] = useState("");
  const [descritption , setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const {isAuthorized, user} = useContext(Context);


  const handleJobPost = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/v1/job/postJob", { descritption ,title, category, location, salary }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },

    }).then(res => toast.success(res.data.message)).catch((err) => {
      toast.error(err.response.data.message);
    });

  };
  const navigateTo = useNavigate();
  if (!isAuthorized) {
    navigateTo('/login');
  }

  if (user && user.role === "Job Seeker") {
    navigateTo('/');
  }
  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>Post New Job</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>



            </div>


            <div className="wrapper">
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Job Location" />
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Job Salary" />
            </div>

            <textarea rows="10" value={descritption } onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Self Description"></textarea>

            <button type="submit">Create Job</button>

          </form>
        </div>
      </div>

    </>
  )
}

export default Postjob;