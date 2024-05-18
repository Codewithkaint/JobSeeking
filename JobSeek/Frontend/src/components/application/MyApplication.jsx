import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from 'react-hot-toast';
import axios from 'axios';
import ResumeModel from './ResumeModel';

const MyApplication = () => {

  const [application, setApplication] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeURL, setResumeURL] = useState("");
  const { user, isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        console.log(user.role)
        axios.get("http://localhost:3000/api/v1/application/employ", { withCredentials: true }).then((res) => {
        
         
          setApplication(res.data.application);
        })
        // console.log(application)
      }
      else {
        axios.get("http://localhost:3000/api/v1/application/jobs", { withCredentials: true }).then((res) => {
          setApplication(res.data.application);
       
        })
      }
    }
    catch (err) {
      toast.error(err.response.data.message)
    }

  }, [isAuthorized])

  if (!isAuthorized) {
    navigateTo('/login')
  }
  console.log(application)

  const deleteApplication = async(id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/application/delete/${id}`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          setApplication(prevApps => {
            prevApps.filter(apps => apps._id !== id)
          })
        });
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  const openModal = (imageUrl) => {

    setResumeURL(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  }





  return (

    <section className="my_applications page">
      {
        user && user.role === "Job Seeker" ? (
          <div className="container">
            <h1>My Application</h1>

            {application && application.length > 0 ? (
              application.map(ele => (
                <JobSeekerCard element={ele} key={ele._id} deleteApplication={deleteApplication} openModal={openModal}></JobSeekerCard>

              ))) : (
              <h2>No appication Found</h2>
            )
            }

          </div>
        ) :
          (
            <div className="container">
              <h1>My Application</h1>

              {application && application.length > 0 ? (
                
                application.map(ele => (
                  <EmployCard
                    element={ele}
                    key={ele._id}
                    openModal={openModal}
                  />
                ))
              ) : (
                <h2>No application Found</h2>
              )}
            </div>

          )
      }

      {
        modalOpen && (

          <ResumeModel imageUrl={resumeURL} onClose={closeModal} />
        )
      }


    </section>

  )
}

export default MyApplication;


const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  console.log(element)
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p><span>Name</span>
            {element.name}</p>
          <p><span>Email</span>
            {element.email}</p>
          <p><span>Phone</span>
            {element.phone}</p>
          <p><span>Address</span>
            {element.address}</p>
          <p><span>CoverLetter</span>
            {element.coverLetter}</p>

        </div>
        <div className="resume">
          <img src={element.resume.url} alt="Resume" onClick={() => openModal(element.resume.url)} />
        </div>

        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
        </div>
      </div>
    </>
  )
}

const EmployCard = (element, openModal) => {
console.log(element)
  return (
    <>

      <div className="detail">
        <p><span>Name</span>
          {" "}{element.element.name}</p>
        <p><span>Email</span>
        {" "}{element.element.email}</p>
        <p><span>Phone</span>
        {" "}{element.element.phone}</p>
        <p><span>Address</span>
           {" "}{element.element.address}</p>
        <p><span>CoverLetter</span>
          {" "}{element.element.coverLetter}</p>

      </div>
       <div className="resume">
          <img src={element.element.resume.url} alt="Resume" onClick={() => openModal(element.element.resume.url)} />
        </div> 







    </>
  )
}

