import React from "react";
import downloadDivAsJPEG from "../divtoPng";
import downloadDivAsPDF from "../divtopdf";
import AmortizationCalculator from "./Amortization/AmortizationCalculator";

function CreateResultDiv(formData) {
  console.log(formData);
  //creating variables from the formData
  const {
    sales_price,
    current_rent_price,
    market_rent_price,
    down_payment_percentage,
    interest_rate,
    loan_terms,
    closing_costs,
    property_tax,
    insurance,
    gas_electric,
    water,
    sewer_drainage,
    garbage,
    lawn_snow,
    management_fees,
    vacancy_percentage,
    maintenance_percentage,
  } = formData.formData;

  const convertedFormData = {
    sales_price: parseFloat(sales_price),
    current_rent_price: parseFloat(current_rent_price),
    market_rent_price: parseFloat(market_rent_price),
    down_payment_percentage: parseFloat(down_payment_percentage),
    interest_rate: parseFloat(interest_rate),
    loan_terms: parseInt(loan_terms),
    closing_costs: parseFloat(closing_costs),
    property_tax: parseFloat(property_tax),
    insurance: parseFloat(insurance),
    gas_electric: parseFloat(gas_electric),
    water: parseFloat(water),
    sewer_drainage: parseFloat(sewer_drainage),
    garbage: parseFloat(garbage),
    lawn_snow: parseFloat(lawn_snow),
    management_fees: parseFloat(management_fees),
    vacancy_percentage: parseFloat(vacancy_percentage),
    maintenance_percentage: parseFloat(maintenance_percentage),
  };

  //constant variables.
  var closing_cost = Math.floor((closing_costs * sales_price) / 100);

  var property_tax_month = Math.floor(property_tax / 12);
  const ownerPaidUtilities =
    parseFloat(gas_electric) +
    parseFloat(water) +
    parseFloat(lawn_snow) +
    parseFloat(sewer_drainage) +
    parseFloat(garbage);

  // current rent related variables.
  const c_property_management = Math.floor(
    (management_fees / 100) * current_rent_price
  );
  const c_vacancy_reserve = Math.floor(
    (current_rent_price * vacancy_percentage) / 100
  );
  const c_maintenance_reserve = Math.floor(
    (current_rent_price * maintenance_percentage) / 100
  );
  const c_totalOperationExpenses =
    parseFloat(c_property_management) +
    parseFloat(property_tax_month) +
    parseFloat(insurance) +
    parseFloat(ownerPaidUtilities) +
    parseFloat(c_vacancy_reserve) +
    parseFloat(c_maintenance_reserve);
  const c_monthly_NOI = current_rent_price - c_totalOperationExpenses;
  const c_annualized_NOI = c_monthly_NOI * 12;
  const c_capitalization_rate = (
    (c_annualized_NOI / sales_price) *
    100
  ).toFixed(2);

  //Projected Rent related variables.
  const p_property_management = Math.floor(
    (management_fees / 100) * market_rent_price
  );
  const p_vacancy_reserve = Math.floor(
    (market_rent_price * vacancy_percentage) / 100
  );
  const p_maintenance_reserve = Math.floor(
    (market_rent_price * maintenance_percentage) / 100
  );
  const p_totalOperationExpenses =
    parseFloat(p_property_management) +
    parseFloat(property_tax_month) +
    parseFloat(insurance) +
    parseFloat(ownerPaidUtilities) +
    parseFloat(p_vacancy_reserve) +
    parseFloat(p_maintenance_reserve);
  const p_monthly_NOI = market_rent_price - p_totalOperationExpenses;
  const p_annualized_NOI = p_monthly_NOI * 12;
  const p_capitalization_rate = (
    (p_annualized_NOI / sales_price) *
    100
  ).toFixed(2);

  //Mortgage calculator:
  const loanToValueRatio =
    ((sales_price * (1 - down_payment_percentage / 100)) / sales_price) * 100;
  const loanAmount = sales_price * (1 - down_payment_percentage / 100);
  const downPayment = sales_price - loanAmount;

  function calculateMonthlyMortgage(pv, rate, nper) {
    var monthlyRate = rate / 1200; // divide annual rate by 1200 to get monthly rate
    var monthlyPayment = PMT(monthlyRate, nper, pv);
    return monthlyPayment.toFixed(2); // round to 2 decimal places
  }

  function PMT(rate, nper, pv) {
    return (rate * pv) / (1 - Math.pow(1 + rate, -nper));
  }

  const monthlyMortgage = calculateMonthlyMortgage(
    loanAmount,
    interest_rate,
    loan_terms * 12
  );

  //current profit data.
  var monthlyNet =
    parseFloat(current_rent_price) -
    parseFloat(monthlyMortgage) -
    parseFloat(c_totalOperationExpenses);
  monthlyNet = monthlyNet.toFixed(2);
  var annualizedNet = monthlyNet * 12;
  annualizedNet = annualizedNet.toFixed(2);
  const annualizedROI = ((annualizedNet / downPayment) * 100).toFixed(2);

  //projected data.
  var p_monthlyNet =
    parseFloat(market_rent_price) -
    parseFloat(monthlyMortgage) -
    parseFloat(p_totalOperationExpenses);
  p_monthlyNet = p_monthlyNet.toFixed(2);

  const p_annualizedNet = p_monthlyNet * 12;
  const p_annualizedROI = ((p_annualizedNet / downPayment) * 100).toFixed(2);

  function calculateAmortization(principal, interestRate, loanTerm) {
    // Convert interest rate to decimal and calculate monthly interest rate
    const monthlyInterestRate = interestRate / 100 / 12;

    // Convert loan term to months
    const loanTermMonths = loanTerm * 12;

    // Calculate the monthly payment using the loan formula
    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));

    // Initialize variables for the schedule
    let remainingBalance = principal;
    const amortizationSchedule = [];

    // Calculate the amortization schedule
    for (let month = 1; month <= loanTermMonths; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;

      remainingBalance -= principalPayment;

      amortizationSchedule.push({
        month,
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: remainingBalance.toFixed(2),
      });
    }

    return amortizationSchedule;
  }

  // Example usage
  const principal = 100000; // Loan amount
  const interestRate = 5; // Annual interest rate
  const loanTerm = 10; // Loan term in years

  const schedule = calculateAmortization(principal, interestRate, loanTerm);
  console.log(schedule);

  return (
    <>
      <div>
        <div className="pb-5" id="realestatereport">
          <div className="wrapper">
            <div className="mt-5">
              <div className="text-start shadow rounded p-3 column border">
                <h1 className="text-center fw-bold text-info">
                  Current Market Value
                </h1>
                <table className="table mt-3">
                  <tr>
                    <th colspan="2" className="text-start text-primary">
                      <h5 className="px-0 pb-0 fw-bold">Income</h5>
                    </th>
                  </tr>
                  <tr>
                    <td>Gross Rents:</td>
                    <td className="text-center currency">
                      {current_rent_price}
                    </td>
                  </tr>
                </table>
                <table className="table mt-3">
                  <tr>
                    <th colspan="2" className="text-start text-primary pt-3">
                      <h5 className="px-0 pb-0 fw-bold">Expenses</h5>
                    </th>
                  </tr>
                  <tr>
                    <td>Property Management:</td>
                    <td className="text-center currency">
                      {c_property_management}
                    </td>
                  </tr>
                  <tr>
                    <td>Property Taxes:</td>
                    <td className="text-center currency">
                      {property_tax_month}
                    </td>
                  </tr>
                  <tr>
                    <td>Insurance:</td>
                    <td className="text-center currency">{insurance}</td>
                  </tr>
                  <tr>
                    <td>Owner Paid Utilities:</td>
                    <td className="text-center currency">
                      {ownerPaidUtilities}
                    </td>
                  </tr>
                  <tr>
                    <td>Vacancy Reserve:</td>
                    <td className="text-center currency">
                      {c_vacancy_reserve}
                    </td>
                  </tr>
                  <tr>
                    <td>Maintenance Reserve:</td>
                    <td className="text-center currency">
                      {c_maintenance_reserve}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Operation Expenses:</td>
                    <td className="text-center currency">
                      {c_totalOperationExpenses}
                    </td>
                  </tr>
                </table>
                <table className="table mt-3">
                  <tr>
                    <th colspan="2" className="text-start text-primary">
                      <h5 className="px-0 pb-0 fw-bold">Operation Income</h5>
                    </th>
                  </tr>
                  <tr>
                    <td>Monthly NOI:</td>
                    <td className="text-center currency">{c_monthly_NOI}</td>
                  </tr>
                  <tr>
                    <td>Annualized NOI:</td>
                    <td className="text-center currency">{c_annualized_NOI}</td>
                  </tr>
                  <tr>
                    <td>Capitalization Rate:</td>
                    <td className="text-center percentage">
                      {c_capitalization_rate}
                    </td>
                  </tr>
                </table>
              </div>

              <div className="text-start shadow rounded p-3 column mt-5 border">
                <table className="table">
                  <tr>
                    <th colspan="2" className="text-center text-info fw-bold">
                      <h1>Current Profit or Loss</h1>
                    </th>
                  </tr>
                  <tr>
                    <td>Monthly Net</td>
                    <td className="currency">{monthlyNet}</td>
                  </tr>
                  <tr>
                    <td>Annualized Net</td>
                    <td className="currency">{annualizedNet}</td>
                  </tr>
                  <tr>
                    <td>Annualized ROI</td>
                    <td className="percentage">{annualizedROI}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-start shadow rounded p-3 column border">
                <h1 className="text-center text-info fw-bold">
                  Projected Market Value
                </h1>
                <table className="table mt-3">
                  <tr>
                    <th colspan="2" className="text-start text-primary">
                      <h5 className="px-0 pb-0 fw-bold">Income</h5>
                    </th>
                  </tr>
                  <tr>
                    <td>Gross Rents:</td>
                    <td className="text-center currency">
                      {market_rent_price}
                    </td>
                  </tr>
                </table>
                <table className="table mt-3">
                  <tr>
                    <th colspan="2" className="text-start text-primary pt-3">
                      <h5 className="px-0 pb-0 fw-bold">Expenses</h5>
                    </th>
                  </tr>
                  <tr>
                    <td>Property Management:</td>
                    <td className="text-center currency">
                      {p_property_management}
                    </td>
                  </tr>
                  <tr>
                    <td>Property Taxes:</td>
                    <td className="text-center currency">
                      {property_tax_month}
                    </td>
                  </tr>
                  <tr>
                    <td>Insurance:</td>
                    <td className="text-center currency">{insurance}</td>
                  </tr>
                  <tr>
                    <td>Owner Paid Utilities:</td>
                    <td className="text-center currency">
                      {ownerPaidUtilities}
                    </td>
                  </tr>
                  <tr>
                    <td>Vacancy Reserve:</td>
                    <td className="text-center currency">
                      {p_vacancy_reserve}
                    </td>
                  </tr>
                  <tr>
                    <td>Maintenance Reserve:</td>
                    <td className="text-center currency">
                      {p_maintenance_reserve}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Operation Expenses:</td>
                    <td className="text-center currency">
                      {p_totalOperationExpenses}
                    </td>
                  </tr>
                </table>
                <table className="table mt-3">
                  <tr>
                    <th colspan="2" className="text-start text-primary">
                      <h5 className="px-0 pb-0 fw-bold">Operation Income</h5>
                    </th>
                  </tr>
                  <tr>
                    <td>Monthly NOI:</td>
                    <td className="text-center currency">{p_monthly_NOI}</td>
                  </tr>
                  <tr>
                    <td>Annualized NOI:</td>
                    <td className="text-center currency">{p_annualized_NOI}</td>
                  </tr>
                  <tr>
                    <td>Capitalization Rate:</td>
                    <td className="text-center percentage">
                      {p_capitalization_rate}
                    </td>
                  </tr>
                </table>
              </div>

              <div className="text-start shadow rounded p-3 column mt-5 border">
                <table className="table">
                  <tr>
                    <th colspan="2" className="text-center text-info fw-bold">
                      <h1>Projected Profit or Loss</h1>
                    </th>
                  </tr>
                  <tr>
                    <td>Monthly Net</td>
                    <td className="currency">{p_monthlyNet}</td>
                  </tr>
                  <tr>
                    <td>Annualized Net</td>
                    <td className="currency">{p_annualizedNet.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Annualized ROI</td>
                    <td className="percentage">{p_annualizedROI}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-start shadow rounded p-3 column border">
                <table className="table">
                  <tr>
                    <th colspan="2" className="text-center text-info fw-bold">
                      <h1>Mortgage Calculator</h1>
                    </th>
                  </tr>
                  <tr>
                    <td>Sales Price</td>
                    <td className="currency">{sales_price}</td>
                  </tr>
                  <tr>
                    <td>Loan to Value Ratio</td>
                    <td className="percentage">{loanToValueRatio}</td>
                  </tr>
                  <tr>
                    <td>Down Payment</td>
                    <td className="currency">{downPayment}</td>
                  </tr>
                  <tr>
                    <td>Closing Costs</td>
                    <td className="currency">{closing_cost}</td>
                  </tr>
                  <tr>
                    <td>Principal</td>
                    <td className="currency">{loanAmount}</td>
                  </tr>
                  <tr>
                    <td>Interest Rate</td>
                    <td className="percentage">{interest_rate}</td>
                  </tr>
                  <tr>
                    <td>Term(Years)</td>
                    <td>{loan_terms} years</td>
                  </tr>
                  <tr>
                    <td>Monthly Mortgage</td>
                    <td className="currency">{monthlyMortgage}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow border rounded mb-5">
          <AmortizationCalculator
            principal={loanAmount}
            interestRate={interest_rate}
            loanTerm={loan_terms}
          />
        </div>
        <div className="text-end mb-5">
          <button
            className="btn btn-outline-success mx-1"
            onClick={() =>
              downloadDivAsJPEG("realestatereport", `Report.jpg`, 1)
            }
          >
            Download Image
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => downloadDivAsPDF("realestatereport", `Report.jpg`)}
          >
            Download as PDF
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateResultDiv;
