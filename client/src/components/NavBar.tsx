import React, { FC } from 'react'
import { Link } from "react-router-dom";
import "../styles/nav-bar.css";

const NavBar:FC = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="first-brand">Tour</span>
            <span className="second-brand">bay</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link
                className="nav-link"
                style={{ textDecoration: "none" }}
                to="/tours"
              >
                Tours
              </Link>
              <Link className="nav-link" to="/myTours">
                My Tours
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar
