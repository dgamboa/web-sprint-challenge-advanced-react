import React, { Component } from "react";
import axios from "axios";
import FilterInput from "./FilterInput";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super()
    this.state = {
      plants: []
    }
  };

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  getPlants() {
    axios.get("http://localhost:3333/plants")
      .then(res => {
        this.setState({
          plants: res.data.plantsData
        });
      })
      .catch(err => {
        console.log(err);
      })
  };

  componentDidMount() {
    this.getPlants();
  };

  filterPlants(filteredPlants) {
    this.setState({
      plants: filteredPlants
    });
  };

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <div>
        <FilterInput plants={this.state.plants} filterPlants={this.filterPlants.bind(this)} getPlants={this.getPlants.bind(this)}/>
        <main className="plant-list">
          {this.state?.plants?.map((plant) => (
            <div className="plant-card" key={plant.id} data-testid="plant-card">
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p><span role="img" aria-label="sun">☀️</span> {plant.light}</p>
                  <p><span role="img" aria-label="water">💦</span> {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}
