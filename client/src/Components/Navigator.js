import React, { useState } from "react"

import HomePage from "./HomePage"
import QuestionsPage from "./QuestionsPage"
import LoadingPage from "./LoadingPage"
import SummaryPage from "./SummaryPage"

export default () => {
  // persistent page
  const [myHomePage, setMyHomePage] = useState(
    <HomePage
      onStartButton={() => { setCurrentPage(myQuestionsPage) }}
      //TODO remove this
      onDEBUG={() => {
        const mySummaryPage =
          <SummaryPage
            data={{
              pending: true,
              phase: 0,
              pcs: [null, null, null, null, null, null, null, null]
            }}
          />
        setCurrentPage(mySummaryPage)
      }}
    />
  )
  //persistent page
  const [myQuestionsPage, setMyQuestionPage] = useState(
    <QuestionsPage
      onExit={() => { setCurrentPage(myHomePage) }}
      onStartLoading={() => { setCurrentPage(myLoadingPage) }}
      onFinish={(data) => {
        const mySummaryPage =
          <SummaryPage
            data={data}
          />
        setCurrentPage(mySummaryPage)
      }}
    />)
  const myLoadingPage =
    <LoadingPage
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