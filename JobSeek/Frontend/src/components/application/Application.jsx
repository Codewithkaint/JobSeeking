import React, { useState,useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import toast from 'react-hot-toast';
import axios from 'axios';


const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [address, setaddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume)
  }

  const { id } = useParams();


  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resume);
    formData.append('jobId', id);
    try {
      const { data } = await axios.post("http://localhost:3000/api/v1/application/postJob", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }

      })
      console.log(data)
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setaddress("");
      setResume(null);
      toast.success(data.message);
  
      navigateTo("/job");


    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong!");
    }

  };

  if (!isAuthorized || user && user.role === 'Employer') {
    navigateTo("")
  }










  return (
    <>
      <section className="application">
        <div className="container">
          <h3>Application Form</h3>
          <form onSubmit={handleApplication}>
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="number" placeholder="Your Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="text" placeholder="Your address" value={address} onChange={(e) => setaddress(e.target.value)} />

            <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Cover Letter"></textarea>
            <div >
              <label style={{
                textAlign: "start",
                displat: "block",
                fontSize: "20px"
              }}>
                Select Resume
              </label>
              <input type="file" accept=".jpeg, .png, .webp" onChange={handleFileChange} style={{ width: "100%" }} />
              <button type="submit">Send Application</button>

            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Application;