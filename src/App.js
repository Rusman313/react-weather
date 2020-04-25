import React, { Component } from "react";
import "./App.css";
import "moment-timezone";
import moment from "moment";
import tz from "zipcode-to-timezone";

var Api_key = "98714695d6d6eca2461e95c2aa78b140";

class App extends Component {
  state = {}; //leave blank - argument that you pass through

  getWeather = () => {
    const zip = document.getElementById("zip").value; //gets the value of the zip input from the input field
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zip +
        ",us&appid=" +
        Api_key +
        "&units=imperial" // gets the api data with the zip input and converts to imperial
    ).then((response) => {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      response.json().then((data) => {
        console.log(data);
        this.setState({
          city: data.name,
          timezone: data.timezone,
          theweather: data.weather[0].main,
          icon: data.weather.icon,
          temp: data.main.temp + "°F",
          wind: data.wind.speed,
        });
      });
    });
  };

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
                  <button id="getWeather" onClick={this.getWeather}>
                    {/* on click of the button get "this function's response"*/}
                    Get Weather
                  </button>
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
