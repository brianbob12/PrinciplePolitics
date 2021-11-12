import Button from "react-bootstrap/Button"
import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container"
import React, { useState } from "react"
import WindowDimensions from "../WindowDimensions"
import Question from "./Question"
import QuestionSummaryPage from "./QuestionSummaryPage"

const submitScores = (surveyData, scores, onStartLoading, onFinish) => {
  //do stuff
  const submitTime = (new Date()).getTime()
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scores: scores,
      surveyData: surveyData,
      submitTime: submitTime
    })
  }
  fetch("/submitData", requestOptions).then((res) => {
    res.json().then((value) => {
      onFinish(value)
    })
  })
  onStartLoading()
}

export default ({ onExit, onStartLoading, onFinish }) => {

  const myWindow = WindowDimensions()
  const numberOfQuestions = 4

  const [carouselIndex, setCarouselIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex)
  }

  const [questionScores, setQuestionScores] = useState([])
  if (questionScores.length == 0) {
    for (var i = 0; i < numberOfQuestions; i++) {
      questionScores.push(0)
    }
  }

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
  const updatePageSliders = []
  const updateSummarySliders = []

  for (var i = 0; i < numberOfQuestions; i++) {
    updatePageSliders.push((value) => { console.log("no function here:" + value) })
    listItems.push(
      <Carousel.Item>
        <Question
          passback={(functionToChange, index) => {
            updatePageSliders[index] = functionToChange
          }}
          question={questions[i]}
          number={i + 1}
          onScoreChange={(score, index) => {
            questionScores[index] = score
            updateSummarySliders[index](score)
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
            activeIndex={carouselIndex}
            onSelect={handleSelect}
            variant="dark"
            controls={true}
            indicators={true}
            interval={null}
          >
            {listItems}
            <Carousel.Item>
              <QuestionSummaryPage
                passback={(updateFunctions) => {
                  //empty array without changing pointer
                  updateSummarySliders.splice(0, numberOfQuestions)
                  //this is done because I can't change the pointer for updateSummarySliders
                  for (var i = 0; i < updateFunctions.length; i++) {
                    updateSummarySliders.push(updateFunctions[i])
                  }
                }}
                numberOfQuestions={numberOfQuestions}
                questions={questions}
                questionScores={questionScores}
                onSliderChange={(value, index) => {
                  questionScores[index] = value
                  updatePageSliders[index](value)
                }}
                onReturnButton={(index) => {
                  setCarouselIndex(index)
                }}
                onSubmit={(surveyData) => {
                  submitScores(surveyData, questionScores, onStartLoading, onFinish)
                }}
              />
            </Carousel.Item>
          </Carousel>
        </Container >
        <div style={{ flex: 2 }}>
          <h1>questionsPages</h1>
          <Button
            variant="info"
            onClick={onExit}
          >Exit</Button>
        </div>
      </div >
    </div >
  )
}