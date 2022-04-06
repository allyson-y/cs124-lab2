import React from "react";
import "./SortButton.css";

function SortButton(props) {
    return <div>
        <span id={"sortText"}>
            Sort By:&nbsp;
        </span>
        <select
            className="select"
            value={props.sort}
            onChange={props.handleSelect}
            aria-label="Hit space to select sorting method"
        >
            <option value="textInput">Name</option>
            <option value="priority">Priority</option>
            <option value="created">Date Created</option>
        </select>
    </div>
}

export default SortButton;