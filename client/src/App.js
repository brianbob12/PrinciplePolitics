import React, { Component } from 'react'
import './CSS/App.css'
import Navigator from './Components/Navigator'

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  state = {
    data: "something's gone wrong"
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
    document.title = "Principle Politics"
  }
  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <header className="App-header">
          <Navigator />
        </header>
      </div>
    );
  }
}

export default App;
