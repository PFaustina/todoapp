import { Link } from "react-router-dom";



export const Navbar = () => {
    return <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/create-todos">Create Todos</Link>
        <Link to="/saved-todos">Saved Todos</Link>
        <Link to="/auth">Login/Register</Link>
    </div>

}
