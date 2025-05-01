/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link } from "react-router-dom"

function NavBar({logout, token}) {

    return(
        <nav className="navBar">
            <Link to="/">Home</Link>


            {token ? (
                <>
                    <Link to="/account">Account</Link>
                    <button onClick={logout} 
                    className="submitButton"
                    >
                    Logout
                    </button>
                </>
            )  : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link> 
                </>
            )}
        </nav>
    )
}

export default NavBar