import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./components/HomePage";
import Tours from "./components/Tours";
import NavBar from "./components/NavBar";
import TripDetails from "./components/TripDetails";
import MyTours from "./components/MyTours";
import store from "./redux/store";
import "./App.css";
import TourForm from "./components/TourForm";

const App:FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/searchResult" element={<Tours />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/myTours" element={<MyTours />} />
            <Route path="/tripDetails" element={<TripDetails />} />
            <Route path="/addTour" element={<TourForm />} />
            <Route path="/updateTour" element={<TourForm />} />
          </Routes>
        </>
      </Router>
    </Provider>
  );
}

export default App;
