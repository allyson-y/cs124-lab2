import './App.css';
import React from "react";

import {getAuth} from "firebase/auth";
import {
    useAuthState,
} from "react-firebase-hooks/auth";

import SignedInApp from "./SignedInApp";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import {initializeApp} from "firebase/app";
import {
    getFirestore,
} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyAwgiUzrKROpWbF5MsvzmVZR117tTiYD9s",
//     authDomain: "cs124-lab3-23fc7.firebaseapp.com",
//     projectId: "cs124-lab3-23fc7",
//     storageBucket: "cs124-lab3-23fc7.appspot.com",
//     messagingSenderId: "850754803504",
//     appId: "1:850754803504:web:7fc3629eb6e96acfd61af5"
// };
//
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
// const collectionName = "base";
// const priorityLevels = ["a", "b", "c"]; //the low, medium, high display is in PriorityButtons.js
// const initialID = "v2-1649047416480-5386782840773";

const auth = getAuth();

function App() {
    const [user, loading, error] = useAuthState(auth);

    return user ? (
        <SignedInApp
            user={user}
            auth={auth}
        />
    ) : (
        <div>
            <SignIn auth={auth}/>
            <SignUp auth={auth}/>
        </div>
    );
}
export default App;