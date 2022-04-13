import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import React, {useState} from "react";

function SignUp() {
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
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
        </div>
    );
}

export default SignUp;