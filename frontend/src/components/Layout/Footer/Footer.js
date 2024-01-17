import React from "react";
import logo from "../../../assets/IEI_whitelogo.svg";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { Link } from 'react-router-dom'
import insta from '../../../assets/insta_logo.png'
import facebook from '../../../assets/facebook_logo.png'
import linkedin from '../../../assets/linkedin_logo.png'
import './Footer.css'

const Footer = () => {
  return (
    <section className="footer">
      <div className="f-upper">
        <div className="f-left">
          <div className="f-company">
            <div>
            <img src={logo} alt="IEI_LOGO" />
            <h3>INSTITUTE OF ENGINNERS (IEI)</h3>
            </div>
            <p>The first free end to end analytics service for the site,designed to work with enterprises of various levels and business segments</p>
          </div>
          <div className="f-social">
            <span>FOLLOW US ON</span>
            <div>
            <a href="iei"><img src={insta} alt="insta_logo"/></a>
            <a href="iei"><img src={facebook} alt="facebook_logo"/></a>
            <a href="iei"><img src={linkedin} alt="linkedin_logo"/></a>
            </div>
          </div>
        </div>
        <div className="f-right">
            <div className="f-contact">
                <span>CONTACT US</span>
               <div>
               <div>
                    <EmailRoundedIcon />
                    <p>subhamdutta460@gmail.com</p>
                </div>
                <div>
                    <LocalPhoneRoundedIcon />
                    <p>9365765523</p>
                </div>
                <div>
                    <LocalPhoneRoundedIcon />
                    <p>9365765523</p>
                </div>
                <div>
                    <BusinessRoundedIcon />
                    <p>NIT SILCHAR, 788010, Assam</p>
                </div>
               </div>
            </div>
            <div className="f-quick">
                <span>USEFUL LINKS</span>
                <ul>
                    <li><Link to="/devteam" >Developer Team</Link></li>
                    <li><Link to="/me" >Your Account</Link></li>
                    <li><Link to="/gallery" >Gallery</Link></li>
                    <li><Link to="/team" >Our Team</Link></li>
                </ul>
            </div>
        </div>
      </div>
      <div className="f-lower">
        <p>&copy; Copyright {(new Date().getFullYear())}. All Rights Reserved</p>
      </div>
    </section>
  );
};

export default Footer;
