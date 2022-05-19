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
export const userSetTours = (files:BookedTourSchema) => {
  return {
    type: ActionTypes.USER_SET_TOURS,
    payload: files,
  };
};
export const userDeleteTour = (file:BookedTourSchema) => {
  return {
    type: ActionTypes.USER_DELETE_TOUR,
    payload: file,
  };
};
export const userEditTour = (file:BookedTourSchema) => {
  return {
    type: ActionTypes.USER_UPDATE_TOUR,
    payload: file,
  };
};
