import React, { useState } from "react";
import "./index.css";
import CreateResultDiv from "./formReportCreator";

const RealestateValuation = () => {
  const [formData, setFormData] = useState({
    sales_price: 400000,
    current_rent_price: 3600,
    market_rent_price: 5000,
    down_payment_percentage: 20,
    interest_rate: 3.75,
    loan_terms: 25,
    closing_costs: 20,
    property_tax: 7974.96,
    insurance: 150,
    gas_electric: 0,
    water: 0,
    sewer_drainage: 0,
    garbage: 0,
    lawn_snow: 240,
    management_fees: 10,
    vacancy_percentage: 5,
    maintenance_percentage: 10,
  });
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace this with your desired logic for handling the form data
    setShowAnalysis(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  return (
    <>
      <div className="shadow py-2 rounded">
        <h1 className="text-center fw-bold pt-2 text-info">
          Real Estate Analysis
        </h1>
        <form id="reatEstate" onSubmit={handleSubmit} className="">
          {/* Sales Data */}
          <div className="mx-2 px-2 pb-2 p-md-4 m-md-4 border rounded">
            <h1 className="my-3 text-info ">Sales Data</h1>
            <div className="form-group">
              <label htmlFor="sales_price">Sales price</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  id="sales_price"
                  name="sales_price"
                  inputMode="numeric"
                  placeholder="Enter sales price"
                  required
                  value={formData.sales_price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="current_rent_price">Current Rent Price</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  id="current_rent_price"
                  name="current_rent_price"
                  inputMode="numeric"
                  placeholder="Enter current rent price"
                  required
                  value={formData.current_rent_price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="market_rent_price">Market Rent Price</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  id="market_rent_price"
                  name="market_rent_price"
                  placeholder="Enter market rent price"
                  inputMode="numeric"
                  required
                  value={formData.market_rent_price}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Mortgage Data */}
          <div className="mx-2 px-2 pb-2 mt-3 p-md-4 m-md-4 border rounded">
            <h1 className="my-3 text-info">Mortgage Data</h1>
            <div className="form-group">
              <label htmlFor="down_payment_percentage">
                Down Payment percentage
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="down_payment_percentage"
                  name="down_payment_percentage"
                  placeholder="Enter down payment percentage"
                  required
                  inputMode="numeric"
                  value={formData.down_payment_percentage}
                  onChange={handleChange}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="interest_rate">Interest Rate</label>
              <div className="input-group">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="interest_rate"
                  name="interest_rate"
                  placeholder="Enter interest rate"
                  required
                  inputMode="numeric"
                  value={formData.interest_rate}
                  onChange={handleChange}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="loan_terms">Loan Terms (Years)</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="loan_terms"
                  name="loan_terms"
                  placeholder="Enter loan terms"
                  required
                  inputMode="numeric"
                  value={formData.loan_terms}
                  onChange={handleChange}
                />
                <span className="input-group-text">years</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="closing_costs">Closing Costs (%)</label>
              <div className="input-group">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="closing_costs"
                  name="closing_costs"
                  placeholder="Enter closing costs"
                  required
                  inputMode="numeric"
                  value={formData.closing_costs}
                  onChange={handleChange}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="mx-2 px-2 pb-2 my-3 p-md-4 m-md-4 border rounded">
            <h1 className="my-3 text-info">Expenses</h1>
            <div className="form-group">
              <label htmlFor="property_tax">Property Tax</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="property_tax"
                  name="property_tax"
                  placeholder="Enter property tax"
                  required
                  inputMode="numeric"
                  value={formData.property_tax}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="insurance">Insurance</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="insurance"
                  name="insurance"
                  placeholder="Enter insurance cost"
                  required
                  inputMode="numeric"
                  value={formData.insurance}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="gas_electric">Gas/Electric</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="gas_electric"
                  name="gas_electric"
                  placeholder="Enter gas/electric cost"
                  required
                  inputMode="numeric"
                  value={formData.gas_electric}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="water">Water</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="water"
                  name="water"
                  placeholder="Enter water cost"
                  required
                  inputMode="numeric"
                  value={formData.water}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sewer_drainage">Sewer/Drainage</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="sewer_drainage"
                  name="sewer_drainage"
                  placeholder="Enter sewer/drainage cost"
                  required
                  inputMode="numeric"
                  value={formData.sewer_drainage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="garbage">Garbage</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="garbage"
                  name="garbage"
                  placeholder="Enter garbage cost"
                  required
                  inputMode="numeric"
                  value={formData.garbage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="lawn_snow">Lawn/Snow</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="lawn_snow"
                  name="lawn_snow"
                  placeholder="Enter lawn/snow cost"
                  required
                  inputMode="numeric"
                  value={formData.lawn_snow}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="management_fees">Management Fees</label>
              <div className="input-group">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="management_fees"
                  name="management_fees"
                  placeholder="Enter management fees"
                  required
                  inputMode="numeric"
                  value={formData.management_fees}
                  onChange={handleChange}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="vacancy_percentage">Vacancy Percentage</label>
              <div className="input-group">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="vacancy_percentage"
                  name="vacancy_percentage"
                  placeholder="Enter vacancy percentage"
                  required
                  inputMode="numeric"
                  value={formData.vacancy_percentage}
                  onChange={handleChange}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="maintenance_percentage">
                Maintenance Percentage
              </label>
              <div className="input-group">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="maintenance_percentage"
                  name="maintenance_percentage"
                  placeholder="Enter maintenance percentage"
                  required
                  inputMode="numeric"
                  value={formData.maintenance_percentage}
                  onChange={handleChange}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>

          <div className="px-2 mx-2 text-end">
            <button type="submit" className="btn btn-outline-success">
              Submit
            </button>
          </div>
        </form>
      </div>

      {showAnalysis && <CreateResultDiv formData={formData} />}
    </>
  );
};

export default RealestateValuation;
