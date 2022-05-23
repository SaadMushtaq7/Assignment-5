import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./components/HomePage";
import Tours from "./components/Tours";
import NavBar from "./components/NavBar";
import TourDetails from "./components/TourDetails";
import MyTours from "./components/MyTours";
import TourForm from "./components/TourForm";
import store from "./redux/store";
import "./App.css";


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
            <Route path="/tourDetails" element={<TourDetails />} />
            <Route path="/addTour" element={<TourForm />} />
            <Route path="/updateTour" element={<TourForm />} />
          </Routes>
        </>
      </Router>
    </Provider>
  );
}

export default App;
