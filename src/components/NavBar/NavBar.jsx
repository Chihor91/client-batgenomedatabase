//Library Imports
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

// Component Imports
import AuthContext from '../../context/AuthContext'

// Asset Imports
import reactLogo from '../../assets/react.svg'

// Style Imports
import './NavBar.css'


function NavBar(props) {
    let navigate = useNavigate()
    
    return(
        <nav className="navbar">
            <div className="left">
                <button className="menu-btn" onClick={() => props.toggleSidebar(true)}>&#9776;</button>
                <button className="home-btn" onClick={() => navigate("/")}>
                    <img  src={reactLogo} alt="React logo" />
                </button>
            </div>
            {
                <div className="right">
                </div>
            }
        </nav>
    )
}

export default NavBar