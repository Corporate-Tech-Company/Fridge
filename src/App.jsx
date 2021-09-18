import React, { useState, useEffect } from 'react'
import './app.scss'

function App() {



  useEffect(() => {
    fetch('/wasted')
      .then(res => res.json())
      .then(stuff => console.log(stuff));
  }, [])


  return (
    <div className="test">
      Hello World
    </div>
  )
}

export default App


