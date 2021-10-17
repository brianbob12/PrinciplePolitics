import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import { useState } from "react"
import RangeSlider from "react-bootstrap-range-slider"
import WindowDimensions from "../WindowDimensions"

//passback is a funtion that returns a funtion to parent component
const QuestionView = (passback, index, onScoreChange, question, questionScore, onReturnButton) => {

  const [statement, setStatement] = useState("Perfectly Indifferent")
  const [sliderColor, setSliderColor] = useState("#FFFFFF")
  const [sliderValue, setSliderValue] = useState(questionScore)

  const onValueChange = (value) => {
    setSliderValue(value)
    if (value < -75) {
      setStatement("Strongly Disagree")
      setSliderColor("#FF0000")
    }
    else if (value < -50) {
      setStatement("Disagree")
      setSliderColor("#FF0000")
    }
    else if (value < -25) {
      setStatement("Slightly Disagree")
      setSliderColor("#FF0000")
    }
    else if (value < 0) {
      setStatement("Mostly Indifferent")
      setSliderColor("#FF0000")
    }
    else if (value == 0) {
      setStatement("Perfectly Indifferent")
      setSliderColor("#FFFFFF")
    }
    else if (value < 25) {
      setStatement("Mostly Indifferent")
      setSliderColor("#00FF00")
    }
    else if (value < 50) {
      setStatement("Slightly Agree")
      setSliderColor("#00FF00")
    }
    else if (value < 75) {
      setStatement("Agree")
      setSliderColor("#00FF00")
    }
    else {
      setStatement("Strongly Agree")
      setSliderColor("#00FF00")
    }
  }
  passback(onValueChange)
  return (
    <Row>
      <Col
        sm={1}
      >
        <Button
          variant="secondary"
          onClick={() => {
            onReturnButton(index)
          }}
        >Return</Button>
      </Col>
      <Col
        sm={4}
      >
        <h3>{question.name}</h3>
      </Col>
      <Col
        sm={4}
      >
        <h3 style={{ color: sliderColor }}>{statement}</h3>
      </Col>
      <Col
        sm={2}
      >
        <RangeSlider
          value={sliderValue}
          style={{ width: "100%" }}
          min={-100}
          max={100}
          onChange={
            (a, value) => {
              onValueChange(value)
              onScoreChange(value, index)
            }
          }
          tooltip="off"
        />
      </Col>
    </Row>
  )
}

