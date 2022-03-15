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
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

function App() {
    const q = query(collection(db, collectionName), orderBy("created"));
    const [todos, loading, error] = useCollectionData(q);

    const [completedList, setCompletedList] = useState(todos ? todos.filter(item => item.isChecked) : []);
    const [unCompletedList, setUnCompletedList] = useState(todos ? todos.filter(item => !item.isChecked) : []);

    const [showAlert, setShowAlert] = useState(false);

    if (loading) {
        return <h1>Loading!</h1>;
    }

    if (error) {
        return <h1>Error {error} </h1>
    }

    function handleItemChanged(itemId, field, newValue) {
        setDoc(doc(db, collectionName, itemId),
            {[field]: newValue}, {merge: true});
        // const newData1 = completedList.map(
        //     p => p.id === itemId ? {...p, [field]: newValue} : p)
        // setCompletedList(newData1)
        // // console.log(newData1)
        // const newData2 = unCompletedList.map(
        //     p => p.id === itemId ? {...p, [field]: newValue} : p)
        // setUnCompletedList(newData2)
    }

    function moveTasks(checked, item) {
        if (completedList.includes(item)) {
            setUnCompletedList([...unCompletedList,
                    {
                        id: item.id,
                        isChecked: false,
                        textInput: item.textInput,
                        isBlur:false
                    }]);
            setCompletedList(completedList.filter(element => element.id !== item.id))

        } else {
            setCompletedList([...completedList,
                {
                    id: item.id,
                    isChecked: true,
                    textInput: item.textInput,
                    isBlur: true
                }]);
            setUnCompletedList(unCompletedList.filter(element => element.id !== item.id));
        }
    }

    function handleCompletedDeleted() {
        // setCompletedList([]);
    }

    function handleItemAdded() {
        let id = generateUniqueID();
        setDoc(doc(db, collectionName, id), {
            id: id,
            isChecked: false,
            textInput: "",
            isBlur: false,
            created: serverTimestamp(),
        });
        // setUnCompletedList(todos.filter(item => !item.isChecked));
        // setUnCompletedList([...unCompletedList,
        //     {
        //         id: generateUniqueID(),
        //         isChecked: false,
        //         textInput: "",
        //         isBlur: false
        //     }])
    }

    function alertDelete() {
        console.log("pressed delete")
        handleCompletedDeleted()
    }

    function toggleModal() {
        setShowAlert(!showAlert);
    }

    // console.log(todo)

    return <>
        <h1>To Do List</h1>
        <TaskList
            todo={todos}
            isCompletedList={false}
            completedList={todos.filter(item => !item.isChecked)}
            unCompletedList={todos.filter(item => !item.isChecked)}
            setCompletedList={setCompletedList}
            setUncompletedList={setUnCompletedList}
            onItemChanged={handleItemChanged}

            moveTasks={moveTasks}
        />
        {completedList.length > 0 && <h4>Completed</h4>}
        <TaskList
            todo={todos}
            isCompletedList={true}
            completedList={todos.filter(item => item.isChecked)}
            unCompletedList={todos.filter(item => !item.isChecked)}
            setCompletedList={setCompletedList}
            setUncompletedList={setUnCompletedList}
            onItemChanged={handleItemChanged}
            moveTasks={moveTasks}
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