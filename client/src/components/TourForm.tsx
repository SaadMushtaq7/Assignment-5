import React, { FC, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { bookTour, updateMyTour } from "../services/BookTours";
import { BookedTourSchema } from "../models/BookedTourSchema";
import "react-phone-number-input/style.css";
import "../styles/tour-form.css";

interface Props {
    tourId?: string | any;
    tourDetails?: BookedTourSchema | any;
}

interface Errors {
    name?: string;
    email?: string;
    numOfAdults?: string;
    numOfChilds?: string;
    phoneNumber?: string;
    paymentMethod?: string;
  }
const TourForm:FC<Props> = ({ tourId, tourDetails }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numOfAdults, setNumOfAdults] = useState("");
  const [numOfChilds, setNumOfChilds] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = useCallback(
    (userName: string, userEmail: string, adults: string, childs: string, userPhone: string, payMethod: string) => {
       const tempErrors: Errors = {
        name: "",
        email: "",
        numOfAdults: "",
        numOfChilds: "",
        phoneNumber: "",
        paymentMethod: ""
       };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const numberRegex = /^\d+$/;
      if (!userName) {
        tempErrors.name = "This field is required!";
      }
      if (!emailRegex.test(userEmail)) {
        tempErrors.email = "Enter a valid Email address!";
      }
      if (!numberRegex.test(adults)) {
        tempErrors.numOfAdults = "Enter a valid Number!";
      }
      if (!numberRegex.test(childs)) {
        tempErrors.numOfChilds = "Enter a valid Number!";
      }
      if (!(numberRegex.test(userPhone) && userPhone.length === 11)) {
        tempErrors.phoneNumber = "Enter a valid Phone Number!";
      }
      if (!payMethod) {
        tempErrors.paymentMethod = "Select on option!";
      }

      return tempErrors;
    },
    []
  );

  const handleError = () => {
    setErrors(
      validate(
        name,
        email,
        numOfAdults,
        numOfChilds,
        phoneNumber,
        paymentMethod
      )
    );
    setIsSubmit(true);
  };

  const handleSubmit = useCallback(async () => {
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
  }, [
    name,
    email,
    numOfAdults,
    numOfChilds,
    phoneNumber,
    paymentMethod,
    tourId,
    tourDetails,
  ]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      handleSubmit();
    }
    if (tourDetails) {
      setName(tourDetails.name);
      setEmail(tourDetails.email);
      setNumOfAdults(tourDetails.numOfAdults);
      setNumOfChilds(tourDetails.numOfChilds);
      setPhoneNumber(tourDetails.phoneNo);
      setPaymentMethod(tourDetails.paymentMethod);
    }
  }, [tourDetails, errors, isSubmit, handleSubmit]);


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
            autoComplete="off"
          />
          <p className="error-msg">{errors.name}</p>
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
            autoComplete="off"
          />
          <p className="error-msg">{errors.email}</p>
        </div>
        <div className="phone-number">
          <TextField
            className="input-text"
            id="outlined-basic-phone"
            label="Phone No."
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            InputProps={{ style: { width: 400, paddingLeft: 20 } }}
            InputLabelProps={{
              style: { width: 400, marginTop: 10 },
            }}
            variant="outlined"
          />
          <p className="error-msg">{errors.phoneNumber}</p>
        </div>
        <div className="members">
          <div className="adults-childs">
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
            <p className="error-msg">{errors.numOfAdults}</p>
          </div>
          <div className="adults-childs">
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
            <p className="error-msg">{errors.numOfChilds}</p>
          </div>
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
          <p className="error-msg">{errors.paymentMethod}</p>
        </div>
        <div className="btn">
          <Button
            onClick={handleError}
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
  )
}

export default TourForm
