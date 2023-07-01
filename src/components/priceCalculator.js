import React, { Component } from "react";

export default class PriceCalculator extends Component {
  constructor() {
    super();
    this.state = {
      costPrice: 0,
      sellingPriceBox: 0,
      sellingPrice: 0,
      constPrice: 0,
      quantity: 0,
      percentage: 0,
    };
  }

  handleCostPrice = (e) => {
    this.setState({ constPrice: e.target.value }, this.calculateAll);
  };

  handleQuantity = (e) => {
    this.setState({ quantity: e.target.value }, this.calculateAll);
  };

  handlePercentage = (e) => {
    this.setState(
      { percentage: (100 - e.target.value) / 100 },
      this.calculateAll
    );
  };

  calculateAll = () => {
    const { constPrice, quantity, percentage } = this.state;
    if (constPrice > 0 && quantity > 0 && percentage > 0) {
      this.setState({
        costPrice: Math.round((constPrice * 100) / quantity) / 100,
        sellingPrice:
          Math.round((constPrice * 100) / quantity / percentage) / 100,
        sellingPriceBox: Math.round(constPrice / percentage),
      });
    }
  };
  render() {
    return (
      <div
        className="container mx-auto my-4 shadow flex justify-center rounded text-center pb-4"
        id="divElement"
      >
        <div className="text-center text-primary h-50">
          <h1 className="pt-3 pb-0 fw-bold text-info">Price Calculator</h1>
          <hr className="pt-0" />
          <div className="row text-danger  text-left justify-evenly">
            <div className="col">
              <h1 className="text-end fs-2">Cost Price:</h1>
            </div>
            <div className="col   align-middle">
              <input
                className="form-control align-middle text-center m-1"
                type="number"
                inputMode="numeric"
                onChange={this.handleCostPrice}
              />
            </div>
          </div>
          <div className="row text-center  text-danger text-alert justify-evenly">
            <div className="col">
              <h1 className="text-end fs-2">Quantity:</h1>
            </div>
            <div className="col text-center  align-middle">
              <input
                className="form-control align-middle text-center m-1"
                type="number"
                inputMode="numeric"
                onChange={this.handleQuantity}
              />
            </div>
          </div>
          <div className="row text-center text-danger text-alert  justify-evenly">
            <div className="col">
              <h1 className="text-end fs-3">Markup Percentage:</h1>
            </div>
            <div className="col text-center align-middle">
              <input
                className="form-control align-middle text-center m-1"
                type="number"
                inputMode="numeric"
                onChange={this.handlePercentage}
              />
            </div>
          </div>

          <hr />
          <div className="row text-center  text-success justify-evenly">
            <div className="col">
              <h1 className="text-end fs-2">Cost Price(Unit):</h1>
            </div>
            <div className="col text-left align-middle">
              <p className="text-center fs-2 text-warning">
                {this.state.costPrice}
              </p>
            </div>
          </div>
          <hr />
          <div className="row text-center  text-success justify-evenly">
            <div className="col">
              <h1 className="text-end fs-2">Selling Price(Unit):</h1>
            </div>
            <div className="col text-center align-middle">
              <p className="text-center fs-2 text-warning">
                {this.state.sellingPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
