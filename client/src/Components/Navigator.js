import React, { useState } from "react"

import HomePage from "./HomePage"
import QuestionsPage from "./QuestionsPage"

export default () => {
  const myHomePage =
    <HomePage
      onStartButton={() => { setCurrentPage(myQuestionsPage) }}
    />
  const myQuestionsPage =
    <QuestionsPage
      onExit={() => { setCurrentPage(myHomePage) }}
      onFinish={() => { }}
    />
  const [currentPage, setCurrentPage] = useState(myHomePage)
  return (
    <div style={{}}>
      <div style={{}}>
        {currentPage}
      </div>
    </div>
  )
}