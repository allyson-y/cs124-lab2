import React from "react";
import "./ChooseList.css";

function ChooseList(props) {
    return <div>
        <select
            className="select"
            value={props.id}
            onChange={props.handleSelect}
            aria-label="Hit space to enter lists, use cursor to select list, hit space to confirm"
        >
            {props.listOfLists.map(col =>
                <option value={col.id}>{col.name}</option>)}
        </select>

        <button
            className="editButton"
            type={"button"}
            id = "newList"
            onClick={props.handleListAdded}
            aria-label="Hit space to edit name of list">
            Edit
        </button>

        <button
            className="addButton"
            type={"button"}
            id = "newList"
            onClick={props.handleListAdded}
            aria-label="Hit space to create a new list">
            +
        </button>

        <input
            className="text-input"
            type="text"
            name="task2"
            value={props.name}
            onChange={
                (e) =>
                    props.onItemChanged(props.id, "name", e.target.value)
            }
        />
    </div>

}

export default ChooseList;