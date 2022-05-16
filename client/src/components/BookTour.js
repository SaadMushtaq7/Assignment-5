import React from "react";
import { useLocation } from "react-router-dom";
import TourForm from "./TourForm";
import "../styles/book-update-tour.css";

export default function BookTour() {
  const location = useLocation();
  const { tourId } = location.state;
  return (
    <div className="book-tour-container">
      <h2>Confirm Your Booking</h2>
      <TourForm tourId={tourId} />
    </div>
  );
}
