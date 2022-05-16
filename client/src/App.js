import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./components/HomePage";
import Tours from "./components/Tours";
import NavBar from "./components/NavBar";
import TripDetails from "./components/TripDetails";
import BookTour from "./components/BookTour";
import UpdateTour from "./components/UpdateTour";
import MyTours from "./components/MyTours";
import store from "./redux/store";
import "./App.css";

function App() {
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
            <Route path="/addTour" element={<BookTour />} />
            <Route path="/updateTour" element={<UpdateTour />} />
          </Routes>
        </>
      </Router>
    </Provider>
  );
}

export default App;
