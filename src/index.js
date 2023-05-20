import React from "react";
import ReactDOM from "react-dom/client";
import PriceCalculator from "./components/priceCalculator";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="px-3">
    <PriceCalculator />
  </div>
);
