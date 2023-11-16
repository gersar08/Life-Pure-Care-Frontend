import React from "react";
import "../styles/login.css";

function Login() {


    return (
        <div className="login">
            <form>
                <label> Usuario: </label>
                <input type="text" name="usuario" />
                <br />
                <label> Password: </label>
                <input type="password" name="password" />
                <button type="submit"> Login </button>
            </form>
        </div>
    );
}

export default Login;
