import React from "react";
import TourForm from "./TourForm";
import "../styles/book-update-tour.css";
import { useLocation } from "react-router-dom";

export default function UpdateTour() {
  const location = useLocation();
  const { tourDetails } = location.state;
  console.log(tourDetails);
  return (
    <div className="add-tour-container">
      <h2>Update Your Booking</h2>
      <TourForm tourDetails={tourDetails} />
    </div>
  );
}
