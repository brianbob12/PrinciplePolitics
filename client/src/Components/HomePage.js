import React from "react"
import Button from "react-bootstrap/Button"
import logo from '../logo.svg'
import "../CSS/HomePage.css"

export default ({ onStartButton }) => {

  return (
    <div style={{
      flex: 1
    }}>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
      <Button variant="primary" size="lg" onClick={onStartButton}>start</Button>
    </div >
  )
}