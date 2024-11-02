import React from "react";
import './Header.css';
import navlogo from '../../assets/Admin_Assets/nav-logo.svg'
import navProfile from '../../assets/Admin_Assets/nav-profile.svg'

const Header = () => {
  return (
    <div className="navbar">
        <img src={navlogo} alt="" className="nav-logo" />
        <img src={navProfile} alt="" className="nav-profile"/>
    </div>
  )
}

export default Header;