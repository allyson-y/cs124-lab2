import React from "react";
import "./ChooseList.css";

function ChooseList(props) {
    return <div>
        <select
            className="select"
            value={props.id}
            onChange={props.handleSelect}
            aria-label="Hit space to select list">
            {props.listOfLists.map(col =>
                <option value={col.id}>{col.name}</option>)}
        </select>

        <button
            className="editButton"
            type={"button"}
            id = "editListName"
            onClick={props.toggleEditListName}
            aria-label="Hit space to create a new list">
            Edit name
        </button>

        <button
            className="addButton"
            type={"button"}
            id = "newList"
            // onClick={props.toggleAddDone}
            onClick={props.handleListAdded}
            aria-label="Hit space to create a new list">
            Add list
        </button>

        <br></br>

        {props.showEditListName && <input
            className="list-text-input"
            type="text"
            placeholder={"Type name"}
            onChange={
                (e) =>
                    props.handleListChanged(props.id, "name", e.target.value)
            }
        />}

        {props.showEditListName && <button
            className="listDoneButton"
            type={"button"}
            id = "done"
            onClick={props.toggleEditListName}
            aria-label="Hit space to finish editing list name">
            Done
        </button>}

        {props.showAddDoneName && <input
            className="list-text-input"
            type="text"
            placeholder={"Type name"}
            onChange={
                (e) =>
                    props.handleListChanged(props.id, "name", e.target.value)
            }
        />}

        {props.showAddDoneName && <button
            className="listDoneButton"
            type={"button"}
            id = "doneForAdd"
            onClick={props.toggleAddDone}
            aria-label="Hit space to finish editing list name">
            Done
        </button>}

        {/*{props.showAddDoneName && <input*/}
        {/*{<input*/}
        {/*    className="text-input"*/}
        {/*    type="text"*/}
        {/*    placeholder={"Add list name"}*/}
        {/*    onChange={*/}
        {/*        (e) => props.setNameOfList(e.target.value)*/}
        {/*        // props.handleListChanged(props.id, "name", e.target.value)*/}
        {/*    }*/}
        {/*/>}*/}

        {/*{props.showAddDoneName && <button*/}
        {/*{<button*/}
        {/*    className="doneForAddButton"*/}
        {/*    type={"button"}*/}
        {/*    id = "doneForAddButton"*/}
        {/*    onClick={props.handleListAdded(props.inputName)}*/}
        {/*    aria-label="Hit space to finish editing list name">*/}
        {/*    Done*/}
        {/*</button>}*/}
    </div>

}

export default ChooseList;