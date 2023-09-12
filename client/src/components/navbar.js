import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";



export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
   

    return <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/create-todos">Create Todos</Link>
        <Link to="/saved-todos">Saved Todos</Link>
        <Link to="/auth">Login/Register</Link>
    </div>

}
