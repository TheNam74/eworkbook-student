import React, { useEffect } from 'react'

function PageNotFound() {
  useEffect(() => {
    document.title = "eWorkbook - Page not found"
  })
  return (
    <div className="page-not-found" style={{ textAlign: "center" }}>
      <h1><b style={{ fontSize: "80px", fontFamily: "monospace", textShadow: "#ff6666" }}>404</b></h1>
      <img style={{ width: "30%", borderRadius: "20px" }} src="/assets/images/404.png" alt="404" />
      <div style={{ height: "10px" }} />
      <i style={{ fontSize: "20px", fontFamily: "monospace" }}>page not found :(</i>
      <br />
      <i style={{ fontSize: "10px", fontFamily: "monospace" }}>but do not worry, all your data is save!</i>
      <div style={{ height: "80px" }} />
    </div>
  )
}

export default PageNotFound