//onReturnButton needs index as an argument
export default ({ passback, numberOfQuestions, questions, questionScores, onSliderChange, onReturnButton, onSubmit }) => {
  const myWindow = WindowDimensions()
  const listItems = []
  const updateSummarySliders = []
  const [mySurveyData, setMySurvayData] = useState({
    data: true,
    age: null,
    gender: null,
    country: null,
    favoredParty: null,
    religion: null,
    region: null
  })
  const [showCountry, setShowCountry] = useState("none")
  const [showModal, setShowModal] = useState(false)
  const [showSurvey, setShowSurvey] = useState(false)

  for (var i = 0; i < numberOfQuestions; i++) {
    listItems.push(QuestionView(
      (updateFunction) => {
        updateSummarySliders.push(updateFunction)
        if (updateSummarySliders.length == numberOfQuestions) {
          passback(updateSummarySliders)
        }
      },
      i,
      (value, index) => { onSliderChange(value, index) },
      questions[i],
      questionScores[i],
      onReturnButton
    ))
  }
  return (
    <Container
      fluid
      style={{
        padding: "10%",
        paddingLeft: "15%",
        height: myWindow.height * 0.7,
      }}
    >
      <Container
        style={{
          height: "100%",
          width: "100%",
          overflowY: "scroll"
        }}
      >
        <Row>
          <h1>Questions Summary</h1>
        </Row>
        {listItems}
        <Row>
          <Container
          >
            <Button
              size="lg"
              variant="success"
              onClick={() => {
                setShowModal(true)
              }}
            >Submit</Button>
          </Container>
        </Row>
      </Container>






      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false)
          setShowSurvey(false)
        }}
      >
        <Modal.Header>
          <h3>Would you like to take a quick survey?</h3>
        </Modal.Header>
        {showSurvey &&
          <Modal.Body>
            <Form>
              <Col>
                <Form.Group>
                  <Row style={{ padding: "2%" }}>
                    <Form.Label>Age</Form.Label>

                    <Form.Control
                      type="number"
                      onChange={(event) => {
                        mySurveyData.age = event.target.value
                      }}
                    />
                  </Row>
                  <Row style={{ padding: "2%" }}>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(event) => {
                        mySurveyData.gender = event.target.value
                      }}
                    >
                      <option value={null} >Prefer not to say</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="NB">Non Binary</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Row>
                  <Row style={{ padding: "2%" }}>
                    <Form.Label>Religion</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(event) => {
                        mySurveyData.religion = event.target.value
                      }}
                    >
                      <option value={null} >Prefer not to say</option>
                      <option value="Christianity">Christianity</option>
                      <option value="No Religion">No Religion</option>
                      <option value="Islam">Islam</option>
                      <option value="Hinduism">Hinduism</option>
                      <option value="Sikhism">Sikhism</option>
                      <option value="Judaism">Judaism</option>
                      <option value="Buddhism">Buddhism</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Row style={{ padding: "2%" }}>
                    <Form.Label>Country Of Residence</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(event) => {
                        mySurveyData.country = event.target.value
                        if (event.target.value == "UK") {
                          setShowCountry("UK")
                        }
                        else if (event.target.value == "US") {
                          setShowCountry("US")
                        }
                        else {
                          setShowCountry("none")
                        }
                      }}
                    >
                      <option value={null} >Prefer not to say</option>
                      <option value="UK">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Row>
                  {showCountry == "UK" &&
                    <Container>
                      <Row style={{ padding: "2%" }}>
                        <Form.Label>Preferred Political Party</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(event) => {
                            mySurveyData.favoredParty = event.target.value
                          }}
                        >
                          <option value={null}>Prefer Not to Say</option>
                          <option value={"Conservative"}>Conservative</option>
                          <option value={"Labour"}>Labour</option>
                          <option value={"SNP"}>Scottish National Party</option>
                          <option value={"LibDem"}>Liberal Democrats</option>
                          <option value={"DUP"}>Democratic Unionist Party</option>
                          <option value={"SF"}>Sinn Fein</option>
                          <option value={"PlaidCymru"}>Plaid Cymru</option>
                          <option value={"SDLP"}>Social Democratic and Labour Party</option>
                          <option value={"Alba"}>Alba Party</option>
                          <option value={"Green"}>Green Party</option>
                          <option value={"Alliance"}>Alliance Party</option>
                          <option value={"Ulster"}>Ulster Unionist Party</option>
                        </Form.Control>
                      </Row>
                      <Row style={{ padding: "2%" }}>
                        <Form.Label>Region</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(event) => {
                            mySurveyData.region = event.target.value
                          }}>
                          <option value={null}>Prefer Not to Say</option>
                          <optgroup label="England">
                            <option value={"London"}>London</option>
                            <option value={"England-SE"}>South East</option>
                            <option value={"England-SW"}>South West</option>
                            <option value={"England-E"}>East</option>
                            <option value={"England-WM"}>West Midlands</option>
                            <option value={"England-EM"}>East Midlands</option>
                            <option value={"England-NW"}>North West</option>
                            <option value={"England-YH"}>Yorkshire and the Humber</option>
                            <option value={"England-NE"}>North East</option>
                          </optgroup>
                          <option value={"Scotland"}>Scotland</option>
                          <option value={"Wales"}>Wales</option>
                          <option value={"NorthernIreland"}>Northern Ireland</option>
                        </Form.Control>
                      </Row>
                    </Container>
                  }
                  {showCountry == "US" &&
                    <Container>
                      <Row style={{ padding: "2%" }}>
                        <Form.Label>Preferred Political Party</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(event) => {
                            mySurveyData.favoredParty = event.target.value
                          }}
                        >
                          <option value={null}>Prefer Not to Say</option>
                          <option value="Democratic">Democratic</option>
                          <option value="Republican">Republican</option>
                          <option value="APP">American Patriot Party</option>
                          <option value="Libertarian">Libertarian</option>
                          <option value="Green">Green</option>
                          <option value="Constitution">Constitution</option>
                          <option value="Communist">Community Party USA</option>
                        </Form.Control>
                      </Row>
                      <Row style={{ padding: "2%" }}>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(event) => {
                            mySurveyData.region = event.target.value
                          }}>
                          <option value={null}>Prefer Not to Say</option>
                          <option value={"AL"}>Alabama</option>
                          <option value={"AK"}>Alaska</option>
                          <option value={"AZ"}>Arizona</option>
                          <option value={"AR"}>Arkansas</option>
                          <option value={"CA"}>California</option>
                          <option value={"CO"}>Colorado</option>
                          <option value={"CT"}>Connecticut</option>
                          <option value={"DC"}>District of Columbia</option>
                          <option value={"DE"}>Delaware</option>
                          <option value={"FL"}>Florida</option>
                          <option value={"GA"}>Georgia</option>
                          <option value={"HI"}>Hawaii</option>
                          <option value={"ID"}>Idaho</option>
                          <option value={"IL"}>Illinois</option>
                          <option value={"IA"}>Iowa</option>
                          <option value={"KS"}>Kansas</option>
                          <option value={"KY"}>Kentucky</option>
                          <option value={"LA"}>Louisiana</option>
                          <option value={"ME"}>Maine</option>
                          <option value={"MD"}>Maryland</option>
                          <option value={"MA"}>Massachusetts</option>
                          <option value={"MI"}>Michigan</option>
                          <option value={"MN"}>Minnesota</option>
                          <option value={"MS"}>Mississippi</option>
                          <option value={"MO"}>Missouri</option>
                          <option value={"MT"}>Montana</option>
                          <option value={"NE"}>Nebraska</option>
                          <option value={"NV"}>Nevada</option>
                          <option value={"NH"}>New Hampshire</option>
                          <option value={"NJ"}>New Jersey</option>
                          <option value={"NM"}>New Mexico</option>
                          <option value={"NY"}>New York</option>
                          <option value={"NC"}>North Carolina</option>
                          <option value={"ND"}>North Dakota</option>
                          <option value={"OH"}>Ohio</option>
                          <option value={"OK"}>Oklahoma</option>
                          <option value={"OR"}>Oregon</option>
                          <option value={"PA"}>Pennsylvania</option>
                          <option value={"RI"}>Rhode Island</option>
                          <option value={"SC"}>South Carolina</option>
                          <option value={"SD"}>South Dakota</option>
                          <option value={"TN"}>Tennessee</option>
                          <option value={"TX"}>Texas</option>
                          <option value={"UT"}>Utah</option>
                          <option value={"VT"}>Vermont</option>
                          <option value={"VA"}>Virginia</option>
                          <option value={"WA"}>Washington</option>
                          <option value={"WV"}>West Virginia</option>
                          <option value={"WI"}>Wisconsin</option>
                          <option value={"WY"}>Wyoming</option>
                        </Form.Control>
                      </Row>
                    </Container>
                  }

                </Form.Group>
              </Col>
            </Form>
          </Modal.Body>
        }
        {!showSurvey &&
          <Modal.Body>
            <p>This will be used for analytics only and will not be shared with anyone.</p>
          </Modal.Body>
        }
        <Modal.Footer>
          <Row>
            {!showSurvey &&
              <>
                <Col>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      onSubmit({ data: false })
                    }}
                  >
                    No
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="success"
                    onClick={() => {
                      setShowSurvey(true)
                    }}
                  >Yes</Button>
                </Col>
              </>
            }
            {showSurvey &&
              <Col>
                <Button
                  variant="success"
                  onClick={() => {
                    onSubmit(mySurveyData)
                  }}
                >Submit</Button>
              </Col>
            }
          </Row>
        </Modal.Footer>
      </Modal>
    </Container >
  )
}