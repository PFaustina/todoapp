import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";



export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
   
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/auth");
      };


    return <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/create-todos">Create Todos</Link>
        <Link to="/saved-todos">Saved Todos</Link>
        {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>

}
