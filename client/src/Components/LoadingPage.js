import Spinner from "react-bootstrap/Spinner"

export default () => {
  return (
    <div style={{
      flex: 1
    }}>
      <Spinner
        animation="border"
        variant="info"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div >
  )
}