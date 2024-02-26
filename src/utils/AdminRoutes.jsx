import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AdminRoutes = () =>  {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/user/isadmin/")
        .then((res) => {
            setLoading(false)
        })
        .catch((err) => {
            navigate('/login')
        })
    }, [])

    return(
        loading ? 
        <h1>Loading</h1> :
        <Outlet />
    )
}

export default AdminRoutes