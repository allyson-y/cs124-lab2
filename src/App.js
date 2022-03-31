import './App.css';
import React, {useState} from "react";

import AddButton from "./addButton";
import DeleteButton from "./deleteButton";
import TaskList from './taskList';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import Alert from "./Alert";
import SortButton from "./SortButton";

import { initializeApp } from "firebase/app";
import {
    getFirestore,
    query,
    collection,
    orderBy,
    serverTimestamp,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAwgiUzrKROpWbF5MsvzmVZR117tTiYD9s",
    authDomain: "cs124-lab3-23fc7.firebaseapp.com",
    projectId: "cs124-lab3-23fc7",
    storageBucket: "cs124-lab3-23fc7.appspot.com",
    messagingSenderId: "850754803504",
    appId: "1:850754803504:web:7fc3629eb6e96acfd61af5"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const collectionName = "todos";
const priorityLevels = ["a", "b", "c"]; //the low, medium, high display is in PriorityButtons.js

function App() {
    const [showAlert, setShowAlert] = useState(false);
    const [sort, setSort] = useState("created");

    const [todos, loading, error] = useCollectionData(query(collection(db, collectionName), orderBy(
        sort === "created"? "created" : (sort === "priority" ? "priority" : "textInput"))));

    if (loading) {
        return <div>
            <h1>To Do List</h1>
            Loading!
        </div>

    }

    if (error) {
        return error.toString();
    }

    let completedList = todos.filter(item => item.isCompleted);
    let uncompletedList = todos.filter(item => !item.isCompleted)

    function handleItemChanged(itemId, field, newValue) {
        updateDoc(doc(db, collectionName, itemId),
            {[field]: newValue});
    }

    function handleCompletedDeleted() {
        completedList.forEach(item => deleteDoc(doc(db, collectionName, item.id)));
    }

    function handleItemAdded() {
        let id = generateUniqueID();
        setDoc(doc(db, collectionName, id), {
            id: id,
            isCompleted: false,
            textInput: "",
            created: serverTimestamp(),
            priority: priorityLevels[0]
        });
    }

    function alertDelete() {
        handleCompletedDeleted()
    }

    function toggleModal() {
        setShowAlert(!showAlert);
    }

    function handleSelect(e) {
        setSort(e.target.value);
    }

    return <>
        <h1>To Do List</h1>
        {todos.length === 0 && <h4>No items</h4>}
        <div className = "sortButton">
            {todos.length > 1 && <SortButton
            handleSelect={handleSelect}
            sort={sort}
            />}
        </div>
        <TaskList
            todo={uncompletedList}
            isCompletedList={false}
            onItemChanged={handleItemChanged}
            priorityLevels={priorityLevels}
        />
        {completedList.length > 0 && <h4>Completed</h4>}
        <TaskList
            todo={completedList}
            isCompletedList={true}
            onItemChanged={handleItemChanged}
            priorityLevels={priorityLevels}
        />
        <div className="editTasks">
            <AddButton
                onItemAdded={handleItemAdded}
            />
            {completedList.length > 0 && <DeleteButton
                onItemDeleted={toggleModal}
            />}
        </div>
        <div>
            {showAlert && <Alert onClose={toggleModal} onOK={alertDelete}>
                <div>
                    Are you sure you want to delete completed tasks?
                </div>
            </Alert>}
        </div>
    </>
}

export default App;