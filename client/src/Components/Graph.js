import React, { useRef, useEffect } from "react"
import GraphPoint from "./GraphPoint"

const getColor = (index) => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FF00FF",
    "#00FFFF",
    "#FFFF00"
  ]
  if (index < 6) {
    return colors[index]
  }
  const hue = 0.349 * index
  //const hue = 120 / 360
  const s = 1.0
  const v = 1.0

  //convert from HSV to RGB
  var preR = 0.0
  var preG = 0.0
  var preB = 0.0
  const c = v * s
  const x = c * (1 - Math.abs((6 * hue) % 2 - 1))
  const m = v - c
  switch (Math.floor(hue * 6) % 6) {
    case 0:
      preR = c
      preG = x
      preB = 0
      break
    case 1:
      preR = x
      preG = c
      preB = 0
      break
    case 2:
      preR = 0
      preG = c
      preB = x
      break
    case 4:
      preR = 0
      preG = x
      preB = c
      break
    case 5:
      preR = x
      preG = 0
      preB = c
      break
    case 6:
      preR = c
      preG = 0
      preB = x
      break
  }

  var r = Math.round(255 * (preR + m)).toString(16)
  var g = Math.round(255 * (preG + m)).toString(16)
  var b = Math.round(255 * (preB + m)).toString(16)
  r = "0".repeat(2 - r.length) + r
  g = "0".repeat(2 - g.length) + g
  b = "0".repeat(2 - b.length) + b
  return "#" + r + g + b
}

//points =[{x,y,color?}]
export default ({ size, points }) => {

  const zeroAxisWidth = 2

  const myPoints = []
  for (var i = 0; i < points.length; i++) {
    myPoints.push(
      GraphPoint({
        x: points[i].x,
        y: points[i].y,
        graphSize: size,
        color: points[i].color == null ? getColor(i) : points[i].color
      })
    )
  }

  return (
    <div
      style={{
        height: size,
        width: size,
        backgroundColor: "white",
        position: "relative"
      }}
    >
      <div
        style={{
          height: size,
          width: zeroAxisWidth,
          backgroundColor: "#AAAAAA",
          position: "absolute",
          top: 0,
          left: size / 2 - zeroAxisWidth / 2
        }}
      />
      <div
        style={{
          width: size,
          height: zeroAxisWidth,
          backgroundColor: "#AAAAAA",
          position: "absolute",
          left: 0,
          top: size / 2 - zeroAxisWidth / 2
        }}
      />
      {myPoints}
    </div>
  )
}