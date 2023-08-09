//Library Imports
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

// Component Imports
import AuthContext from '../../context/AuthContext'

// Asset Imports
import reactLogo from '../../assets/react.svg'

// Style Imports
import "./SideBar.css"


function SideBar(props) {
    let {user, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()
    const [sidebarActive, setSidebarActive] = useState("sidebar-inactive");
    useEffect(() => {

        props.sidebar ?
        setSidebarActive("sidebar-active") :
        setSidebarActive("sidebar-inactive")

    }, [props.sidebar])

    return(
        <div class={sidebarActive}>
            <button class="close-btn" onClick={() => props.toggleSidebar(false)}>
                &times;
            </button>
            <ul class="routes">
                {
                    user ?
                    <>
                        <li onClick={() => navigate("/profile")}>Profile</li>
                        <li onClick={logoutUser}>Logout</li>
                    </>
                    :
                    <li onClick={() => navigate("/login")}>Login</li>
                }
            </ul>
        </div>
    )
}

export default SideBar