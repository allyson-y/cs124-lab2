import React from "react";
import "./ChooseList.css";

function ChooseList(props) {
    return <div>
        <select
            className="select"
            value={props.id}
            onChange={props.handleSelect}
            aria-label="Hit space to select sorting method"
        >
            {props.listOfLists.map(col =>
                <option value={col.id}>List {col.name.substring(col.name.length - 1)}</option>)}
        </select>
    </div>

}

export default ChooseList;