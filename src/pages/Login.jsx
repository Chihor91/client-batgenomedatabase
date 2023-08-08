// Library Imports
import { useContext } from "react"

// Component Imports
import AuthContext from "../context/AuthContext"

// Asset Imports

// Style Imports

function Login() {
    let { loginUser } = useContext(AuthContext)

    return (
        <div>
            <form onSubmit={loginUser}>
                <h1>Login</h1>
                <div>
                    <input type="text" name="username" placeholder="Enter username" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Enter password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login