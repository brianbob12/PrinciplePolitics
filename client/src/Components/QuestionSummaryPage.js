import { Container, Row, Col } from "react-bootstrap"
import RangeSlider from "react-bootstrap-range-slider"
import WindowDimensions from "../WindowDimensions"

const questionView = (question, questionScores) => {
  return (
    <Row>
      <Col>
        {question.name}
      </Col>
      <Col>
        <RangeSlider
          value={question.score}
        />
      </Col>
    </Row>
  )
}

export default ({ questions, questionScores }) => {
  const myWindow = WindowDimensions()
  return (
    <Container
      fluid
      style={{ padding: "10%", height: myWindow.height * 0.7 }}
    >
      <Row>
        <h1>Questions Summary</h1>
      </Row>
      <Row>
        <h1>question</h1>
      </Row>
    </Container>
  )
}