import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
class App extends React.Component {
    const key = "98714695d6d6eca2461e95c2aa78b140";
    getWeather = async (e) => {};

  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="card">
              <p className="card-header">Whats the Weather?</p>
              <div className="card-body">
                <div className="input">
                  <input type="text" id="zip" className="card-text" />
                  <button id="getWeather">Get Weather</button>
                  <h5 id="showWeatherForecast" className="card-title"></h5>
                  <h6 id="time" className="card-title"></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
