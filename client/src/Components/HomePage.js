import React from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import logo from '../logo.svg'
import "../CSS/HomePage.css"
import Graph from "./Graph"
import WindowDimensions from "../WindowDimensions"

export default ({ onStartButton, onDEBUG }) => {

  const myWindow = WindowDimensions()

  return (
    <div style={{
      flex: 1
    }}>
      <h1 className="App-title">Principle Politics</h1>
      <Container style={{ padding: "10%" }}>
        <Graph
          size={myWindow.height * 0.3}
          points={
            [
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: -1 },
              { x: 1, y: 0 },
              { x: 1, y: 1 },
              { x: 1, y: -1 },
              { x: -1, y: 0 },
              { x: -1, y: 1 },
              { x: -1, y: -1 },
            ]
          }
        />
      </Container>
      <Button variant="info" size="lg" onClick={onStartButton}>Start</Button>
      <Button size="lg" onClick={onDEBUG}>DEBUG-SP</Button>
      <p>Text text text text text text</p>
    </div >
  )
}