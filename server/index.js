const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Import the Patient model
const Patient = require("./Models/patient");

mongoose.connect("mongodb://127.0.0.1:27017/medical")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB", err));


// add patient to the db
app.post("/add", async (req, res) => {
  try {
    console.log("Add request received");
    console.log(req.body);

    const { name, symptoms, docName } = req.body;

    // Create a new patient using the Patient model
    const newPatient = new Patient({
      name,
      symptoms,
      docName
    });

    // Save the new patient to the database
    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Error adding patient", error: error.message });
  }
});

// get patient from db
app.get("/patients/:name", async (req, res) => {
  try {
    console.log("Get request received for patient:", req.params.name);

    // Retrieve the patient with the specified name from the database
    const patient = await Patient.findOne({ name: req.params.name });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error retrieving patient:", error);
    res.status(500).json({ message: "Error retrieving patient", error: error.message });
  }
});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});