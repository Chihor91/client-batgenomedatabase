import Morphology from "./Morphology"
import Taxonomy from "./Taxonomy"


const Dashboard = () => {
    return(
        <div className="flex items-center space-x-10 mx-10 mt-[94px]">
            <Taxonomy />
            <Morphology />
        </div>
    )
}

export default Dashboard