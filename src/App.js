import React, { Component } from "react";
import "./App.css";

const MIN_ZIPCODE_LENGTH = 5;
const ZIP_API_BASE_URL = "http://ctp-zip-api.herokuapp.com/zip";

function City(props) {
  return (
    <div className="container">
      <div class="card border-dark mb-3">
        <div class="card-header">{props.city},{props.state}</div>
        <div class="card-body text-dark">
         <ul>
           <li>State:{props.state}</li>
           <li>Location: ({props.long} , {props.lat})</li>
           <li>Population (estimated): {props.population}</li>
           <li>Total Wages: {props.wage} </li>
         </ul>
        </div>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="container">
      <div className="row justify-content-center">Zip Code:
        <form className="col">
          {props.query}
          <input
            className="col-12"
            type="text"
            onChange={props.onChange}
            placeholder="Try 10003"
          />
        </form>
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      query: ""
    };
  }

  onZipSearchFieldChange = event => {
    const query = event.target.value;

    if (query.length >= MIN_ZIPCODE_LENGTH) {
      fetch(`${ZIP_API_BASE_URL}/${query}`)
        .then(response => {
         
          return response.ok ? response.json() : [];
        })
        .then(response => {
          const cities = response.map(city => {
            return (
              <City
              state = {city.State}
                wage = {city.TotalWages}
                city={city.City}
                population={city.EstimatedPopulation}
                country={city.Country}
                long = {city.Long}
                lat = {city.Lat}
                key={city.RecordNumber}
              />
            );
          });

          this.setState({ cities });
        })
        .catch(error => {
          this.setState({ cities: [] });
        });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <ZipSearchField
                query={this.state.query}
                onChange={this.onZipSearchFieldChange}
              />
            </div>
          </div>
        </div>
        {this.state.cities.length > 0 ? (
          this.state.cities
        ) : (
          <div className="row justify-content-center">No Results</div>
        )}
      </div>
    );
  }
}

export default App;
