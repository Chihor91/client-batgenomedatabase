import AuthContext from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoutes = () =>  {
    const {logoutUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/user/isloggedin/")
        .then((res) => {
            setLoading(false)
        })
        .catch((err) => {
            logoutUser()
        })
    }, [logoutUser])

    return(
        loading ? 
        <h1>Loading</h1> :
        <Outlet />
        
    )
}

export default PrivateRoutes