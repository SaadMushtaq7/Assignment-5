import React from "react";
import SearchBar from "./SearchBar";

import "../styles/home-page.css";

export default function HomePage() {
  return (
    <div className="homepage-container">
      <div className="search-box">
        <SearchBar />
      </div>
    </div>
  );
}
