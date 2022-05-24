import React, { FC, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { bookTour, updateMyTour } from "../services/BookTours";
import "react-toastify/dist/ReactToastify.css";
import "../styles/tour-form.css";
import { useLocation } from "react-router-dom";

interface Errors {
  name?: string;
  email?: string;
  numOfAdults?: string;
  numOfChilds?: string;
  phoneNumber?: string;
  paymentMethod?: string;
}

const TourForm:FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [numOfAdults, setNumOfAdults] = useState<string>("");
  const [numOfChilds, setNumOfChilds] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const location = useLocation();
  const state: any = location.state;
  const {tourDetails, tourImage,bookedTour, tour} = state ? state : {tourDetails: null,tourImage: null, bookedTour: null, tour: null}

  const errorHandling = useCallback(() =>{
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const numReg = /^\d+$/; 
    if(name.length<1){
      setErrors({name:'This field is required'})
      return true;

    }

    if(!emailReg.test(email)){
        setErrors({email:'Enter a valid Email'})
        return true
    }


    if(!numReg.test(phoneNumber) || phoneNumber.length!==11){
      setErrors({phoneNumber:'Enter a valid Phone Number i.e 03xxxxxxxxx'})
      return true;

    }
    
    if(!numReg.test(numOfAdults) || numOfAdults.length===0){
      setErrors({numOfAdults:'Enter a valid number'})
      return true;

    }

    if(!numReg.test(numOfChilds) || numOfChilds.length===0){
      setErrors({numOfChilds:'Enter a valid number'})
      return true;
    }

    if(paymentMethod.length===0){
      setErrors({paymentMethod:'Select an option'})
      return true;
    }
    return false
    
  },[email,name.length,numOfAdults, numOfChilds, paymentMethod.length, phoneNumber])

  const handleSubmit = useCallback(async () => {
    if(!errorHandling()){
      if (!tour) {
        await updateMyTour(
          name,
          email,
          numOfAdults,
          numOfChilds,
          phoneNumber,
          paymentMethod,
          tourDetails.tours._id,
          tourDetails._id
        );
        toast.success("Tour Updated!");
      } else {
        await bookTour(
          name,
          email,
          phoneNumber,
          numOfAdults,
          numOfChilds,
          paymentMethod,
          tour._id
        );
  
        setName("");
        setEmail("");
        setNumOfAdults("");
        setNumOfChilds("");
        setPhoneNumber("");
        setPaymentMethod("");
        toast.success("Tour Booked!");
      }
    }
    else{
      toast.error('Check Input Fields')
    }
    
  }, [
    name,
    email,
    phoneNumber,
    numOfAdults,
    numOfChilds,
    paymentMethod,
    tour,
    tourDetails,
    errorHandling
  ]);

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
    <>
    <h1 className="form-heading">{bookedTour ? `Update Your Booking` : `Confirm Your Booking`}</h1>
    <div className="tour-form-container">
      
      <div className="split form">
        <div>
          <TextField
            className="input-text"
            id="outlined-basic-name"
            label="Name"
            value={name}
            onChange={(e) => {
              setErrors({name:''});
              setName(e.target.value);
              
            }}
            error={Boolean(errors.name)}
            helperText={errors.name}
            InputProps={{ style: { width: 400, paddingLeft: 20 } }}
            InputLabelProps={{
              style: { width: 400, marginTop: 10 },
            }}
            variant="outlined"
            autoComplete="off"
          />
          
        </div>
        <div>
          <TextField
            className="input-text"
            id="outlined-basic-email"
            label="Email"
            value={email}
            onChange={(e) => {
              setErrors({email:''})
              setEmail(e.target.value);
              
            }}
            error={Boolean(errors.email)}
            helperText={errors.email}
            InputProps={{ style: { width: 400, paddingLeft: 20 } }}
            InputLabelProps={{
              style: { width: 400, marginTop: 10 },
            }}
            variant="outlined"
            autoComplete="off"
          />
          
        </div>
        <div className="phone-number">
          <TextField
            className="input-text"
            id="outlined-basic-phone"
            label="Phone No."
            value={phoneNumber}
            onChange={(e) => {
              setErrors({phoneNumber:''});
              setPhoneNumber(e.target.value);
              
            }}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber}
            InputProps={{ style: { width: 400, paddingLeft: 20 } }}
            InputLabelProps={{
              style: { width: 400, marginTop: 10 },
            }}
            variant="outlined"
            autoComplete="off"
          />
          
        </div>
        <div className="members">
          <div className="adults-childs">
            <TextField
              className="input-text"
              id="outlined-basic-adults"
              label="Number of Adults"
              value={numOfAdults}
              onChange={(e) => {
                setErrors({numOfAdults:''})
                setNumOfAdults(e.target.value);
                
              }}
              error={Boolean(errors.numOfAdults)}
              helperText={errors.numOfAdults}
              InputProps={{
                style: { width: 200, marginLeft: 0 },
              }}
              InputLabelProps={{
                style: { width: 200, marginTop: 10 },
              }}
              variant="outlined"
              autoComplete="off"
            />
            
          </div>
          <div className="adults-childs">
            <TextField
              className="input-text"
              id="outlined-basic-childs"
              label="Number of Childrens"
              value={numOfChilds}
              onChange={(e) => {
                setErrors({numOfChilds:''})
                setNumOfChilds(e.target.value);
              }}
              error={Boolean(errors.numOfChilds)}
              helperText={errors.numOfChilds}
              InputProps={{
                style: { width: 180, paddingLeft: 20, marginLeft: 10 },
              }}
              InputLabelProps={{
                style: { width: 180, marginTop: 10, marginLeft: 10 },
              }}
              variant="outlined"
              autoComplete="off"
            />
            
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
                  setErrors({paymentMethod:''})
                  setPaymentMethod(e.target.value);
                  
                }}
                error={Boolean(errors.paymentMethod)}
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
          src= {tourImage ? tourImage : tour.images[0]}
          alt="pic"
        />
      </div>
    </div>
    <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default TourForm
