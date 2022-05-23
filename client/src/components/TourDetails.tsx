import React from 'react'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TourDetailsTable from "../sharedComponents/TourDetailsTable";
import WeatherCard from "../sharedComponents/WeatherCard";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../styles/trip-details.css";

const TourDetails = () => {
  const location = useLocation();
  const state:any = location.state;
  const {tour, weather, bookedTour} = state;
  const {name,city, description, price, duration, facilities, endDate, images} = tour;
  return (
    <div className="trip-detail-container">
      <div className="trip-title">
        <h3>{name}</h3>
      </div>
      <div className="trip-options">
        <div className="trip-option-location">
          <p>
            <LocationOnIcon /> {city}
          </p>
        </div>
        <div className="trip-option-price move-left">
          <p>$ {price}</p>
        </div>
        <div className="trip-option-duration move-left">
          <p>{duration}</p>
        </div>
      </div>
      <div className="trip-images">
        <div>
          <img
            className="main-img"
            src={images[0]}
            alt="pic"
          />
        </div>
        <div className="secondary-img">
          <img
            src={images[1]}
            alt="pic"
          />
        </div>
        <div className="secondary-img">
          <img
            src={images[0]}
            alt="pic"
          />
        </div>
      </div>
      <div className="trip-description">{description}</div>
      <div className="trip-table details">
        <h4>What's included</h4>
        <TourDetailsTable
          city={city}
          endDate={endDate}
          facilities={facilities}
        />
      </div>
      <div className="weather-details">
        <h4>Itinerary Schedule</h4>
        <WeatherCard weather={weather} />
      </div>
      {bookedTour===false && 
      <div className="add-tour-btn">
        <Link
          style={{ textDecoration: "none" }}
          to="/addTour"
          state={{ tour: tour }}
        >
          <Button color="error" variant="contained">
            Book Tour
          </Button>
        </Link>
      </div>
      }
    </div>

  )
}

export default TourDetails
