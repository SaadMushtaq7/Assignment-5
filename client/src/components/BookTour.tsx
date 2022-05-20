import { FC } from 'react'
import { useLocation } from "react-router-dom";
import TourForm from "./TourForm";
import "../styles/book-update-tour.css";

const BookTour:FC = () => {
    const location = useLocation();
    const stateReceived: any = location.state;  
  return (
    <div className="book-tour-container">
      <h2>Confirm Your Booking</h2>
      <TourForm tourId={stateReceived.tourId} />
    </div>
  )
}

export default BookTour
