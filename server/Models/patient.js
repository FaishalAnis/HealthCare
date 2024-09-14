const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
  name: { type: String, required: true },
  symptoms: [String],
  docName: { type: String, required: true},
});

module.exports = mongoose.model('Patient', patientSchema);