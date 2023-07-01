import React, { useEffect, useState } from "react";
import ObjectDisplay from "./display";

const FetchAndDisplay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the API and retrieve the objects
    fetch("http://98.234.226.160:3006/api/objects")
      .then((response) => response.json())
      .then((jsonData) => {
        // Extract one item from the data
        const extractedItem = jsonData; // Assuming the first item is extracted

        // Set the extracted item to the state
        setData(extractedItem);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>{data ? <ObjectDisplay data={data} /> : <p>Loading data...</p>}</div>
  );
};

export default FetchAndDisplay;
