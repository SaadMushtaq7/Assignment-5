import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import TripCard from "../sharedComponents/TripCard";
import { getMyTours } from "../services/BookTours";
import { fetchWeather } from "../services/Weather";
import { setBookedTours, setWeather } from "../redux/actions/filesActions";
import { BookedTourSchema } from "../models/BookedTourSchema";
import "../styles/tours.css";

const MyTours:FC = () => {
    const [tourDeleted, setTourDeleted] = useState<boolean>(false);

    const dispatch = useDispatch();

    const fetchWeatherResult = useCallback(async () => {
      const res = await fetchWeather(
        "Miami"
      );
      dispatch(setWeather(res));
    }, [dispatch]);
  
    const fetchMyToursResult = useCallback(async () => {
      const res = await getMyTours();
      fetchWeatherResult();
      dispatch(setBookedTours(res));
    }, [dispatch, fetchWeatherResult]);
  
    const myTours = useSelector((state:any) =>
      state.allmytours.mytours ? state.allmytours.mytours : []
    );
  
    const weather = useSelector((state:any) =>
      state.allweatherupdates.weather.list
        ? state.allweatherupdates.weather.list.slice(0, 3)
        : []
    );
  
    useEffect(() => {
      fetchMyToursResult();
    }, [fetchMyToursResult, tourDeleted]);
  
  return (
    <div>
      <div className="tours-container">
        {myTours && (
          <>
            <div className="results">
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {myTours &&
                  myTours.map((mytour:BookedTourSchema) => {
                    return (
                      <Grid item xs={2} sm={4} md={4} key={mytour._id}>
                        <TripCard
                          bookedTour={true}
                          tour={mytour.tours}
                          tourDetails={mytour}
                          weather={weather}
                          setTourDeleted={setTourDeleted}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MyTours
