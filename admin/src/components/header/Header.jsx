import React from "react";
import './Header.css';
import navlogo from '../../assets/Admin_Assets/nav-logo.svg'
import navProfile from '../../assets/Admin_Assets/nav-profile.svg'

const Header = () => {
  return (
    <div className="navbar">
        <img src={navlogo} alt="" className="nav-logo" />
        <div>
          {localStorage.getItem('auth-token') ? <button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Выйти</button> : <></>}
          <img src={navProfile} alt="" className="nav-profile"/>
        </div>

    </div>
  )
}

export default Header;