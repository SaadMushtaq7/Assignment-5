import { ActionTypes } from "../constants/action-types";
import { TourSchema } from "../../models/TourSchema";
import { BookedTourSchema } from "../../models/BookedTourSchema";



export const setWeather = (files:any) => {
  return {
    type: ActionTypes.SET_WEATHER,
    payload: files,
  };
};

export const setTours = (files:TourSchema) => {
  return {
    type: ActionTypes.SET_TOURS,
    payload: files,
  };
};
export const setBookedTours = (files:BookedTourSchema) => {
  return {
    type: ActionTypes.SET_BOOKED_TOURS,
    payload: files,
  };
};
export const deleteBookedTour = (file:BookedTourSchema) => {
  return {
    type: ActionTypes.DELETE_BOOKED_TOUR,
    payload: file,
  };
};
export const updateBookedTour = (file:BookedTourSchema) => {
  return {
    type: ActionTypes.UPDATE_BOOKED_TOUR,
    payload: file,
  };
};
