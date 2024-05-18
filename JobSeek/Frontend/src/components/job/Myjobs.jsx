import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';


const MyJobs = () => {

  const [myJobs, setmyJobs] = useState([]);
  const [editingMode, seteditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/job/getJob", { withCredentials: true });
        setmyJobs(data.myJobs);
        console.log(data.myJobs)

      }

      catch (err) {
        toast.error(err.response.data.message)
      }
    };
    fetchJob();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    seteditingMode(jobId);
  }

  const handleDisableEdit = () => {
    seteditingMode(null);
  }

  const handleUpdateJob = async (jobId) => {
    const updateJob = myJobs.find(job => job._id === jobId);
    await axios.put(`http://localhost:3000/api/v1/job/updateJob/${jobId}`, updateJob, { withCredentials: true }).then((res) => {
      toast.success(res.data.message);
      seteditingMode(null);
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  const handleDeleteJob = async (jobId) => {
    await axios.delete(`http://localhost:3000/api/v1/job/deleteJob/${jobId}`, { withCredentials: true }).then(res => {
      toast.success(res.data.message);
      setmyJobs(prevJobs => prevJobs.filter(job => job._id !== jobId))
    }).catch(err => {
      toast.error(err.response.data.message)
    })
  };

  const handleInputChange = (jobId, field, value) => {

    setmyJobs((prevJobs) => 
      prevJobs.map((job) => 
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };



console.log(editingMode)


  return (

    <div className="myJobs page">
      <div className="container">
        <h3>Your Posted Jobs</h3>
        {myJobs.length > 0 ? (
          <>
            <div className="banner">
              {myJobs.map((ele) => (
                <div className="card" key={ele._id}>
                  <div key={ele._id} className="content">
                    <div className="short_fields">
                      <div>
                        <span>Title:</span>
                        <input
                          type="text"
                          disabled={editingMode !== ele._id}
                          value={ele.title}
                          onChange={(e) =>
                            handleInputChange(ele._id, 'title', e.target.value)
                          }
                        />
                      </div>
                      
                      <div>
                        <span>Category:</span>
                        <select
                          value={ele.category}
                          onChange={(e) =>
                            handleInputChange(ele._id, 'category', e.target.value)
                          }
                          disabled={editingMode !== ele._id}
                        >
                          <option value="">Select Category</option>
                          <option value="Graphics & Design">Graphics & Design</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Frontend Web Development">Frontend Web Development</option>
                          <option value="MERN Stack Development">MERN STACK Development</option>
                          <option value="Account & Finance">Account & Finance</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Video Animation">Video Animation</option>
                          <option value="MEAN Stack Development">MEAN STACK Development</option>
                          <option value="MEVN Stack Development">MEVN STACK Development</option>
                          <option value="Data Entry Operator">Data Entry Operator</option>
                        </select>
                      </div>
                      <div>
                        <span>Salary:</span>
                        <input
                          type="number"
                          disabled={editingMode !== ele._id}
                          value={ele.salary}
                          onChange={(e) =>
                            handleInputChange(ele._id, 'salary', e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <span>Expired:</span>
                        <select
                          value={ele.expired}
                          onChange={(e) =>
                            handleInputChange(ele._id, 'expired', e.target.value)
                          }
                          disabled={
                            editingMode !== ele._id ? true : false
                          }
                        >
                          <option value={true}>True</option>
                          <option value={false}>False</option>
                        </select>
                      </div>
                    </div>
                    <div className="long_field">
                      <div>


                        <span>
                          Description:
                        </span>
                        <textarea rows="5" value={ele.descritption} disabled={
                          editingMode !== ele._id ? true : false
                        } onChange={(e) =>
                          handleInputChange(ele._id, 'descritption', e.target.value)
                        }></textarea>
                      </div>
                      <div>


                        <span>
                          Location:
                        </span>
                        <textarea rows="5" value={ele.location} disabled={
                          editingMode !== ele._id ? true : false
                        } onChange={(e) =>
                          handleInputChange(ele._id, 'location', e.target.value)
                        }></textarea>
                      </div>

                    </div>



                  </div>
                  <div className="button_wrapper">
                    <div className="edit_btn_wrapper">
                      {
                        editingMode === ele._id ? (
                          <>
                            <button onClick={() => handleUpdateJob(ele._id)} className='check_btn'><FaCheck /></button>
                            <button onClick={() => handleDisableEdit()} className='check_btn'><RxCross2 /></button>
                          </>
                        ) : (
                          <button onClick={() => handleEnableEdit(ele._id)} className='edit_btn' >
                            Edit </button>
                        )
                      }
                    </div>
                    <button onClick={() => handleDeleteJob(ele._id)} className='delete_btn'>
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </>
        ) : (
          <p>You have not posted any job</p>
        )}
      </div>
    </div>

  )
}

export default MyJobs;