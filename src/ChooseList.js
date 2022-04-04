import React from "react";
import "./ChooseList.css";

function ChooseList(props) {
    return <div>
        <select
            className="select"
            onChange={props.handleSelect}
            aria-label="Hit space to select sorting method"
        >
            {props.listOfLists.map(col =>
                <option value={col.id}>List {col.name}</option>)}
        </select>
    </div>

}

export default ChooseList;