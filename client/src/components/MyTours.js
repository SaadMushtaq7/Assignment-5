import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import TripCard from "../sharedComponents/TripCard";
import Spinner from "../sharedComponents/Spinner";
import { getMyTours } from "../services/BookTours";
import { userSetTours } from "../redux/actions/filesActions";
import "../styles/tours.css";

export default function MyTours() {
  const [tourDeleted, setTourDeleted] = useState(false);

  const dispatch = useDispatch();
  const fetchMyToursResult = useCallback(async () => {
    const res = await getMyTours();
    dispatch(userSetTours(res));
  }, [dispatch]);

  const myTours = useSelector((state) =>
    state.allmytours.mytours ? state.allmytours.mytours : []
  );
  const weather = useSelector((state) =>
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
        {myTours ? (
          <>
            <div className="results">
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {myTours.length &&
                  myTours.map((mytour) => {
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
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
