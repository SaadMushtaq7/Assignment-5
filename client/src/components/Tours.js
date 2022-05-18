import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Grid } from "@mui/material";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@mui/material/Box";
import TripCard from "../sharedComponents/TripCard";
import { fetchWeather } from "../services/Weather";
import { fetchTours } from "../services/Tours";
import { setTours, setWeather } from "../redux/actions/filesActions";
import "../styles/tours.css";

export default function Tours() {
  const dispatch = useDispatch();
  const location = useLocation();
  const stateReceived = location.state;
  const [filter, setFilter] = useState(null);

  const fetchWeatherResult = useCallback(async () => {
    const res = await fetchWeather(
      stateReceived.city ? stateReceived.city : "Miami"
    );
    dispatch(setWeather(res));
  }, [dispatch, stateReceived]);

  const fetchToursResult = useCallback(async () => {
    const res = await fetchTours();
    fetchWeatherResult();
    dispatch(setTours(res));
  }, [dispatch, fetchWeatherResult]);

  const tours = useSelector((state) =>
    state.alltours.tours ? state.alltours.tours : []
  );
  const weather = useSelector((state) =>
    state.allweatherupdates.weather.list
      ? state.allweatherupdates.weather.list.slice(0, 3)
      : []
  );
  useEffect(() => {
    fetchToursResult();
    if (stateReceived) {
      if (
        stateReceived.city &&
        stateReceived.priceRange === "" &&
        stateReceived.tourDate === ""
      ) {
        setFilter("city");
      } else if (
        stateReceived.city === "" &&
        stateReceived.priceRange &&
        stateReceived.tourDate === [null, null]
      ) {
        setFilter("price");
      } else {
        setFilter("city");
      }
    }
  }, [fetchToursResult, stateReceived]);

  return (
    <div className="tours-container">
      <div className="upper-display">
        {filter && (
          <>
            <h2>
              {stateReceived.city &&
                stateReceived.price &&
                stateReceived.tourDate &&
                `Top Destinations at "
              ${filter === "city" ? stateReceived.city : stateReceived.price}"`}
            </h2>
            <div className="filter-search">
              <FilterListIcon className="filter-icon" />
              <Box className="filter-box" sx={{ minWidth: 100 }}>
                <FormControl className="filter-form" fullWidth>
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="filter-select"
                    value={filter}
                    label="Filter"
                    onChange={(e) => {
                      setFilter(e.target.value);
                    }}
                  >
                    <MenuItem className="filter-option" value="city">
                      City
                    </MenuItem>
                    <MenuItem className="filter-option" value="price">
                      Price
                    </MenuItem>
                    <MenuItem className="filter-option" value="date">
                      Date
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </>
        )}
      </div>
      <div className="results">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {tours &&
            tours
              .filter((tour) => {
                if (!filter) {
                  return tour;
                } else {
                  if (filter === "city") {
                    if (
                      tour.city.toLowerCase() ===
                      stateReceived.city.toLowerCase()
                    ) {
                      return tour;
                    } else if (stateReceived.city.length === 0) {
                      return tour;
                    }
                  } else if (filter === "price") {
                    const [startPrice, endPrice] =
                      stateReceived.price.split("-");

                    if (
                      parseInt(tour.price) >= parseInt(startPrice) &&
                      parseInt(tour.price) <= parseInt(endPrice)
                    ) {
                      return tour;
                    } else if (stateReceived.price.length === 0) {
                      return tour;
                    }
                  } else if (filter === "date") {
                    return tour;
                  }

                  return null;
                }
              })
              .map((tour) => (
                <Grid item xs={2} sm={4} md={4} key={tour._id}>
                  <TripCard bookedTour={false} tour={tour} weather={weather} />
                </Grid>
              ))}
        </Grid>
      </div>
    </div>
  );
}
