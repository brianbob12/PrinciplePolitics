import React from "react"
import { useState } from "react"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import RangeSlider from "react-bootstrap-range-slider"
import WindowDimensions from "../WindowDimensions"

export default ({ passback, question, number, onScoreChange }) => {
  const myWindow = WindowDimensions()

  const [statement, setStatement] = useState("Perfectly Indifferent")
  const [sliderColor, setSliderColor] = useState("#FFFFFF")
  const [sliderValue, setSliderValue] = useState(0)

  const [showModal, setShowModal] = useState(false)

  const onValueChange = (value) => {
    setSliderValue(value)
    if (value < -75) {
      setStatement("Strongly Disagree")
      setSliderColor("#FF0000")
    }
    else if (value < -50) {
      setStatement("Disagree")
      setSliderColor("#FF0000")
    }
    else if (value < -25) {
      setStatement("Slightly Disagree")
      setSliderColor("#FF0000")
    }
    else if (value < 0) {
      setStatement("Mostly Indifferent")
      setSliderColor("#FF0000")
    }
    else if (value == 0) {
      setStatement("Perfectly Indifferent")
      setSliderColor("#FFFFFF")
    }
    else if (value < 25) {
      setStatement("Mostly Indifferent")
      setSliderColor("#00FF00")
    }
    else if (value < 50) {
      setStatement("Slightly Agree")
      setSliderColor("#00FF00")
    }
    else if (value < 75) {
      setStatement("Agree")
      setSliderColor("#00FF00")
    }
    else {
      setStatement("Strongly Agree")
      setSliderColor("#00FF00")
    }
  }

  passback(onValueChange, number - 1)

  return (
    <Container>
      <Container
        fluid
        style={{ padding: "10%", height: myWindow.height * 0.7 }}
      >
        <Col>
          <Row>
            <h1>{question.name}</h1>
          </Row>
          <Row style={{ paddingTop: "2%" }}>
            <h2>
              {question.description}
            </h2>
          </Row>
          <Row style={{ paddingTop: "5%" }}>
            <h2
              style={{
                color: sliderColor
              }}
            >
              {statement}
            </h2>

          </Row>
          <Row>
            <RangeSlider
              value={sliderValue}
              style={{
                width: "100%"
              }}
              min={-100}
              max={100}
              onChange={
                (a, value) => {
                  onValueChange(value)
                  onScoreChange(value, number - 1)
                }

              }
              tooltip="off"
            />
          </Row>
          <Row>
            <Button
              variant="info"
              onClick={() => { setShowModal(true) }}
            >
              Learn More
            </Button>
          </Row>
        </Col>
      </Container>

      <Modal
        show={showModal}
        onHide={() => { setShowModal(false) }}
      >
        <Modal.Header>{question.name}</Modal.Header>
        <Modal.Body>
          <Col>
            <Row>
              <h3>Arguments in support</h3>
            </Row>
            <Row>
              <p>{question.argumentFor}</p>
            </Row>
            <Row style={{ paddingTop: "5%" }}>
              <h3>Arguments in opposition</h3>
            </Row>
            <Row>
              <p>{question.argumentAgainst}</p>
            </Row>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => { setShowModal(false) }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}