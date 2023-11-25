//Library Imports
import { useNavigate } from 'react-router-dom'


// Asset Imports
import reactLogo from '@/assets/logo.png'

// Style Imports
import { Button } from '@/components/ui/button'


function NavBar({showSideBar}) {
    let navigate = useNavigate()
    
    return(
        <nav className="overflow-hidden bg-secondary flex items-left justify-between w-[100%] h-[96px] fixed top-0">
                {/* <img className={`scale-[100%] transition-all cursor-pointer ${
                    !showSideBar && "ml-[200px]"
                }`}  src={reactLogo} alt="React logo"  onClick={() => navigate("/")} /> */}
            <div onClick={() => navigate("/")} className={` cursor-pointer text-5xl font-extrabold pt-[25px] transition-all ${
                !showSideBar ? "ml-[180px]" : "ml-[30px]"
            }`}>Cave Microbiome Database</div>
        </nav>
    )
}

export default NavBar