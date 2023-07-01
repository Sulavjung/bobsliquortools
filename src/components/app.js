import React, { useState } from "react";
import PriceCalculator from "./priceCalculator";
import RegisterClosing from "./register";
import RealestateValuation from "./realestatevaluation";
import SalesForm from "./monthlyReportForm";

const App = () => {
  const [showWhat, setShowWhat] = useState("Register");

  return (
    <div className="px-2 pb-5 mainBackground">
      <div className="my-3 text-center navbarKinda">
        <div className="overflow-auto d-flex px-2 py-3 navbarKinda">
          <button
            className="btn btn-outline-success m-2 shadow"
            onClick={() => setShowWhat("Register")}
            style={{ whiteSpace: "nowrap" }}
          >
            Register
          </button>
          <button
            className="btn btn-outline-success m-2 shadow"
            onClick={() => setShowWhat("Price Calculator")}
            style={{ whiteSpace: "nowrap" }}
          >
            Price Calculator
          </button>
          <button
            className="btn btn-outline-success shadow m-2"
            onClick={() => setShowWhat("Real Estate Valuation")}
            style={{ whiteSpace: "nowrap" }}
          >
            Real Estate Valuation
          </button>
          <button
            className="btn btn-outline-success shadow m-2"
            onClick={() => setShowWhat("Sales Form")}
            style={{ whiteSpace: "nowrap" }}
          >
            Sales Form
          </button>
        </div>
      </div>
      {showWhat === "Price Calculator" && <PriceCalculator />}
      {showWhat === "Register" && <RegisterClosing />}
      {showWhat === "Real Estate Valuation" && <RealestateValuation />}
      {showWhat === "Sales Form" && <SalesForm />}
    </div>
  );
};

export default App;
