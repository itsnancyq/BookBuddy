/* TODO - add your code to create a functional React component that renders a login form */

import { useNavigate } from "react-router-dom"
import { useState } from "react"


function Login({ isLoggedIn, setToken, setUser }) {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        const url = isLoggedIn
        ? "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login" 
        : "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register";

        try{
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Authentication  failed!")
            }

            setToken(data.token);
            setEmail({ email: data.email });
            navigate("/");

        }catch(err){
            console.error(err)
            setError(err.message || "Oh no! Something went wrong!")
        }
    };
    
    return(
        <div className="authContainer">
            <h2 className="authHeader">
                { isLoggedIn ? "Login" : "Register" }
            </h2>

            <form onSubmit={handleSubmit} className="form">
                <div>
                    <label>
                        Email:
                            <input 
                            type="text" 
                            onChange={(event) => setEmail(event.target.value)} 
                            value={email} 
                            className="formEmail"/>
                    </label>

                    <label>
                        Password:
                            <input 
                            name="password" 
                            onChange={(event) => setPassword(event.target.value)} minLength={3} 
                            value={password} 
                            className="formPassword"/>
                    </label>
                </div>

                {error && <p className="">{error}</p>}

                <button
                    type="submit"
                    className="submitButton"
                >
                    { isLoggedIn ? "Login" : "Register" }
                </button>
            </form>
        </div>
    );
};

export default Login