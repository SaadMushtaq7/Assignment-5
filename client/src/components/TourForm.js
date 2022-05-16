import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import PhoneInput from "react-phone-number-input";
import { bookTour, updateMyTour } from "../services/BookTours";
import "react-phone-number-input/style.css";
import "../styles/tour-form.css";

export default function TourForm({ tourId, tourDetails }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numOfAdults, setNumOfAdults] = useState("");
  const [numOfChilds, setNumOfChilds] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async () => {
    if (tourDetails) {
      await updateMyTour(
        name,
        email,
        numOfAdults,
        numOfChilds,
        phoneNumber,
        paymentMethod,
        tourId,
        tourDetails._id
      );
    } else {
      await bookTour(
        name,
        email,
        numOfAdults,
        numOfChilds,
        phoneNumber,
        paymentMethod,
        tourId
      );
    }
  };

  useEffect(() => {
    if (tourDetails) {
      setName(tourDetails.name);
      setEmail(tourDetails.email);
      setNumOfAdults(tourDetails.numOfAdults);
      setNumOfChilds(tourDetails.numOfChilds);
      setPhoneNumber(tourDetails.phoneNo);
      setPaymentMethod(tourDetails.paymentMethod);
    }
  }, [tourDetails]);
  return (
    <div className="tour-form-container">
      <div className="split form">
        <div>
          <TextField
            className="input-text"
            id="outlined-basic-name"
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            InputProps={{ style: { width: 400, paddingLeft: 20 } }}
            InputLabelProps={{
              style: { width: 400, marginTop: 10 },
            }}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            className="input-text"
            id="outlined-basic-email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            InputProps={{ style: { width: 400, paddingLeft: 20 } }}
            InputLabelProps={{
              style: { width: 400, marginTop: 10 },
            }}
            variant="outlined"
          />
        </div>
        <div className="phone-number">
          <PhoneInput
            className="phone-input"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
        <div className="members">
          <TextField
            className="input-text"
            id="outlined-basic-adults"
            label="Number of Adults"
            value={numOfAdults}
            onChange={(e) => {
              setNumOfAdults(e.target.value);
            }}
            InputProps={{
              style: { width: 200, marginLeft: 0 },
            }}
            InputLabelProps={{
              style: { width: 200, marginTop: 10 },
            }}
            variant="outlined"
          />
          <TextField
            className="input-text"
            id="outlined-basic-childs"
            label="Number of Childrens"
            value={numOfChilds}
            onChange={(e) => {
              setNumOfChilds(e.target.value);
            }}
            InputProps={{
              style: { width: 180, paddingLeft: 20, marginLeft: 10 },
            }}
            InputLabelProps={{
              style: { width: 180, marginTop: 10, marginLeft: 10 },
            }}
            variant="outlined"
          />
        </div>
        <div className="payment-method">
          <Box sx={{ minWidth: 400 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Payment Method
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paymentMethod}
                label="paymentMethod"
                sx={{ minWidth: 400 }}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              >
                <MenuItem value={"Cash"}>Cash</MenuItem>
                <MenuItem value={"Check"}>Check</MenuItem>
                <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
                <MenuItem value={"Debit Card"}>Debit Card</MenuItem>
                <MenuItem value={"Mobile Payment"}>Mobile Payment</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="btn">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="error"
            className="confirm-btn"
          >
            Confirm
          </Button>
        </div>
      </div>
      <div className="split main-img">
        <img
          src="https://media.cntraveler.com/photos/5a737898b528a60bf010815f/16:9/w_2560,c_limit/Perez-Art-Museum__2018_Pe%CC%81rez-Art-Museum-Miami,-east-facade.-Photo-by-Daniel-Azoulay-Photography.jpg"
          alt="pic"
        />
      </div>
    </div>
  );
}
