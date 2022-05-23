import { ActionTypes } from "../constants/action-types";
import { TourSchema } from "../../models/TourSchema";
import { BookedTourSchema } from "../../models/BookedTourSchema";
const initialState = {
  weather: [],
  tours: [],
  mytours: [],
};

export const weatherReducer = (state = initialState, { type, payload }:{type:any,payload:any}) => {
  switch (type) {
    case ActionTypes.SET_WEATHER:
      return { ...state, weather: payload };
    default:
      return state;
  }
};

export const tourReducer = (state = initialState, { type, payload }:{type:any,payload:TourSchema}) => {
  switch (type) {
    case ActionTypes.SET_TOURS:
      return { ...state, tours: payload };
    default:
      return state;
  }
};

export const myTourReducer = (state = initialState, { type, payload }:{type:any,payload:BookedTourSchema}) => {
  switch (type) {
    case ActionTypes.SET_BOOKED_TOURS:
      return { ...state, mytours: payload };

    case ActionTypes.UPDATE_BOOKED_TOUR: {
      const updatedTour = state.mytours.filter((tour: TourSchema) =>
        tour._id === payload._id ? Object.assign(tour, payload) : tour
      );
      state.mytours = updatedTour;
      return state;
    }
    case ActionTypes.DELETE_BOOKED_TOUR: {
      const filteredTours = state.mytours.filter(
        (tour: TourSchema) => tour._id !== payload._id
      );
      state.mytours = filteredTours;
      return state;
    }

    default:
      return state;
  }
};
