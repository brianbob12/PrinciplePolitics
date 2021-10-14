import React from "react"
import { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import RangeSlider from "react-bootstrap-range-slider"

export default ({ questionName, questionNumber }) => {
  const [statement, setStatement] = useState("Perfectly Indifferent")
  const [sliderColor, setSliderColor] = useState("#FFFFFF")
  const [sliderValue, setSliderValue] = useState(0)
  return (
    <Container
      fluid
      style={{ padding: "10%" }}
    >
      <Col>
        <Row>
          <h1>{questionName}</h1>
        </Row>
        <Row>
          <h2
            style={{
              color: sliderColor
            }}
          >
            {statement}
          </h2>
          <h2>
            {sliderValue}
          </h2>
        </Row>
        <Row>
          <RangeSlider
            style={{
              width: "100%"
            }}
            min={-100}
            max={100}
            onChange={
              (a, value) => {
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
            }
          />
        </Row>
      </Col>
    </Container>
  )
}