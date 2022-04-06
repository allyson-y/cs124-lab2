import React from "react";
import "./ChooseList.css";
import AddList from "./AddList";

function ChooseList(props) {
    return <div>
        <select
            className="select"
            value={props.id}
            onChange={props.handleSelect}
            aria-label="Hit space to select list"
        >
            {props.listOfLists.map(col =>
                <option value={col.id}>List {col.name.substring(col.name.length - 1)}</option>)}
        </select>

        <AddList
            onListAdded={props.handleListAdded}
            aria-label="Hit space to create a new list"
        />
    </div>

}

export default ChooseList;