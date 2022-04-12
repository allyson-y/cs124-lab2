import React from "react";
import './checkbox.css';

function Checkbox(props) {

    return <input
        className="checkbox"
        type={"checkbox"}
        onChange={props.toggleCheck}
        checked={props.checkedBox}
        // aria-checked="false"
        // aria-label="Hit space to check if done"
    />
}

export default Checkbox;