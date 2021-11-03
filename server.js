const express = require('express'); //Line 1
const bodyParser = require("body-parser")
const fs = require("fs")
//const csv = require("csv-parser")
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

var idCount = 0

//file constants
//TODO get from .json
const dataDir = "data"
const backupDir = "data/backups"
const processedDataPath = "processedData.csv"
const surveyResponsesPath = "surveyResponses.csv"
const rawResponsesPath = "rawResponses.csv"


const appendCSV = (path, row, callback) => {
  var toWrite = "\n"
  for (var i = 0; i < row.length - 1; i++) {
    toWrite += row[i] + ","
  }
  toWrite += row[row.length - 1]

  fs.appendFile(path, toWrite, callback)
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })
})

app.post("/submitData", (req, res) => {
  console.log("Scores Submitted")

  //TODO properly determine id
  const id = idCount
  idCount += 1

  //TODO fix all zeros gettting NAN 
  var n = req.body.scores.length
  var total = 0
  var squaredTotal = 0
  var processedScores = []
  for (var i = 0; i < n; i++) {
    total += req.body.scores[i]
    squaredTotal += req.body.scores[i] ** 2
  }
  const average = total / n
  const stdDev = Math.sqrt((squaredTotal / n) - average ** 2)
  for (var i = 0; i < n; i++) {
    processedScores.push((req.body.scores[i] - average) / stdDev)
  }

  //TODO calculate PCs
  //TODO return PCs
  res.send({
    pending: true,
    phase: 0,
    pcs: [null, null, null, null, null, null, null, null]
  })

  const rawResponsesData = [id].concat(req.body.scores)
  appendCSV(dataDir + "/" + rawResponsesPath, rawResponsesData, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      //backup once first file is secure
      appendCSV(backupDir + "/" + rawResponsesPath, rawResponsesData, (err) => {
        if (err) { console.log(err) }
      })
    }
  })

  const processedData = [id].concat(processedScores)
  appendCSV(dataDir + "/" + processedDataPath, processedData, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      //backup once first file is secure
      appendCSV(backupDir + "/" + processedDataPath, processedData, (err) => {
        if (err) { console.log(err) }
      })
    }
  })

  var surveyData = [id, null, null, null, null, null, null]
  if (req.body.surveyData.data) {
    surveyData = [id,
      req.body.surveyData.age,
      req.body.surveyData.gender,
      req.body.surveyData.country,
      req.body.surveyData.favoredParty,
      req.body.surveyData.religion,
      req.body.surveyData.region
    ]
  }

  appendCSV(dataDir + "/" + surveyResponsesPath, surveyData, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      //backup once first file is secure
      appendCSV(backupDir + "/" + surveyResponsesPath, surveyData, (err) => {
        if (err) { console.log(err) }
      })
    }
  })

})