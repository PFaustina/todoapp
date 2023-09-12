export const Auth = () => {
    return (
    
    <div className="auth-container">
        {" "}
        <Login />
        <Register />
    </div>
    )
};

const Login = () => {
    return <div></div>
}

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
    <div className="auth-container">
    <form>
    <h1>Register</h1>
    <div className="form-group">
    <label htmlFor="username"> Username </label>
    <input 
    type="text" 
    id="username"
    value={username}
    onChange={(event) => setUsername(event.target.value)}/>
      </div>
    </form>
</div>


<div className="form-group">
<label htmlFor="password"> Password </label>
<input 
type="text" 
id="password"
value={password}
 onChange={(event) => setUsername(event.target.value)}/>
  </div>

<button type="submit">Register</button>
</form>
</div>
    )
}