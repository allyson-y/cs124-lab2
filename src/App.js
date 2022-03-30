import './App.css';
import React, {useState} from "react";

import AddButton from "./addButton";
import DeleteButton from "./deleteButton";
import TaskList from './taskList';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import Alert from "./Alert";

import { initializeApp } from "firebase/app";
import {
    getFirestore,
    query,
    collection,
    orderBy,
    serverTimestamp,
    setDoc,
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
const priorityLevels = ["c", "b", "a"]; //the low, medium, high display is in PriorityButtons.js

function App() {
    const qCreated = query(collection(db, collectionName), orderBy("created"));
    const qSortPriority = query(collection(db, collectionName), orderBy("priority"));
    const qSortName = query(collection(db, collectionName), orderBy("textInput"));

    const [todos, loading, error] = useCollectionData(sortByPriority? qSortPriority :
        (sortByName? qSortName : qCreated));

    const [showAlert, setShowAlert] = useState(false);
    const [sortByPriority, setSortByPriority] = useState(false);
    const [sortByName, setSortByName] = useState(false);

    if (loading) {
        return "Loading!";
    }

    if (error) {
        return error.toString();
    }

    function handleItemChanged(itemId, field, newValue) {
        setDoc(doc(db, collectionName, itemId),
            {[field]: newValue}, {merge: true});
    }

    function handleCompletedDeleted() {
        let completedList = todos.filter(item => item.isChecked);
        completedList.forEach(item => deleteDoc(doc(db, collectionName, item.id)));
    }

    function handleItemAdded() {
        let id = generateUniqueID();
        setDoc(doc(db, collectionName, id), {
            id: id,
            isChecked: false,
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

    function handleSortPriority() {
        setSortByPriority(!sortByPriority);
    }

    return <>
        <h1>To Do List</h1>
        {todos.length === 0 && <h4>No items</h4>}
        <div className = "sortButton">
            {todos.length > 1 && <SortButton/>}
        </div>
        <TaskList
            todo={todos.filter(item => !item.isChecked)}
            isCompletedList={false}
            onItemChanged={handleItemChanged}
            priorityLevels={priorityLevels}
        />
        {todos.filter(item => item.isChecked).length > 0 && <h4>Completed</h4>}
        <TaskList
            todo={todos.filter(item => item.isChecked)}
            isCompletedList={true}
            onItemChanged={handleItemChanged}
            priorityLevels={priorityLevels}
        />
        <div className="editTasks">
            <AddButton
                onItemAdded={handleItemAdded}
            />
            {todos.filter(item => item.isChecked).length > 0 && <DeleteButton
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