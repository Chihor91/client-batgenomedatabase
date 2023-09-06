//Library Imports
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
// Component Imports
import AuthContext from '../../context/AuthContext'

// Asset Imports
import reactLogo from '../../assets/react.svg'

// Style Imports
import "./SideBar.css"


function SideBar({showSidebar, setShowSidebar}) {
    let {user, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()
    return(
        <div className={`top-0 left-0 h-full transition-all bg-accent fixed z-40 ${
            showSidebar ? "w-[200px]" : "w-0"
        }`}>
            <div className='flex h-[96px] pt-[24px] pl-[48px]'>
                {   showSidebar ? 
                    <Button variant="ghost" size='lg' className="text-4xl text-primary font-primary-foreground" onClick={() => setShowSidebar(!showSidebar)}>
                        &times;
                    </Button> :
                    <Button variant="ghost" size='lg' className="text-4xl text-primary font-secondary-foreground" onClick={() => setShowSidebar(!showSidebar)}>
                        &#9776;
                    </Button>
                }
            </div>
            <ul className="h-full clear-both overflow-x-hidden">
                {
                    user ?
                    <>
                        <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/bookmarks")}>Bookmarks</Button>
                        <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>
                        
                        <div className="max-h-10 overflow-hidden hover:max-h-full transition-all">
                        <Button className="w-full text-lg" variant="ghost">Taxonomy</Button>
                            <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/domain")}>Domain</Button>
                            <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/kingdom")}>Kingdom</Button>
                            <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/phylum")}>Phylum</Button>
                            <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/class")}>Class</Button>
                            <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/order")}>Order</Button>
                            <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/family")}>Family</Button>
                            <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/genus")}>Genus</Button>
                            <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/species")}>Species</Button>
                        </div>
                        <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={logoutUser}>Logout</Button>
                    </>
                    :
                    <Button className="w-full text-lg hover:bg-black" variant="ghost" onClick={() => navigate("/login")}>Login</Button>
                }
            </ul>
        </div>
    )
}

export default SideBar