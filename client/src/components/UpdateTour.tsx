import React, { FC } from 'react'
import { useLocation } from "react-router-dom";
import TourForm from "./TourForm";
import "../styles/book-update-tour.css";

const UpdateTour:FC = () => {
    const location = useLocation();
    const stateReceived:any = location.state;
    
  return (
    <div className="add-tour-container">
      <h2>Update Your Booking</h2>
      <TourForm tourDetails={stateReceived.tourDetails} />
    </div>
  )
}

export default UpdateTour
