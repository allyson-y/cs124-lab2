import {useSignInWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";
import React, {useState} from "react";
import Alert from "./Alert";


function LogIn(props) {
    const [signInWithGoogle, googleUser, googleLoading, googleError] =
        useSignInWithGoogle(props.auth);
    const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
        useSignInWithEmailAndPassword(props.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showAlert, setShowAlert] = useState(false);


    if (emailError){
        // return "error";
        return<Alert>
            <div>
                Account is not found
            </div>
        </Alert>;
    }


    return (
        <div>
            <h1>Log In</h1>
            <div>
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
                <button onClick={() => signInWithEmailAndPassword(email, password)}>
                    Log In
                </button>
            </div>

            <br/>

            <div>
                <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
            </div>

            Don't have an account?
            <button onClick={props.toggleSignUp}>
                Sign up
            </button>
        </div>
    );
}

export default LogIn;