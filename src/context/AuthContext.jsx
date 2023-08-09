// Library Imports
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(
        localStorage.getItem('authTokens') ?
        JSON.parse(localStorage.getItem('authTokens')) :
        null
    )
    const [user, setUser] = useState(
        localStorage.getItem('user') ?
        JSON.parse(localStorage.getItem('user')).access :
        null
    )
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        localStorage.getItem('authTokens') && setAuthTokens(JSON.parse(localStorage.getItem('authTokens')))
        localStorage.getItem('user') && setUser(JSON.parse(localStorage.getItem('user')))
        setLoading(true)
    }, [])
    
    if(localStorage.getItem('authTokens')){
        axios.defaults.headers.common["Authorization"] 
            = 'Bearer ' + JSON.parse(localStorage.getItem('authTokens')).access
    }
    
    const navigate = useNavigate()

    let updateToken = () => {
        if(authTokens) {
            let api = axios.create({
                baseURL: axios.defaults.baseURL + "/user/login/refresh/",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            api.post("/", {
                'refresh': authTokens.refresh,
            }).then((response) => {
                if(response.status === 200){
                    let tokens = {
                        access: response.data.access,
                        refresh: response.data.refresh
                    }
                    
                    setAuthTokens(tokens)
                    localStorage.setItem('authTokens', JSON.stringify(tokens))
                    axios.defaults.headers.common["Authorization"] 
                        = 'Bearer ' + tokens.access;
                }else{
                    logoutUser()
                }

                if(loading) {setLoading(false)}
            })
        }
    }

    let loginUser = (e) => {
        e.preventDefault()
        let api = axios.create({ baseURL: axios.defaults.baseURL + "/user/login/", })
        let fd = new FormData()
        fd.append("username", e.target.username.value);
        fd.append("password", e.target.password.value);

        api.post("/", fd).then((response) => {
            if(response.status === 200){
                let tokens = {
                    access: response.data.access,
                    refresh: response.data.refresh
                }
                setAuthTokens(tokens)
                setUser(response.data.user)
                localStorage.setItem('authTokens', JSON.stringify(tokens))
                localStorage.setItem('user', JSON.stringify(response.data.user))
                navigate("/")
            }else{
                alert("Error while trying to log in!")
            }
        })
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('user')
        navigate("/login")
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {
        if(loading) {updateToken()}

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if(authTokens) {updateToken}
        }, fourMinutes)
        
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
