import React from "react";

function Checkbox(props) {
    return <input
        className="checkbox"
        type={"checkbox"}
        onChange={props.toggleCheck}
        checked={props.checkedBox}
    />
}

export default Checkbox;