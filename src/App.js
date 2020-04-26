import React, { Component } from "react";
import "./App.css";
import "moment-timezone";
import moment from "moment";
import format from "moment";
import tz from "zipcode-to-timezone";

var Api_key = "98714695d6d6eca2461e95c2aa78b140";

class App extends Component {
  state = {}; //leave blank - argument that you pass through
  getTZ = () => {
    const zip = document.getElementById("zip").value; //gets the value of the zip input from the input field
    const zone = tz.lookup(zip); //uses "zipcode-to-timezone" to find hte timezone of the zip that has been fetched
    console.log(zone);
    const time = moment().tz(zone).format("LT z");
    console.log(time);
    this.setState({
      time: time,
    });
  };

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
          theweather: data.weather[0].description,
          temp: "Current: " + Math.round(data.main.temp) + "°F",
          wind: data.wind.speed,
          min: Math.round(data.main.temp_min) + "°F",
          max: Math.round(data.main.temp_max) + "°F",
          feelsLike: "Feels Like: " + Math.round(data.main.feels_like) + "°F",
        });
        this.getTZ(); // calls the tz function so that it both will run when button is clicked
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
                  <div className="row justify-content-center text-dark">
                    <div className="col">
                      <h5 id="showWeatherForecast" className="card-title ">
                        {this.state.city}
                      </h5>
                    </div>
                    <div className="col text-right">
                      <h6 id="time" className="card-title">
                        {this.state.time}
                      </h6>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col">
                      <p className="card-title text-info">{this.state.temp}</p>
                    </div>
                    <div className="col text-right">
                      <p id="time" className="card-title text-primary">
                        {this.state.feelsLike}
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <p className="text-right">{this.state.theweather}</p>
                  </div>
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
