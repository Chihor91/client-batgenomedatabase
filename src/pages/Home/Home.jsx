import { ModeToggle } from "@/components/ui/mode-toggle"
import Dashboard from "../Dashboard"


function Home(){
    return(
        <div>
            <Dashboard />
            <ModeToggle />
        </div>
    )
}

export default Home