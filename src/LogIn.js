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

    const [emailAlert, setEmailAlert] = useState(false);

    const [googleAlert, setGoogleAlert] = useState(false);

    function emailAlertToggle() {
        setEmailAlert(!emailAlert);
    }

    function googleAlertToggle() {
        setGoogleAlert(!googleAlert);
    }

    function signInWithEmail(email, password) {

        signInWithEmailAndPassword(email, password)
        // {
            setEmailAlert(!emailAlert);

            // if (emailError) {
            //     const errorCode = emailError.code;
            //     const errorMessage = emailError.message;
            //
            //     if (errorCode === 'auth/wrong-password') {
            //         alert('Wrong password');
            //         // some code to fix
            //     } else if (errorCode === 'auth/user-not-found') {
            //         alert('User not found');
            //     } else {
            //         alert(errorMessage);
            //     }
            // }
        // }
    }

if (googleUser || emailUser) {
    // Shouldn't happen because App should see that
    // we are signed in.
    return <h1>Unexpectedly signed in already</h1>;
} else if (googleLoading || emailLoading) {
    return <h1>Logging in…</h1>;
}

return (
    <div>
        {emailAlert && <Alert onClose={emailAlertToggle} onOK={emailAlertToggle}>
            <p>Error logging in! {emailError ? emailError.message : "error"}</p></Alert>}

        {googleAlert && <Alert onClose={googleAlertToggle} onOK={googleAlertToggle}>
            <p>Error logging in! {googleError ? googleError.message : "error"}</p></Alert>}

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
            <button onClick={() => signInWithEmail(email, password)}>
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