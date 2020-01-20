import React from 'react';
import {Link} from "react-router-dom"
import "./Header.css"
import logo from "../assets/logo.png"
import camera from "../assets/camera.svg"

export default (props)=> {
  return (
    <header id="main-header">
        <div className="header-content">
            <Link to="/feed">
                <img src={logo} alt="insta" width="140px" />
            </Link>
            <Link to="/new">
                <img src={camera} alt="enviar publicação" width="30px"/>
            </Link>
        </div>
    </header>
  );
}
