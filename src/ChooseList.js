import React from "react";
import "./ChooseList.css";

function ChooseList(props) {
    return <div>
        <select
            className="select"
            value={props.id}
            onChange={props.handleSelect}
            aria-label="Enter lists, select a list, and confirm"
        >
            {props.listOfLists ? props.listOfLists.map(col =>
                <option value={col.id}>{col.name}</option>) : null}
        </select>

        <span id={"buttons"}>
        <button
            className="editButton"
            type={"button"}
            id="editListName"
            onClick={props.toggleEditListName}
            aria-label="Edit the name of list">
            Edit name
        </button>

        <button
            className="addButton"
            type={"button"}
            id="newList"
            onClick={props.handleListAdded}
            aria-label="Create a new list">
            Add list
        </button>

        <button
            className="deleteList"
            type={"button"}
            id="deleteList"
            onClick={(e) =>
                props.handleListDelete(props.id)}
            aria-label={"Delete this list"}>
            Delete list
        </button>

            </span>

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
            id="done"
            onClick={props.toggleEditListName}
            aria-label="Finish editing list name">
            Done
        </button>}

        <br></br>
    </div>

}

export default ChooseList;