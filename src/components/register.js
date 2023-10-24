import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import findValidBillCombination from "./partials/findValidBillCombination";

const RegisterClosing = () => {
  const [bills, setBills] = useState([
    { name: "Penny", value: 0.01, quantity: null },
    { name: "Nickel", value: 0.05, quantity: null },
    { name: "Dime", value: 0.1, quantity: null },
    { name: "Quarter", value: 0.25, quantity: null },
    { name: "One", value: 1, quantity: null },
    { name: "Five", value: 5, quantity: null },
    { name: "Ten", value: 10, quantity: null },
    { name: "Twenty", value: 20, quantity: null },
    { name: "Fifty", value: 50, quantity: null },
    { name: "Hundred", value: 100, quantity: null },
  ]);

  const [startingBalance, setStartingBalance] = useState(300);
  const [totalBalance, setTotalBalance] = useState(0);
  const [todaysSale, setTodaysSale] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [askConfirm, setAskConfirm] = useState(false);
  const [expectedDeposit, setExpectedDeposit] = useState(0);
  const [grossSale, setGrossSale] = useState(0);
  const [scratcher, setScratcher] = useState(0);
  const [billsToKeepInRegister, setBillsToKeepInRegister] = useState([]);
  var data = {};

  const calculateTotalBalance = (callback) => {
    const total = bills.reduce((acc, bill) => {
      const quantity = bill.quantity > 0 ? bill.quantity : 0;
      return acc + bill.value * quantity;
    }, 0);
    setTotalBalance(total);

    if (typeof callback === "function") {
      callback();
    }
  };

  const handleClosing = () => {
    calculateTotalBalance(() => {
      const closingBalance = totalBalance - startingBalance;
      setTodaysSale(closingBalance);
    });

    data = {
      date: getCurrentDate(),
      bills: bills,
      startingBalance: startingBalance,
      time: getCurrentTime(),
    };

    console.log(data);
  };

  const handleTips = () => {
    const onesQuantity = bills.find((bill) => bill.name === "One").quantity;
    const fivesQuantity = bills.find((bill) => bill.name === "Five").quantity;
    const tensQuantity = bills.find((bill) => bill.name === "Ten").quantity;
    const twentiesQuantity = bills.find(
      (bill) => bill.name === "Twenty"
    ).quantity;

    const combination = findValidBillCombination(
      onesQuantity,
      fivesQuantity,
      tensQuantity,
      twentiesQuantity
    );

    console.log(combination);
    setBillsToKeepInRegister(combination);
    console.log(billsToKeepInRegister.length);
  };

  const handleConfirm = () => {
    data = {
      date: getCurrentDate(),
      bills: bills,
      startingBalance: startingBalance,
      time: getCurrentTime(),
    };
    fetch("http://98.234.226.160:3006/api/update-object", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData); // Handle the response data
      });
  };

  useEffect(() => {
    const closingBalance = totalBalance - startingBalance;
    setTodaysSale(closingBalance);
  }, [totalBalance, startingBalance]);

  const handleQuantityChange = (index, value) => {
    const updatedBills = [...bills];
    updatedBills[index].quantity = value;
    setBills(updatedBills);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  function getCurrentTime() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Add leading zeros to minutes if necessary
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Format the time as HH:MM AM/PM
    const formattedTime = hours + ":" + minutes + " " + ampm;

    return formattedTime;
  }

  const downloadDivAsJPEG = (divId, filename, quality) => {
    const div = document.getElementById(divId);

    html2canvas(div)
      .then((canvas) => {
        // Convert canvas to base64 JPEG data URL
        const dataURL = canvas.toDataURL("image/jpeg", quality);

        // Create an <a> tag to trigger the download
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = filename;

        // Simulate a click on the link to trigger the download
        link.click();
      })
      .catch((error) => {
        console.error("Error generating screenshot:", error);
      });
  };

  return (
    <>
      <div className="container shadow py-2 rounded">
        <h1 className="text-center fw-bold text-info">Register</h1>

        <label className="fw-bold">Starting Balance:</label>
        <input
          type="number"
          inputMode="numeric"
          className="form-control"
          value={startingBalance}
          onChange={(e) => setStartingBalance(parseInt(e.target.value))}
          prefix="$"
        />

        <div className="d-flex align-items-center rounded border bg-danger text-light fw-medium p-4 py-2 mt-3">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-exclamation-triangle"
              viewBox="0 0 16 16"
            >
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
            </svg>
          </div>
          <div className="ms-3 fs-6">
            Warning: Do not go back or to another link. The filled data will be
            removed.
          </div>
        </div>

        <br />
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>Bills</th>
              <th>Value</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index}>
                <td>{bill.name}</td>
                <td>${bill.value}</td>
                <td>
                  <input
                    type="number"
                    inputMode="numeric"
                    className="form-control text-center"
                    value={bill.quantity}
                    onChange={(e) => {
                      handleQuantityChange(index, parseInt(e.target.value));
                      setShowReport(false);
                    }}
                  />
                </td>
                <td>${(bill.value * bill.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="mb-3">
          <tr className="fw-bold">
            <td className="text-info" colSpan="2">
              Expected Deposit:
            </td>
            <td>
              <input
                type="number"
                inputMode="numeric"
                className="form-control text-center"
                value={expectedDeposit}
                onChange={(e) => {
                  setExpectedDeposit(e.target.value);
                  setShowReport(false);
                }}
              />
            </td>
          </tr>
          <tr className="fw-bold">
            <td className="text-info" colSpan="2">
              Gross Sale:
            </td>
            <td>
              <input
                type="number"
                inputMode="numeric"
                className="form-control text-center"
                value={grossSale}
                onChange={(e) => {
                  setGrossSale(e.target.value);
                  setShowReport(false);
                }}
              />
            </td>
          </tr>
          <tr className="fw-bold">
            <td className="text-info" colSpan="2">
              Scratcher:
            </td>
            <td>
              <input
                type="number"
                inputMode="numeric"
                className="form-control text-center"
                value={scratcher}
                onChange={(e) => {
                  setScratcher(e.target.value);
                  setShowReport(false);
                }}
              />
            </td>
          </tr>
        </table>

        <div className="row text-end">
          <div className="col">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                handleClosing();
                handleTips();
                setShowReport(true);
              }}
            >
              Show Report
            </button>
          </div>
        </div>
      </div>

      {showReport && (
        <>
          <div className="mt-5">
            {billsToKeepInRegister !== -1 ? (
              <div className="rounded border bg-info text-white fw-bold p-4 py-2 mt-3">
                <p className="fw-bold fs-4">Tips:</p>
                <p className="mb-1">
                  You should leave the following bills in the register:
                </p>
                <ul>
                  <li>{billsToKeepInRegister.ones} - One dollar Bills.</li>
                  <li>{billsToKeepInRegister.fives} - Five dollar Bills.</li>
                  <li>{billsToKeepInRegister.tens} - Ten dollar Bills.</li>
                  <li>
                    {billsToKeepInRegister.twenties} - Twenty dollar Bills.
                  </li>
                </ul>

                <p className="mb-1">
                  You should have following bills for deposit:
                </p>
                <ul>
                  {bills.map((bill, index) => {
                    if (bill.quantity > 0) {
                      return (
                        <li>
                          {bill.name === "One"
                            ? bill.quantity - billsToKeepInRegister.ones
                            : ""}
                          {bill.name === "Five"
                            ? bill.quantity - billsToKeepInRegister.fives
                            : ""}
                          {bill.name === "Ten"
                            ? bill.quantity - billsToKeepInRegister.tens
                            : ""}
                          {bill.name === "twenties"
                            ? bill.quantity - billsToKeepInRegister.twenties
                            : ""}
                          {bill.name !== "One" &&
                          bill.name !== "Five" &&
                          bill.name !== "Ten" &&
                          bill.name !== "twenties"
                            ? bill.quantity
                            : ""}{" "}
                          - {bill.name} dollar bills.
                        </li>
                      );
                    }
                    return null; // Skip rendering if quantity is zero
                  })}
                </ul>
              </div>
            ) : null}
          </div>

          <div
            className="container py-4 rounded mt-3  neon-box"
            id="downloadReport"
          >
            <div className="row">
              <div className="col">
                <h1 className="text-center fw-bold text-info pb-0 mb-0">
                  Report
                </h1>
                <p className="text-start small m-0">
                  <strong>Date:</strong> {getCurrentDate()}
                </p>
                <p className="text-start pb-2 small pt-0">
                  <strong>Time:</strong> {getCurrentTime()}
                </p>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Bills</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((bill, index) => {
                      if (bill.quantity > 0) {
                        return (
                          <tr key={index}>
                            <td>{bill.name}</td>
                            <td>{bill.quantity}</td>
                            <td className="fw-bold">
                              ${(bill.value * bill.quantity).toFixed(2)}
                            </td>
                          </tr>
                        );
                      }
                      return null; // Skip rendering if quantity is zero
                    })}
                    <tr className="fw-bold">
                      <td className="text-info">Total Balance:</td>
                      <td></td>
                      <td>${totalBalance.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="fw-bold bg-">
                      <td className="text-danger">Deposit:</td>
                      <td></td>
                      <td>${todaysSale.toFixed(2)}</td>
                    </tr>
                    {billsToKeepInRegister !== -1 ? (
                    <tr>
                      <td colSpan={3} className="px-4">
                      <table className="table table-striped pb-0">
                        {bills.map((bill, index) => {
                          if (bill.quantity > 0) {
                            return (
                              <tr>
                                <td>${bill.value} dollar bills</td>
                                <td>
                                  {bill.name === "One"
                                    ? bill.quantity - billsToKeepInRegister.ones
                                    : ""}
                                  {bill.name === "Five"
                                    ? bill.quantity -
                                      billsToKeepInRegister.fives
                                    : ""}
                                  {bill.name === "Ten"
                                    ? bill.quantity - billsToKeepInRegister.tens
                                    : ""}
                                  {bill.name === "twenties"
                                    ? bill.quantity -
                                      billsToKeepInRegister.twenties
                                    : ""}
                                  {bill.name !== "One" &&
                                  bill.name !== "Five" &&
                                  bill.name !== "Ten" &&
                                  bill.name !== "twenties"
                                    ? bill.quantity
                                    : ""}
                                </td>
                              </tr>
                            );
                          }
                          return null; // Skip rendering if quantity is zero
                        })}
                      </table>
                      </td>
                    </tr>) : ""}
                    <tr className="fw-bold">
                      <td className="text-danger">Expected Deposit:</td>
                      <td></td>
                      <td>${expectedDeposit}</td>
                    </tr>
                    <tr className="fw-bold">
                      <td className="text-danger">
                        {todaysSale.toFixed(2) - expectedDeposit < 0
                          ? "Under"
                          : "Over"}
                      </td>
                      <td></td>
                      <td>${todaysSale.toFixed(2) - expectedDeposit}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="fw-bold">
                      <td className="text-success">Gross Sale</td>
                      <td></td>
                      <td>${grossSale}</td>
                    </tr>
                    <tr className="fw-bold">
                      <td className="text-success">Scratcher</td>
                      <td></td>
                      <td>${scratcher}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-end mt-2 mb-5">
            <button
              className="btn btn-outline-success"
              onClick={() =>
                downloadDivAsJPEG(
                  "downloadReport",
                  `Report ${getCurrentDate()}.jpg`,
                  1
                )
              }
            >
              Download Image
            </button>
          </div>
        </>
      )}

      {askConfirm && (
        <div className="popup">
          <div className="popup-content p-4 m-5">
            <p className="pb-4 fw-bold fs-5">
              Closing data already exists for{" "}
              <span className="text-primary">{getCurrentDate()}</span>. Do you
              want to update it?
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-outline-success mx-2"
                onClick={() => {
                  handleConfirm();
                  setAskConfirm(false);
                }}
              >
                Confirm
              </button>
              <button
                className="btn btn-outline-success mx-2"
                onClick={() => setAskConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterClosing;
