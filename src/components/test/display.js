import React, { useState } from "react";
import downloadDivAsJPEG from "../divtoPng";

const ObjectDisplay = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <button onClick={() => handleClick(item)}>{item.date}</button>
          {selectedItem === item && (
            <div>
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
                      <strong>Date:</strong> {item.date}
                    </p>
                    <p className="text-start pb-2 small pt-0">
                      <strong>Time:</strong> {item.time}
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
                        {item.bills.map((bill, index) => {
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
                          <td>$</td>
                        </tr>
                        <tr className="fw-bold">
                          <td className="text-info">Today's Sale:</td>
                          <td></td>
                          <td>$</td>
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
                      `Report ${item.date}.jpg`,
                      1
                    )
                  }
                >
                  Download Image
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ObjectDisplay;
