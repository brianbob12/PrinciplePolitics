import React from "react"
import Button from "react-bootstrap/Button"
import logo from '../logo.svg'
import "../CSS/HomePage.css"

export default ({ onStartButton, onDEBUG }) => {

  return (
    <div style={{
      flex: 1
    }}>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
      <Button variant="info" size="lg" onClick={onStartButton}>start</Button>
      <Button size="lg" onClick={onDEBUG}>DEBUG-SP</Button>
    </div >
  )
}