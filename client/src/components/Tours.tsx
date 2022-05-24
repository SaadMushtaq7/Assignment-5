import React, { FC, useCallback, useEffect, useState } from "react";
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
import { TourSchema } from "../models/TourSchema";
import "../styles/tours.css";

const Tours:FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const state:any = location.state;
    const [filter, setFilter] = useState<string>("");
    const {city, price, tourDate} = state ? state : {city:null,price:null,tourDate:null};
    const filterRef = React.useRef<HTMLSelectElement>(null);
    
    const fetchWeatherResult = useCallback(async () => {
      const res = await fetchWeather(
        state ? city : "Miami"
      );
      dispatch(setWeather(res));
    }, [dispatch, city, state]);
  
    const fetchToursResult = useCallback(async () => {
      const res = await fetchTours();
      fetchWeatherResult();
      dispatch(setTours(res));
    }, [dispatch, fetchWeatherResult]);
  
    const tours = useSelector((state:any) =>
      state.alltours.tours ? state.alltours.tours : []
    );
    const weather = useSelector((state:any) =>
      state.allweatherupdates.weather.list
        ? state.allweatherupdates.weather.list.slice(0, 3)
        : []
    );

    useEffect(() => {
      fetchToursResult();
      if (state) {
          setFilter("city");
      }
    }, [fetchToursResult, state]);
  
  return (
    <div className="tours-container">
      <div className="upper-display">
        {filter && (
          <>
            <h2>
              { `Top Destinations at "${state[`${filter}`]}"`}
            </h2>
            <div className="filter-search">
              <FilterListIcon className="filter-icon" />
              <Box className="filter-box" sx={{ minWidth: 100 }}>
                <FormControl className="filter-form" fullWidth>
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    ref={filterRef}
                    onChange={(e:React.ChangeEvent<{value:unknown}>) => {
                      setFilter(e.target.value as string);
                   }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="filter-select"
                    value={filter}
                    label="Filter"
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
          {(state) ? (
                    tours &&
                    tours
                      .filter((tour:TourSchema) => {
                        if (!filter) {
                          return tour;
                        } else {
                          if (filter === "city") {
                            if (
                              tour.city.toLowerCase() ===
                              city.toLowerCase()
                            ) {
                              return tour;
                            } else if (city.length === 0) {
                              return tour;
                            }
                          } else if (filter === "price") {
                            const [startPrice, endPrice] =
                              price.split("-");
        
                            if (
                              parseInt(tour.price) >= parseInt(startPrice) &&
                              parseInt(tour.price) <= parseInt(endPrice)
                            ) {
                              return tour;
                            } else if (price.length === 0) {
                              return tour;
                            }
                          } else if (filter === "date") {
                            if(tourDate){
                              return tour;
                            }
                            
                          }
        
                          return null;
                        }
                      })
                      .map((tour:TourSchema) => (
                        <Grid item xs={2} sm={4} md={4} key={tour._id}>
                          <TripCard tourDetails={null} setTourDeleted={null}  bookedTour={false} tour={tour} weather={weather} />
                        </Grid>
                      ))
          ):(
            tours.map((tour:TourSchema) => (
              <Grid item xs={2} sm={4} md={4} key={tour._id}>
                <TripCard tourDetails={null} setTourDeleted={null}  bookedTour={false} tour={tour} weather={weather} />
              </Grid>
            ))
          )}
          
        </Grid>
      </div>
    </div>
  )
}

export default Tours
