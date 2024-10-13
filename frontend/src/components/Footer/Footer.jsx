import React from 'react'
import './Footer.css'
import footer_logo from '../../assets/Frontend_Assets/logo_big.png'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>Tanuki</p>
            </div>
        </div>
    )
}

export default Footer