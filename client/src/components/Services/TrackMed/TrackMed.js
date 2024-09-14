import React, { useState, useEffect } from 'react';
import './TrackMed.css';
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const TrackMed = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [patientName, setPatientName] = useState('');

  const medicine = {
    'Fever': { medName: 'Paracetamol', time: '8:00 AM' },
    'Cough': { medName: 'Cough Syrup', time: '10:00 AM' },
    'Headache': { medName: 'Ibuprofen', time: '12:00 PM' },
    'Fatigue': { medName: 'Vitamin B Complex', time: '2:00 PM' },
    'Sore throat': { medName: 'Lozenges', time: '4:00 PM' },
    'Shortness of breath': { medName: 'Inhaler', time: '6:00 PM' },
    'Nausea': { medName: 'Antiemetic', time: '8:00 PM' },
    'Muscle pain': { medName: 'Ibuprofen', time: '9:00 AM' },
    'Chest pain': { medName: 'Aspirin', time: '7:00 AM' },
    'Dizziness': { medName: 'Meclizine', time: '11:00 AM' }
  };

  useEffect(() => {
    if (user && user.displayName) {
      setPatientName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (patientName) { // Only fetch when patientName is set
      const fetchPatient = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/patients/${patientName}`);
          setPatient(response.data);
          console.log("response from backend", response.data);
          console.log("response.symptoms:", response.data.symptoms);
        } catch (err) {
          console.log(err);
        }
      };

      fetchPatient();
    }
  }, [patientName]);

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Med Name</th>
          <th>Time</th>
          <th>For (Symptoms)</th>
        </tr>
      </thead>
      <tbody>
        {patient && patient.symptoms ? (
          patient.symptoms.map((symptom, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{medicine[symptom]?.medName || 'No Medicine Found'}</td>
              <td>{medicine[symptom]?.time || 'No Time Found'}</td>
              <td>{symptom}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No Data Available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TrackMed;
