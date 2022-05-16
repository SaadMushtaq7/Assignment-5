import React from "react";
import { useLocation } from "react-router-dom";
import TourForm from "./TourForm";
import "../styles/book-update-tour.css";

export default function UpdateTour() {
  const location = useLocation();
  const { tourDetails } = location.state;

  return (
    <div className="add-tour-container">
      <h2>Update Your Booking</h2>
      <TourForm tourDetails={tourDetails} />
    </div>
  );
}
