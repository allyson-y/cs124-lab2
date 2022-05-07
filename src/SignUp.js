import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import React, {useState} from "react";
import Alert from "./Alert";

function SignUp(props) {
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(props.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showAlert, setShowAlert] = useState(true);

    function toggleAlert() {
        setShowAlert(!showAlert);
    }

    if (user) {
        return <h1>Unexpectedly signing in already</h1>;
    } else if (loading) {
        return <h1>Signing up...</h1>;
    }

    return (
        <div>
            {error && showAlert && <Alert onClose={toggleAlert} onOK={toggleAlert}><p>Error signing up! {error.message}</p></Alert>}
            <h1>Sign Up</h1>
            <label htmlFor="email">Email: </label>
            <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <label htmlFor="password">Password: </label>
            <input
                type="text"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br/>
            <button onClick={() => createUserWithEmailAndPassword(email, password)}>
                Sign up
            </button>
            <div>
                Have an account?
                <button onClick={props.toggleSignUp}>
                    Log in
                </button>
            </div>
        </div>
    );
}

export default SignUp;