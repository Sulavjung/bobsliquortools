import React, { useState } from "react";
import MonthlyReport from "./monthlyReport";

const SalesForm = () => {
  const [monthlyGrossSale, setMonthlyGrossSale] = useState("116744.66");
  const [lottoSale, setLottoSale] = useState("48091");
  const [grocerySale, setGrocerySale] = useState("68653.66");
  const [lottoCommissionPercentage, setLottoCommissionPercentage] =
    useState("6");
  const [groceryProfitPercentage, setGroceryProfitPercentage] = useState("35");
  const [lottoCashout, setLottoCashout] = useState("45000");
  const [cashoutCommissionPercentage, setCashoutCommissionPercentage] =
    useState("1");
  const [showReport, setShowReport] = useState(false);
  const [formData, setFormData] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
		  monthlyGrossSale,
		  lottoSale,
		  grocerySale,
		  lottoCommissionPercentage,
		  groceryProfitPercentage,
		  lottoCashout,
		  cashoutCommissionPercentage,
		};

		setFormData(data);
		console.log("Form submitted!", formData);
		// Pass the formData to the SalesReport component as a prop
		// You can render the SalesReport component here or pass the formData to a parent component to handle the rendering
		setShowReport(true);
	  };

  return (
    <>
    <div className="container shadow py-2 rounded ">
      <div className="p-4">
        <h1 className="text-center fw-bold text-info">Sales Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="monthlyGrossSale" className="fw-bold">
              Monthly Gross Sale
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                id="monthlyGrossSale"
                value={monthlyGrossSale}
                onChange={(e) => setMonthlyGrossSale(e.target.value)}
				required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="lottoSale" className="fw-bold">
                Lotto Sale
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  id="lottoSale"
                  value={lottoSale}
                  onChange={(e) => setLottoSale(e.target.value)}
				  required
                />
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="lottoCommissionPercentage" className="fw-bold">
                Commission (%)
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="lottoCommissionPercentage"
                  value={lottoCommissionPercentage}
                  onChange={(e) => setLottoCommissionPercentage(e.target.value)}
				  required
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>
		  <div className="row">
            <div className="form-group col">
              <label htmlFor="lottoCashout" className="fw-bold">
                Lotto Cashout
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  id="lottoCashout"
                  value={lottoCashout}
                  onChange={(e) => setLottoCashout(e.target.value)}
				  required
                />
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="cashoutCommissionPercentage" className="fw-bold">
                Cashout Comm (%)
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="cashoutCommissionPercentage"
                  value={cashoutCommissionPercentage}
                  onChange={(e) =>
                    setCashoutCommissionPercentage(e.target.value)
                  }
				  required
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="grocerySale" className="fw-bold">
                Grocery Sale
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  id="grocerySale"
                  value={grocerySale}
                  onChange={(e) => setGrocerySale(e.target.value)}
				  required
                />
              </div>
            </div>

            <div className="form-group col">
              <label htmlFor="groceryProfitPercentage" className="fw-bold">
                Grocery Profit (%)
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="groceryProfitPercentage"
                  value={groceryProfitPercentage}
                  onChange={(e) => setGroceryProfitPercentage(e.target.value)}
				  required
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>
          
          <button type="submit" className="btn btn-outline-success">
            Show Report
          </button>
        </form>
      </div>
    </div>

    {showReport && <MonthlyReport data = {formData}/>}
    </>
  );
};

export default SalesForm;
