

function Login() {
    return (
        <body>
            <div>
                <form>
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
        </body>
    )
}

export default Login