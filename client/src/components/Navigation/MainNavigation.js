import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

function MainNavigation(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function openDrawerHandler() {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-heading">
          <NavLink to="/">CURD</NavLink>
        </div>
        <div
          className={`navbar-menu ${drawerOpen && "active"}`}
          onClick={openDrawerHandler}
        >
          <ul class="navbar-links">
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/about">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/adduser">CREATE USER</NavLink>
            </li>
            <li>
              <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
          </ul>
          <div className="navbar-toggle" onClick={openDrawerHandler}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
