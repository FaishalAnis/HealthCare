
import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox
} from "@mui/material";
// import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import swal from "sweetalert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
// import { Checkbox, FormControlLabel } from "@mui/material";

const Appointment = () => {
  const { user } = useAuth();
  const [value, setValue] = React.useState(new Date());
  const [docName, setDocName] = React.useState("");
  const [selectedSymptoms, setSelectedSymptoms] = React.useState([]);

  const doctors = [
  "Dr. Neha A Agrawal",
  "Dr. Vrushali Naik",
  "Dr. Tejaswini Manogna",
  "Dr. Aditya Gupta",
  "Dr. Vivek k Bansode",
  "Dr. Pratima J Singh",
  "Dr. Amit Lanke",
  "Dr. Johnny Pandit",
  "Dr. Sandip Nehe",
 ];

  const symptoms = [
    'Fever',
    'Cough',
    'Headache',
    'Fatigue',
    'Sore throat',
    'Shortness of breath',
    'Nausea',
    'Muscle pain',
    'Chest pain',
    'Dizziness'
  ];

  const handleChange = (event) => {
    setDocName(event.target.value);
  };

  const handleSymptomChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSymptoms(prev => checked
      ? [...prev, value]
      : prev.filter(symptom => symptom !== value)
    );
  };

  const swalAlert = () => {
    axios
    .post("http://localhost:3001/add",{name:user.displayName, symptoms:selectedSymptoms, docName:docName})
    .then((result)=>console.log(result))
    .catch((err)=> console.log(err));

    return swal("Your Appointment is Done You will Receive a mail ASAP.", {
      button: false,
      icon: "success",
    });
  };

  return (
    <Box
      id="appointment"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Container style={{ justifyContent: "center" }}>
          <Typography
            variant="h5"
            sx={{
              mt: 5,
              mb: 5,
            }}
          >
            Select your time and date for Appointment
          </Typography>
        </Container>

        <FormControl sx={{ mb: 5, minWidth: "50%" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Select Doctor Name
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={docName}
            onChange={handleChange}
            autoWidth
            label="Select Doctor Name"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              doctors.map((doc)=>(
                <MenuItem value={doc}>{doc}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <TextField
          sx={{ mb: 2 }}
          value={user.displayName}
          fullWidth
          label="Your Name"
          id="fullWidth"
        />

        <TextField
          sx={{ mb: 2 }}
          value={user.email}
          fullWidth
          label="Your Mail"
          id="fullWidth"
        />

        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <MobileDateTimePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              label="Appointment Date"
              onError={console.log}
              minDate={new Date("2024-01-01T00:00")}
              inputFormat="yyyy/MM/dd hh:mm a"
              mask="___/__/__ __:__ _M"
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider> */}

        <FormControl sx={{ mb: 5, minWidth: "50%" }}>
          <Typography variant="h6">Select Symptoms</Typography>
          {symptoms.map((symptom) => (
            <FormControlLabel
              key={symptom}
              control={
                <Checkbox
                  value={symptom}
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={handleSymptomChange}
                />
              }
              label={symptom}
            />
          ))}
        </FormControl>

        <Button
          sx={{ p: 1, mt: 2, mb: 5 }}
          onClick={swalAlert}
          fullWidth
          variant="contained"
        >
          <AddCircleIcon /> Confirm
        </Button>
      </Container>
    </Box>
  );
};

export default Appointment;
