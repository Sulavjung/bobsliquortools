import React, { useState } from "react";
import AmortizationChart from "./AmortizationChart";

function AmortizationCalculator({ principal, interestRate, loanTerm }) {
  const [showWhat, setShowWhat] = useState("chart");

  const calculateAmortization = (principal, interestRate, loanTerm) => {
    // Convert interest rate to decimal and calculate monthly interest rate
    const monthlyInterestRate = interestRate / 100 / 12;

    // Convert loan term to months
    const loanTermMonths = loanTerm * 12;

    // Calculate the mortgage payment using the mortgage formula
    const mortgagePayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));

    // Initialize variables for the schedule
    let remainingBalance = principal;
    const amortizationSchedule = [];

    // Calculate the amortization schedule
    for (let month = 1; month <= loanTermMonths; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = mortgagePayment - interestPayment;

      remainingBalance -= principalPayment;

      amortizationSchedule.push({
        month,
        payment: mortgagePayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: remainingBalance.toFixed(2),
      });
    }

    return amortizationSchedule;
  };

  const schedule = calculateAmortization(principal, interestRate, loanTerm);

  const groupedSchedule = schedule.reduce((acc, entry) => {
    const year = Math.ceil(entry.month / 12);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(entry);
    return acc;
  }, {});

  return (
    <>
      <h1 className="text-center text-info text-bold p-3">
        Amortization Schedule
      </h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-outline-success mx-1"
          onClick={() => setShowWhat("chart")}
        >
          Chart
        </button>
        <button
          className="btn btn-outline-success mx-1"
          onClick={() => setShowWhat("table")}
        >
          Table
        </button>
      </div>
      {showWhat === "chart" && (
        <AmortizationChart amortizationSchedule={schedule} />
      )}
      {showWhat === "table" && (
        <div className="accordion mt-3" id="accordionExample">
          {Object.keys(groupedSchedule).map((year) => (
            <div className="accordion-item" key={year}>
              <p className="accordion-header" id={`heading${year}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${year}`}
                  aria-expanded="true"
                  aria-controls={`collapse${year}`}
                >
                  See Year {year} payment toward principal and interest.
                </button>
              </p>
              <div
                id={`collapse${year}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${year}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body  overflow-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedSchedule[year].map((entry) => (
                        <tr key={entry.month}>
                          <td>{entry.month}</td>
                          <td>${entry.payment}</td>
                          <td>${entry.principal}</td>
                          <td>${entry.interest}</td>
                          <td>${entry.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <!-- Include Bootstrap JavaScript files --> */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.7.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

export default AmortizationCalculator;
