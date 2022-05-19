import React, { FC,useState } from 'react'
import { Link } from "react-router-dom";
import MUIDateRangePicker from "../sharedComponents/MUIDateRangePicker";
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TextField } from "@mui/material";
import "../styles/search-bar.css";



const SearchBar:FC = () => {
  const [priceRange, setPriceRange] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [tourDate, setTourDate] = useState<DateRange<Date>>([null, null]);
  
  return (
    <div className="searchbar-container">
      <div className="container">
        <div className="search-filter row">
          <div className="col-sm style-margin">
            <p className="main-option">
              <i className="fa-solid fa-location-dot" /> Location
            </p>
            <TextField
              //d="standard-basic"
              label="City"
              variant="standard"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              color="error"
            />
          </div>
          <div className="col-sm style-margin">
            <p className="main-option">
              <i className="fa-regular fa-calendar-days"></i> Choose Date
            </p>
            <MUIDateRangePicker setTourDate={setTourDate} />
          </div>
          <div className="col-sm">
            <p className="main-option">
              <i className="fa-solid fa-dollar-sign"></i> Price Range
            </p>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Here</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priceRange}
                label="priceRange"
                onChange={(e) => setPriceRange(e.target.value as string)}
              >
                <MenuItem value={"50-200"}>$50-$200</MenuItem>
                <MenuItem value={"200-400"}>$200-$400</MenuItem>
                <MenuItem value={"400-500"}>$400-$500</MenuItem>
                <MenuItem value={"500-750"}>$500-$750</MenuItem>
                <MenuItem value={"750-1000"}>$750-$1000</MenuItem>
                <MenuItem value={"1000 Above"}>$1000 Above</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="search">
            <Link
              style={{ textDecoration: "none" }}
              state={{ city: city, price: priceRange, tourDate: tourDate }}
              to="/searchResult"
            >
              <button className="search-btn">
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </Link>
          </div>
        </div>
        <div className="popular row">
          <div className="title">
            <h2>Popular Search</h2>
          </div>
          <div>
            <p>Istanbul</p>
            <p>Dubai</p>
            <p>Miami</p>
            <p>Chicago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar
