import React, {useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, deleteDoc, doc, orderBy, query, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {sendEmailVerification, signOut} from "firebase/auth";
import ChooseList from "./ChooseList";
import SortButton from "./SortButton";
import TaskList from "./taskList";
import AddButton from "./addButton";
import DeleteButton from "./deleteButton";
import Alert from "./Alert";

function SignedInApp(props) {

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


    if (error) {
        return "error" + error;
    }
    if (loading) {
        return "loading..";
    }

    return <>
        <h1>To Do List</h1>
        <br/>


        <p>Signed in as {props.user.email}</p>
        {!props.user.emailVerified && (
            <button onClick={() => sendEmailVerification(props.user)}>
                Validate email
            </button>
        )}
        <button onClick={() => signOut(auth)}>Sign Out</button>


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

export default SignedInApp;