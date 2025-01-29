import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../../../assets/IEI_logo.svg";
import Button from "@mui/material/Button";
import ScrollLink from "../../utils/ScrollLink";
import home from "../../../assets/home.svg";
import about from "../../../assets/about.svg";
import gallery from "../../../assets/gallery.svg";
import team from "../../../assets/teams.svg";
import events from "../../../assets/events.svg";
import contact from "../../../assets/contact.svg";
import merch from "../../../assets/merch.svg";

const Navbar = ({ isAuthenticated, user }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Get current path

  const handleClose = () => {
    if (mobileMenu) {
      setMobileMenu(false);
    }
  };

  return (
    <nav className="n-wrapper" onClick={handleClose}>
      <div className="n-left">
        <Link to="/">
          <img alt="IEI_logo" src={logo} size="lg" className="n-logo" />
        </Link>
      </div>
      <div className="n-right">
        <div className="n-list" style={{ right: mobileMenu ? "0px" : "" }}>
          <ul>
            <li className="n-cross">
              <ClearIcon onClick={() => setMobileMenu(false)} />
            </li>

            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active-link" : ""}
                onClick={() => setMobileMenu(false)}>
                {mobileMenu ? (
                  <div className="iconset">
                    <img src={home} alt="home" width={25} className="icon" />
                    <span className="icon-name">Home</span>
                  </div>
                ) : (
                  "Home"
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className={location.pathname === "/events" ? "active-link" : ""}
                onClick={() => setMobileMenu(false)}>
                {mobileMenu ? (
                  <div className="iconset">
                    <img src={events} alt="events" width={25} className="icon" />
                    <span className="icon-name">Events</span>
                  </div>
                ) : (
                  "Events"
                )}
              </Link>
            </li>

            <li>
              <Link
                to="/gallery"
                className={location.pathname === "/gallery" ? "active-link" : ""}
                onClick={() => setMobileMenu(false)}>
                {mobileMenu ? (
                  <div className="iconset">
                    <img src={gallery} alt="gallery" width={25} className="icon" />
                    <span className="icon-name">Gallery</span>
                  </div>
                ) : (
                  "Gallery"
                )}
              </Link>
            </li>

            <li>
              <Link
                to="/merch"
                className={location.pathname === "/merch" ? "active-link" : ""}
                onClick={() => setMobileMenu(false)}>
                {mobileMenu ? (
                  <div className="iconset">
                    <img src={merch} alt="merch" width={25} className="icon" />
                    <span className="icon-name">Merch</span>
                  </div>
                ) : (
                  "Merchandise"
                )}
              </Link>
            </li>

            <li>
              <Link
                to="/team"
                className={location.pathname === "/team" ? "active-link" : ""}
                onClick={() => setMobileMenu(false)}>
                {mobileMenu ? (
                  <div className="iconset">
                    <img src={team} alt="team" width={25} className="icon" />
                    <span className="icon-name">Team</span>
                  </div>
                ) : (
                  "Our Team"
                )}
              </Link>
            </li>

            

            <li>
              <Link
                to="/contact"
                className={location.pathname === "/contact" ? "active-link" : ""}
                onClick={() => setMobileMenu(false)}>
                {mobileMenu ? (
                  <div className="iconset">
                    <img src={contact} alt="contact" width={25} className="icon" />
                    <span className="icon-name">Contact Us</span>
                  </div>
                ) : (
                  "Contact Us"
                )}
              </Link>
            </li>
          </ul>
        </div>

        <div className="n-account">
          {user && user.role === "admin" && <Link to="/admin/mail">Mail</Link>}
          <Link to={isAuthenticated ? "/me" : "/login"}>
            {isAuthenticated ? (
              <Button sx={{ border: "0", color: "#6846f8" }} endIcon={<Avatar src={user && user.avatar.url} />}>
                {user && user.name.split(" ")[0]}
              </Button>
            ) : (
              <Button 
  variant="contained" 
  sx={{ backgroundColor: "#8269ec", ":hover": { backgroundColor: "#3b11a0" } }} 
  disableElevation 
  endIcon={<LoginIcon />}
>
  Login
</Button>
            )}
          </Link>
          <div className="n-bars">
            <MenuIcon onClick={() => setMobileMenu(true)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
