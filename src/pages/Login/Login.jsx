// Library Imports
import { useContext, useEffect } from "react"

// Component Imports
import AuthContext from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
            <form className="container w-1/2 space-y-2" onSubmit={loginUser}>
                <h1 className="font-extrabold text-3xl">Login</h1>
                <Input type="text" name="username" placeholder="Enter username" />
                <Input type="password" name="password" placeholder="Enter password" />
                <Button variant="outline" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default Login