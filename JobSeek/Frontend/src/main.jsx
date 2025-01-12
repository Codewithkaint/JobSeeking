import React, { createContext, useState } from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'


export const Context=createContext({isAuthorized:false});

const AppWrap=()=>{
  const [isAuthorized,setisAuthorized]=useState(false);
  const [user,setUser]=useState({});
  return (
    <Context.Provider value={{isAuthorized, setisAuthorized, user, setUser}}>
      <App></App>
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppWrap />
  
)
