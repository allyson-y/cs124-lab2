import './App.css';
import React, {useState} from "react";

import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

import SignedInApp from "./SignedInApp";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const auth = getAuth();

function App() {
    const [user, loading, error] = useAuthState(auth);
    const [showSignUp, setShowSignUp] = useState(false);

    if (loading) {
        return <h1> Loading... </h1>
    }

    if (error) {
        return <h1> {error} </h1>;
    }

    function toggleSignUp() {
        setShowSignUp(!showSignUp);
    }

    return <span>
        {user ?
            <SignedInApp
                user={user}
                auth={auth}
            />
            :
            <div>
                {showSignUp ?
                    <SignUp
                    auth={auth}
                    toggleSignUp={toggleSignUp}/>
                    :
                    <SignIn
                    auth={auth}
                    toggleSignUp={toggleSignUp} />}
            </div>
        }
    </span>;
}
export default App;