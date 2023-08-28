// Library Imports
import { useContext, useEffect } from "react"

// Component Imports
import AuthContext from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

// Asset Imports

// Style Imports

function Login() {
    let { loginUser } = useContext(AuthContext)
    let navigate = useNavigate()

    useEffect(() => {
        localStorage.getItem('authTokens') && navigate("/")
    }, [])

    return (
        <div>
            <form onSubmit={loginUser}>
                <h1>Login</h1>
                <input class='text-black' type="text" name="username" placeholder="Enter username" />
                <input class='text-black' type="password" name="password" placeholder="Enter password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login