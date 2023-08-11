//Library Imports
import { useNavigate } from 'react-router-dom'


// Asset Imports
import reactLogo from '@/assets/react.svg'

// Style Imports
import { Button } from '@/components/ui/button'


function NavBar({showSideBar}) {
    let navigate = useNavigate()
    
    return(
        <nav className="bg-accent flex items-left justify-between w-[100%] h-[96px] fixed top-0">
            <div className="flex bg-destructive justify-center items-center">
                <Button variant="ghost" size="lg" className="bg-destructive left-[200px] fixed" onClick={() => navigate("/")}>
                    <img className='scale-125'  src={reactLogo} alt="React logo" />
                </Button>
            </div>
        </nav>
    )
}

export default NavBar