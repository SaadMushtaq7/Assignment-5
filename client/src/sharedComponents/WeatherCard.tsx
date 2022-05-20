import React, { FC } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "../styles/weather-card.css";

interface Props{
    weather:any;
}
const WeatherCard:FC<Props> = ({weather}) => {
  return (
    <div className="weather-card-container">
      {weather.map((daily:any, index:number) => {
        return (
          <Card className="weather-card" key={index} sx={{ maxWidth: 345 }}>
            <CardContent className="header">
              <p>Day {index + 1}</p>
              <p style={{ marginLeft: "200px" }}>
                <img
                  src={`http://openweathermap.org/img/w/${daily.weather[0].icon}.png`}
                  alt="forecast"
                />{" "}
                {(daily.main.temp - 273.15).toFixed(2)} &#8451;
              </p>
            </CardContent>
            <CardActions>
              <ul>
                <li>Tours with American sign Language</li>
                <li>Audio description group tours</li>
                <li>Large-print gallery notes</li>
                <li>Lunch Included</li>
              </ul>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default WeatherCard
