import './App.css';
import React, {useState} from "react";

import AddButton from "./addButton";
import DeleteButton from "./deleteButton";
import TaskList from './taskList';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import Alert from "./Alert";
import SortButton from "./SortButton";
import ChooseList from "./ChooseList";

import {initializeApp} from "firebase/app";
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
const collectionName = "base";
const priorityLevels = ["a", "b", "c"]; //the low, medium, high display is in PriorityButtons.js
const initialID = "v2-1649047416480-5386782840773";

function App() {
    const [showAlert, setShowAlert] = useState(false);
    const [sort, setSort] = useState("created");
    const [newList, setNewList] = useState(collectionName + "/" + initialID.toString() + "/tasks");
    const [currListID, setCurrListID] = useState(initialID);
    const [showEditListName, setShowEditListName] = useState(false);
    const [showAddDoneName, setShowAddDoneName] = useState(false);
    const [inputName, setInputName] = useState("");
    const [todoLists, listLoading, listError] = useCollectionData(query(collection(db, collectionName)));

    const [todos, loading, error] = useCollectionData(query(collection(db, newList), orderBy(
        sort === "created" ? "created" : (sort === "priority" ? "priority" : "textInput"))));

    const [listName, setListName] = useState("List 1");

    if (loading | listLoading) {
        return <div>
            <h1>To Do List</h1>
            Loading!
        </div>
    }

    if (error | listError) {
        return listError.toString() + error.toString();
    }

    let completedList = todos.filter(item => item.isCompleted);
    let uncompletedList = todos.filter(item => !item.isCompleted)

    function handleItemChanged(itemId, field, newValue) {
        updateDoc(doc(db, newList, itemId),
            {[field]: newValue});
    }

    function handleCompletedDeleted() {
        completedList.forEach(item => deleteDoc(doc(db, newList, item.id)));
    }

    function handleItemAdded() {
        let id = generateUniqueID();
        console.log(newList);
        setDoc(doc(db, newList, id), {
            id: id,
            isCompleted: false,
            textInput: "",
            created: serverTimestamp(),
            priority: priorityLevels[0]
        });
    }

    function handleListAdded() {
        let id = generateUniqueID();
        setDoc(doc(db, collectionName, id), {
            id: id,
            name: "List Name"
        });
        setNewList(collectionName + "/" + currListID.toString() + "/tasks");
        setShowAddDoneName(!showAddDoneName);
    }

    function handleListChanged(itemId, field, newValue) {
        updateDoc(doc(db, collectionName, itemId),
            {[field]: newValue});
    }

    function alertDelete() {
        handleCompletedDeleted()
    }

    function toggleModal() {
        setShowAlert(!showAlert);
    }

    function handleSelectSort(e) {
        setSort(e.target.value);
    }

    function handleSelectList(e) {
        setCurrListID(e.target.value);
        setNewList(collectionName + "/" + e.target.value + "/tasks");
        console.log(collectionName + "/" + e.target.value + "/tasks");
        console.log(e.target.value);
    }

    function toggleEditListName() {
        setShowEditListName(!showEditListName);
    }

    function toggleAddDone() {
        setShowAddDoneName(!showAddDoneName);
        console.log(!showAddDoneName);
    }

    function setNameOfList(name) {
        setListName(name);
    }

    function handleListDelete(itemId) {
        deleteDoc(doc(db, collectionName, itemId));
        console.log(itemId);
    }

    return <>
        <h1>To Do List</h1>
        <br/>
        <div className="chooseList">
            {/*{todoLists.length > 1 && */}
            <ChooseList
                handleSelect={handleSelectList}
                listName={listName}
                id={currListID}
                listOfLists={todoLists}
                handleListAdded={handleListAdded}
                handleListChanged={handleListChanged}
                showEditListName={showEditListName}
                toggleEditListName={toggleEditListName}
                showAddDoneName={showAddDoneName}
                toggleAddDone={toggleAddDone}
                inputName={inputName}
                setInputName={setInputName}
                setNameOfList={setNameOfList}
                handleListDelete={handleListDelete}
            />
        </div>

        <div className="sortButton">
            {todos.length > 1 && <SortButton
                handleSelect={handleSelectSort}
                sort={sort}
            />}
        </div>
        {todos.length === 0 && <h4>No items</h4>}

        <TaskList
            uncompletedTodo={uncompletedList}
            completedTodo={completedList}
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