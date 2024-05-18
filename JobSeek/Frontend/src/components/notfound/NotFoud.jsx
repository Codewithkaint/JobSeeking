import React from "react"

const NotFound=()=>{
  return (
    <section className="page notfound">
        <div className="content">
          <img src="/notfound.png" alt="Logo" srcset="" />
          <Link to={"/"}>Return to Home</Link>
        </div>
    </section>
  )
}

export default NotFound;