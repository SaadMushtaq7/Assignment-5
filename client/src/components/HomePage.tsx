import {FC} from 'react'
import SearchBar from "./SearchBar";
import "../styles/home-page.css";

const HomePage:FC = () => {
  return (
    <div className="homepage-container">
      <div className="search-box">
        <SearchBar />
      </div>
    </div>
  )
}

export default HomePage
