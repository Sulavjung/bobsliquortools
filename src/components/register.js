import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";

const RegisterClosing = () => {
  const [bills, setBills] = useState([
    { name: "Penny", value: 0.01, quantity: 0 },
    { name: "Nickel", value: 0.05, quantity: 0 },
    { name: "Dime", value: 0.1, quantity: 0 },
    { name: "Quarter", value: 0.25, quantity: 0 },
    { name: "One", value: 1, quantity: 0 },
    { name: "Five", value: 5, quantity: 0 },
    { name: "Ten", value: 10, quantity: 0 },
    { name: "Twenty", value: 20, quantity: 0 },
    { name: "Fifty", value: 50, quantity: 0 },
    { name: "Hundred", value: 100, quantity: 0 },
  ]);

  const [startingBalance, setStartingBalance] = useState(300);
  const [totalBalance, setTotalBalance] = useState(0);
  const [todaysSale, setTodaysSale] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [askConfirm, setAskConfirm] = useState(false);
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

    fetch("http://98.234.226.160:3006/api/add-object", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error === "Data already exists") {
          // Show confirmation dialog for update
          setAskConfirm(true);
        } else {
          console.log("Error:", responseData.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
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
      <div className="container shadow py-2 rounded ">
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
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>${(bill.value * bill.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row text-end">
          <div className="col">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                handleClosing();
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
          <div
            className="container py-4 rounded mt-5 neon-box"
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
                    <tr className="fw-bold">
                      <td className="text-info">Today's Sale:</td>
                      <td></td>
                      <td>${todaysSale.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div></div>
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
