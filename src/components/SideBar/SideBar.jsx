//Library Imports
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

// Component Imports
import AuthContext from '../../context/AuthContext'

// Asset Imports
import reactLogo from '../../assets/react.svg'

// Style Imports
import "./SideBar.css"
import { Button } from '@/components/ui/button'


function SideBar({showSidebar, setShowSidebar}) {
    let {user, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()
    return(
        <div className={`top-0 left-0 h-full transition-all bg-accent fixed z-40 ${
            showSidebar ? "w-[200px]" : "w-0"
        }`}>
            <div className='flex h-[96px] pt-[24px] pl-[48px]'>
                {   showSidebar ? 
                    <Button variant="ghost" size='lg' className="text-4xl text-primary font-black" onClick={() => setShowSidebar(!showSidebar)}>
                        &times;
                    </Button> :
                    <Button variant="ghost" size='lg' className="text-4xl text-primary font-black" onClick={() => setShowSidebar(!showSidebar)}>
                        &#9776;
                    </Button>
                }
            </div>
            <ul className="routes">
                {
                    user ?
                    <>
                        <li onClick={() => navigate("/profile")}>Profile</li>
                        <li>Taxonomy</li>
                        <ul className="tax-bar">
                            <li onClick={() => navigate("/taxonomy/domain")}>Domain</li>
                            <li onClick={() => navigate("/taxonomy/phylum")}>Phylum</li>
                            <li onClick={() => navigate("/taxonomy/class")}>Class</li>
                            <li onClick={() => navigate("/taxonomy/order")}>Order</li>
                            <li onClick={() => navigate("/taxonomy/family")}>Family</li>
                            <li onClick={() => navigate("/taxonomy/genus")}>Genus</li>
                            <li onClick={() => navigate("/taxonomy/species")}>Species</li>
                        </ul>
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