import { Container, Row, Col, Button } from "react-bootstrap"
import { useState } from "react"
import RangeSlider from "react-bootstrap-range-slider"
import WindowDimensions from "../WindowDimensions"

//passback is a funtion that returns a funtion to parent component
const QuestionView = (passback, index, onScoreChange, question, questionScore) => {

  const [statement, setStatement] = useState("Perfectly Indifferent")
  const [sliderColor, setSliderColor] = useState("#FFFFFF")
  const [sliderValue, setSliderValue] = useState(questionScore)

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
  passback(onValueChange)
  return (
    <Row>
      <Col
        sm={1}
      >
        <Button
          variant="secondary"
          onClick={() => { }}
        >Return</Button>
      </Col>
      <Col
        sm={4}
      >
        <h3>{question.name}</h3>
      </Col>
      <Col
        sm={4}
      >
        <h3 style={{ color: sliderColor }}>{statement}</h3>
      </Col>
      <Col
        sm={2}
      >
        <RangeSlider
          value={sliderValue}
          style={{ width: "100%" }}
          min={-100}
          max={100}
          onChange={
            (a, value) => {
              onValueChange(value)
              onScoreChange(value, index)
            }
          }
          tooltip="off"
        />
      </Col>
    </Row>
  )
}

export default ({ passback, numberOfQuestions, questions, questionScores, onSliderChange }) => {
  const myWindow = WindowDimensions()
  const listItems = []
  const updateSummarySliders = []
  for (var i = 0; i < numberOfQuestions; i++) {
    listItems.push(QuestionView(
      (updateFunction) => {
        updateSummarySliders.push(updateFunction)
        if (updateSummarySliders.length == numberOfQuestions) {
          passback(updateSummarySliders)
        }
      },
      i,
      (value, index) => { onSliderChange(value, index) },
      questions[i],
      questionScores[i]
    ))
  }
  return (
    <Container
      fluid
      style={{
        padding: "10%",
        paddingLeft: "15%",
        height: myWindow.height * 0.7
      }}
    >
      <Row>
        <h1>Questions Summary</h1>
      </Row>
      {listItems}
      <Row>
        <Container
        >
          <Button
            size="lg"
            variant="success"
            onClick={() => { }}
          >Submit</Button>
        </Container>
      </Row>
    </Container >
  )
}