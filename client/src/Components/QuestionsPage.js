import Button from "react-bootstrap/Button"
import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container"
import React, { useState } from "react"
import WindowDimensions from "../WindowDimensions"
import Question from "./Question"
import QuestionSummaryPage from "./QuestionSummaryPage"

export default ({ onExit, onFinish }) => {
  const myWindow = WindowDimensions()
  const numberOfQuestions = 4
  const questionScores = [0, 0, 0, 0]
  const questions = [
    {
      name: "the first question",
      description: "the description rot he first question"
    },
    {
      name: "the second question"
    },
    {
      name: "third question"
    },
    {
      name: "fourth question"
    }
  ]

  const listItems = []

  for (var i = 0; i < numberOfQuestions; i++) {
    listItems.push(
      <Carousel.Item>
        <Question
          question={questions[i]}
          number={i + 1}
          onScoreChange={(score) => {
            questionScores[i] = score
          }}
        />
      </Carousel.Item>
    )
  }

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
            {listItems}
            <Carousel.Item>
              <QuestionSummaryPage
                questions={questions} />
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