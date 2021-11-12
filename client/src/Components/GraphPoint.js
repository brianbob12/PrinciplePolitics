import { useState } from "react"

export default ({ x, y, graphSize, color }) => {

  const [hover, setHover] = useState(false)
  const mainPointSize = 0.04;
  const highlightPointSize = 0.06;

  return (
    <div
      style={{
        height: graphSize * mainPointSize,
        width: graphSize * mainPointSize,
        backgroundColor: color,
        borderRadius: graphSize * mainPointSize * 0.5,
        position: "absolute",
        top: graphSize * (x - mainPointSize * 0.5),
        left: graphSize * (y - mainPointSize * 0.5)
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
    >
      <div
        style={{
          height: graphSize * highlightPointSize,
          width: graphSize * highlightPointSize,
          backgroundColor: color + "80",
          borderRadius: graphSize * highlightPointSize * 0.5,
          position: "absolute",
          top: graphSize * (mainPointSize - highlightPointSize) / 2,
          left: graphSize * (mainPointSize - highlightPointSize) / 2,
          visibility: hover ? "visible" : "hidden"
        }}
      ></div>
    </div>
  )
}