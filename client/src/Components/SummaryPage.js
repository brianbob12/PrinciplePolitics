import React, { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Collapse from "react-bootstrap/Collapse"
import Button from "react-bootstrap/Button"
import WindowDimensions from "../WindowDimensions"

const Question = ({ q, a }) => {
  const [dropped, setDropped] = useState(false)
  return (
    <Container style={{ padding: "20px" }}>
      <Button
        onClick={() => { setDropped(!dropped) }}
        variant="info"
        size="lg"
        style={{
          margin: "20px"
        }}
      >
        {q}
      </Button>
      <Collapse
        in={dropped}
      >
        <div>
          <p
            style={{
              fontSize: "20px",
            }}
          >{a}</p>
        </div>
      </Collapse>
    </Container>
  )
}

export default ({ data }) => {

  if (data.pending) {
    const myWindow = WindowDimensions()

    return (

      <div style={{ flex: 1 }}>
        <div style={{ height: myWindow.height * 0.3 }}>
          <Row style={{ marginTop: myWindow.height * 0.3 * 0.4 }}>
            <h1>Results pending data collection</h1>
          </Row>
        </div>
        <div style={{ height: myWindow.height * 0.7 }}>
          <Row>
            <Col>
              <Row>
                <Question
                  q={"Who gets to see my results?"}
                  a={"No one. Your scores are stored anonymously for processing by a computer program. "}
                />
              </Row>
              <Row>
                <Question
                  q={"When will the tool be ready?"}
                  a={"Soon! We only need a few answers to calibrate the first iteration of the analysis. After that we will continuously update the principle components. "}
                />
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  else {
    return (
      <div style={{
        flex: 1
      }}>
        <h1>Summary Page</h1>

      </div >
    )
  }
}