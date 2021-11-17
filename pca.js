const csv = require("csv-parser")
const mathjs = require("mathjs")
const fs = require("fs")

const getCSV = (file) => {
  return new Promise((resolve, reject) => {
    const out = []
    fs.createReadStream(file)
      .pipe(csv())
      .on("data", (data) => out.push(data))
      .on("end", () => {
        resolve(out)
      });
  });
}

//returns:
//  PC matrix
//  PC variances
//  sample averages

//NOTE PC variances aren't properly computed
const generatePCs = (file) => {
  return (new Promise((resolve) => {
    getCSV(file).then((values) => {
      //ignore ids
      const myKeys = Object.keys(values[0]).splice(1)
      const n = myKeys.length
      const l = values.length
      //STEP 1
      //center data and calculate variances

      const sums = []

      for (var j = 0; j < n; j++) {
        sums.push(0)
      }

      for (var i = 0; i < l; i++) {
        for (var j = 0; j < n; j++) {
          const myVal = parseInt(values[i][myKeys[j]])
          sums[j] += myVal
        }
      }

      const data = []
      const averages = []
      for (var j = 0; j < n; j++) {
        averages.push(sums[j] / n)
      }
      for (var i = 0; i < l; i++) {
        data.push([])
        for (var j = 0; j < n; j++) {
          data[i][j] = values[i][myKeys[j]] - averages[j]
        }
      }
      //STEP 2
      //calculate covariances
      coVariance = []
      for (var i = 0; i < n; i++) {
        coVariance.push([])
        for (var j = i; j < n; j++) {
          coVariance[i][j] = 0
          for (var k = 0; k < l; k++) {
            coVariance[i][j] += data[k][i] * data[k][j]
          }
          coVariance[i][j] /= l - 1//using l-1 for Bessel's correction
        }
      }

      //STEP 3
      //assemble covariance matrix

      //loop over unfilled values
      for (var i = 1; i < n; i++) {
        for (var j = 0; j < i; j++) {
          coVariance[i][j] = coVariance[j][i]
        }
      }

      //STEP 4
      //calculate eigenvectors and eigenvalues

      const eigenStuff = mathjs.eigs(coVariance)

      //STEP 5
      //sort out values

      //each column is an eigenvector
      const PCmatrix = []
      for (var i = 0; i < n; i++) {
        PCmatrix.push([])
        for (var j = 0; j < n; j++) {
          PCmatrix[i][j] = eigenStuff.vectors[j][i]
        }
      }

      const out = {
        pcMatrix: PCmatrix,
        pcVariances: eigenStuff.values,
        averages: averages
      }
      resolve(out)
    })
  }));
}