import React, { useRef, useEffect } from "react"
import GraphPoint from "./GraphPoint"

export default ({ size, points }) => {

  const zeroAxisWidth = 2

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
      <GraphPoint
        x={0.5}
        y={0.5}
        graphSize={size}
        color={"#FF0000"}
      />
    </div>
  )
}