import { ActionTypes } from "../constants/action-types";

const initialState = {
  weather: [],
  tours: [],
  mytours: [],
};

export const weatherReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_WEATHER:
      return { ...state, weather: payload };
    default:
      return state;
  }
};

export const tourReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TOURS:
      return { ...state, tours: payload };
    default:
      return state;
  }
};

export const myTourReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_SET_TOURS:
      return { ...state, mytours: payload };

    case ActionTypes.USER_UPDATE_TOUR: {
      const tourUpdate = state.mytours.filter((tour) =>
        tour._id === payload._id ? Object.assign(tour, payload) : tour
      );
      state.mytours = tourUpdate;
      return state;
    }
    case ActionTypes.USER_DELETE_TOUR: {
      const tourDelete = state.mytours.filter(
        (tour) => tour._id !== payload._id
      );
      state.mytours = tourDelete;
      return state;
    }

    default:
      return state;
  }
};
