import { ActionTypes } from "../constants/action-types";

export const setWeather = (files) => {
  return {
    type: ActionTypes.SET_WEATHER,
    payload: files,
  };
};

export const setTours = (files) => {
  return {
    type: ActionTypes.SET_TOURS,
    payload: files,
  };
};
export const userSetTours = (files) => {
  return {
    type: ActionTypes.USER_SET_TOURS,
    payload: files,
  };
};
export const userDeleteTour = (file) => {
  return {
    type: ActionTypes.USER_DELETE_TOUR,
    payload: file,
  };
};
export const userEditTour = (file) => {
  return {
    type: ActionTypes.USER_EDIT_TOUR,
    payload: file,
  };
};
