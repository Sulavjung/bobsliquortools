const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3006;

app.use(express.json());
app.use(cors()); // Enable CORS

app.post("/api/update-object", (req, res) => {
  // Read the existing data from data.json
  fs.readFile("data.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read data file" });
    }

    const jsonData = JSON.parse(data);
    const updatedObject = req.body;

    console.log(updatedObject);

    let index = -1;

    // Find the index of the matching object based on date
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].date === updatedObject.date) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      // Update the object at the matching index
      jsonData[index] = updatedObject;

      // Write the updated data back to data.json
      fs.writeFile("data.json", JSON.stringify(jsonData), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to write data file" });
        }

        res.status(200).json({ message: "Object updated successfully" });
      });
    } else {
      res.status(404).json({ error: "No matching data found" });
    }
  });
});

app.post("/api/add-object", (req, res) => {
  // Read the existing data from data.json
  fs.readFile("data.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read data file" });
    }

    const jsonData = JSON.parse(data);
    const newObject = req.body;

    // Check if an object with the same date already exists
    const existingObject = jsonData.find((obj) => obj.date === newObject.date);

    if (existingObject) {
      // If an object with the same date exists, send a response indicating the data already exists
      return res.status(400).json({ error: "Data already exists" });
    }

    // Add the new object to the data array
    jsonData.push(newObject);

    // Write the updated data back to data.json
    fs.writeFile("data.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to write data file" });
      }

      res.status(200).json({ message: "Object added successfully" });
    });
  });
});

app.get("/api/objects", (req, res) => {
  // Read the data from data.json
  fs.readFile("data.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read data file" });
    }

    const jsonData = JSON.parse(data);

    res.status(200).json(jsonData);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
