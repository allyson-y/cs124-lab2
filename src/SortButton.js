import React from "react";
import "./SortButton.css";

function SortButton(props) {
    return <div id={"whole"}>
        <span id={"sortText"}>
            Sort By:&nbsp;
        </span>
        <select
            id="select"
            className="select"
            value={props.sort}
            onChange={props.handleSelect}
            aria-label="Hit space to enter sorting methods, use cursor to select method, hit space to confirm"
        >
            <option value="name">Name</option>
            <option value="priority">Priority</option>
            <option value="created">Date Created</option>
        </select>
    </div>
}

export default SortButton;