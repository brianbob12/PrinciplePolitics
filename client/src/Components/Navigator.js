import React, { useState } from "react"

import HomePage from "./HomePage"
import QuestionsPage from "./QuestionsPage"
import LoadingPage from "./LoadingPage"
import SummaryPage from "./SummaryPage"

export default () => {
  const myHomePage =
    <HomePage
      onStartButton={() => { setCurrentPage(myQuestionsPage) }}
    />
  const myQuestionsPage =
    <QuestionsPage
      onExit={() => { setCurrentPage(myHomePage) }}
      onStartLoading={() => { setCurrentPage(myLoadingPage) }}
      onFinish={(data) => {
        setReturnedData(data)
        setCurrentPage(mySummaryPage)
      }}
    />
  const myLoadingPage =
    <LoadingPage
    />
  //data returned from server
  const [returnedData, setReturnedData] = useState(null)
  const mySummaryPage =
    <SummaryPage
      data={returnedData}
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