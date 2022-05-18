import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogBox from "./DialogBox";
import "../styles/trip-card.css";

export default function TripCard({
  bookedTour,
  tour,
  weather,
  tourDetails,
  setTourDeleted,
}) {
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [tourDateCheck, setTourDateCheck] = useState(false);
  const deleteTour = () => {
    const [tDay, tMonth, tYear] = tour.startDate.split("-");
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear().toString();

    if (yyyy >= tYear && mm >= tMonth) {
      if (yyyy === tYear && mm === tMonth) {
        if (tDay - dd <= 3) {
          setTourDateCheck(true);
          console.log(tourDateCheck);
        }
      }
    }
    setDeleteCheck(true);
  };
  return (
    <div className="trip-card-container">
      <Card className="tour-card" sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://media.cntraveler.com/photos/5a737898b528a60bf010815f/16:9/w_2560,c_limit/Perez-Art-Museum__2018_Pe%CC%81rez-Art-Museum-Miami,-east-facade.-Photo-by-Daniel-Azoulay-Photography.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography
            className="place-name"
            gutterBottom
            variant="h5"
            component="div"
          >
            {tour.name}
          </Typography>
          <Typography className="tour-description" variant="body2">
            {tour.description}
          </Typography>
        </CardContent>
        <CardActions className="price-time">
          <p>${tour.price}</p>
          <p style={{ marginLeft: "200px" }}>
            <AccessTimeIcon /> {tour.duration}
          </p>
        </CardActions>
        {bookedTour ? (
          <div className="user-options">
            <DeleteIcon onClick={deleteTour} className="delete-btn" />
            <Link
              style={{ textDecoration: "none" }}
              to="/tripDetails"
              state={{ tour: tour, weather: weather }}
            >
              <button className="my-tours-option">View Details</button>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to="/updateTour"
              state={{ tourDetails: tourDetails }}
            >
              <button className="my-tours-option">Update</button>
            </Link>
          </div>
        ) : (
          <Link
            style={{ textDecoration: "none" }}
            to="/tripDetails"
            state={{ tour: tour, weather: weather }}
          >
            <button className="tours-option">View Details</button>
          </Link>
        )}
      </Card>
      {deleteCheck && (
        <DialogBox
          tourDateCheck={tourDateCheck}
          deleteCheck={deleteCheck}
          bookedTour={tourDetails}
          setDeleteCheck={setDeleteCheck}
          setTourDeleted={setTourDeleted}
          startDate={tour.startDate}
          tourName={tour.name}
        />
      )}
    </div>
  );
}
