//Library Imports
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'

// Component Imports
import AuthContext from '../context/AuthContext'

// Asset Imports
import reactLogo from '../assets/react.svg'

// Style Imports


function NavBar() {
    let {user, logoutUser} = useContext(AuthContext);


    return(
        <div>
            <div>
                <a href="/">
                    <img src={reactLogo} alt="React logo" />
                </a>
            </div>
            {
                <div>
                    <Link to="/">Home</Link>
                    {
                        user ?
                        <>
                            <Link to="/profile">Profile</Link>
                            <a onClick={logoutUser}>Logout</a>
                        </>
                        :
                        <Link to="/login">Login</Link>
                    }
                </div>
            }
        </div>
    )
}

export default NavBar