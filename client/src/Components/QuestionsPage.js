import Button from "react-bootstrap/Button"
import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container"
import React from "react"
import WindowDimensions from "../WindowDimensions"
import Question from "./Question"

export default ({ onExit, onFinish }) => {
  const myWindow = WindowDimensions()
  return (
    <div style={{ flex: 1, height: myWindow.height, width: myWindow.width - 17 }}>
      {/*the height and width given are always a little too big. The adjustment is made to avoid the scrooly bar*/}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "100%",
          padding: "5%",
        }}
      >
        <Container fluid>
          <Carousel
            variant="dark"
            controls={true}
            indicators={true}
            interval={null}
          >
            <Carousel.Item>
              <Question questionName="my test question 1" />
            </Carousel.Item>
            <Carousel.Item>
              <Question questionName="my test question 2" />
            </Carousel.Item>
            <Carousel.Item>
              <Question questionName="my test question 3" />
            </Carousel.Item>
            <Carousel.Item>
              <Question questionName="my test question 4" />
            </Carousel.Item>
          </Carousel>
        </Container >
        <div style={{ flex: 2 }}>
          <h1>questionsPages</h1>
          <Button onClick={onExit}>Exit</Button>
        </div>
      </div >
    </div >
  )
}