import React from "react";

function SortButton(props) {

    return <div className="sortButton">
        <button onClick="myFunction()" className="dropbtn">Dropdown</button>
        <div id="myDropdown" className="dropdown-content">
            <div className = "sortButton">
                 {props.todos.length > 1 && <button type={"button"} onClick={props.handleSortPriority} id = {"thisButton"}>
                     {props.sortByPriority ? "Sort by Date Created" : "Sort by Priority"}
                 </button>}
             </div>
        </div>
    </div>
}

export default SortButton;