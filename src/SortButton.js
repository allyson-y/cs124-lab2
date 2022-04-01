import React from "react";
import "./SortButton.css";

function SortButton(props) {
    return <div>
        <select
            className="select"
            value={props.sort}
            onChange={props.handleSelect}
            aria-label="Hit space to select sorting method"
        >
            <option value="textInput">Sort by Name</option>
            <option value="priority">Sort by Priority</option>
            <option value="created">Sort by Date Created</option>
        </select>
    </div>
}

export default SortButton;