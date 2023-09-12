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
    return (
    <div className="auth-container">
    <form>
    <h1>Register</h1>
    <div className="form-group">
    <label htmlFor="username"> Username </label>
    <input type="text" id="username"  onChange={(event) => }/>
      </div>
    </form>
</div>


<div className="form-group">
<label htmlFor="password"> Password </label>
<input type="text" id="password"  onChange={(event) => }/>
  </div>
</form>
</div>
    )
}