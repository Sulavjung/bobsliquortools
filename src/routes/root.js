import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../index.css";
import Profilebar from "../components/partials/profilebar";

function MenuBar() {
  const location = useLocation();

  // Function to check if a link is active
  const isLinkActive = (pathname) => location.pathname === pathname;

  return (
    <div className="container pt-3">
      <Profilebar />
      <div className="paddingForNavBottom">
        <Outlet />
      </div>
      <div className="fixed-bottom">
        <ul className="navbar-nav d-flex flex-row justify-content-around shadow-lg pt-2 pb-5 bg-light">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isLinkActive("/") ? "active-link" : ""}`}
            >
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/price"
              className={`nav-link ${
                isLinkActive("/price") ? "active-link" : ""
              }`}
            >
              Price
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/restate"
              className={`nav-link ${
                isLinkActive("/restate") ? "active-link" : ""
              }`}
            >
              REstate
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/sales"
              className={`nav-link ${
                isLinkActive("/sales") ? "active-link" : ""
              }`}
            >
              Sales
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuBar;
