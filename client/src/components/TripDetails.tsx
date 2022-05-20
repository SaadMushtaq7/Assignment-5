import React from 'react'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TripDetailsTable from "../sharedComponents/TripDetailsTable";
import WeatherCard from "../sharedComponents/WeatherCard";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../styles/trip-details.css";

const TripDetails = () => {
  const location = useLocation();
  const receivedState:any = location.state;

  return (
    <div className="trip-detail-container">
      <div className="trip-title">
        <h3>{receivedState.tour.name}</h3>
      </div>
      <div className="trip-options">
        <div className="trip-option-location">
          <p>
            <LocationOnIcon /> {receivedState.tour.city}
          </p>
        </div>
        <div className="trip-option-price move-left">
          <p>$ {receivedState.tour.price}</p>
        </div>
        <div className="trip-option-duration move-left">
          <p>{receivedState.tour.duration}</p>
        </div>
      </div>
      <div className="trip-images">
        <div>
          <img
            className="main-img"
            src="https://media.cntraveler.com/photos/5a737898b528a60bf010815f/16:9/w_2560,c_limit/Perez-Art-Museum__2018_Pe%CC%81rez-Art-Museum-Miami,-east-facade.-Photo-by-Daniel-Azoulay-Photography.jpg"
            alt="pic"
          />
        </div>
        <div className="secondary-img">
          <img
            src="https://images.adsttc.com/media/images/5342/9e3f/c07a/809f/ab00/0111/large_jpg/PAMM__south_facade._Iwan_Baan._2.jpg?1396874746"
            alt="pic"
          />
        </div>
        <div className="secondary-img">
          <img
            src="https://images.adsttc.com/media/images/5342/9e3f/c07a/809f/ab00/0111/large_jpg/PAMM__south_facade._Iwan_Baan._2.jpg?1396874746"
            alt="pic"
          />
        </div>
      </div>
      <div className="trip-description">{receivedState.tour.description}</div>
      <div className="trip-table details">
        <h4>What's included</h4>
        <TripDetailsTable
          city={receivedState.tour.city}
          endDate={receivedState.tour.endDate}
          facilities={receivedState.tour.facilities}
        />
      </div>
      <div className="weather-details">
        <h4>Itinerary Schedule</h4>
        <WeatherCard weather={receivedState.weather} />
      </div>
      <div className="add-tour-btn">
        <Link
          style={{ textDecoration: "none" }}
          to="/addTour"
          state={{ tourId: receivedState.tour._id }}
        >
          <Button color="error" variant="contained">
            Book Tour
          </Button>
        </Link>
      </div>
    </div>

  )
}

export default TripDetails
