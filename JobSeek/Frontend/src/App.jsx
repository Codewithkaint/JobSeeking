import React,{useContext,useEffect,useState}from 'react'
import "./App.css";
import {Context} from './main';
import {BrowserRouter , Routes,Route} from 'react-router-dom';
import Home from "./components/home/Home" 
import Login from "./components/auth/Login" 
import Register from "./components/auth/Register"; 
import Navbar from "./components/layout/Navbar";
import Footer  from "./components/layout/Footer";
import Jobs from "./components/job/Jobs";
import JobDetails from "./components/job/JobDetail";
import MyJobs from "./components/job/Myjobs"
import PostJobs from './components/job/Postjob'; 
import Application from './components/application/Application';
import MyApplication from './components/application/MyApplication';
import NotFound from './components/notfound/NotFoud';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';





const App=()=>{

  const {isAuthorized,setisAuthorized,setUser}=useContext(Context);
 
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/getUser",
          {
            withCredentials: true,
          }
        );
        
        setUser(response.data.user);
        setisAuthorized(true);
      } catch (error) {
        setisAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);





  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplication />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;