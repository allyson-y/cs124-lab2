import './App.css';
import './textInput.css';
import React from "react";

function TextInput(props) {

    let colorID = props.isBlur ? "task2" : "task1";

    return <>
        <input
            className="text-input"
            type="text"
            name="task2"
            id={colorID}
            value={props.textData}
            onChange={
                (e) =>
                    props.onItemChanged(props.taskId, "textInput", e.target.value)
            }
        />
    </>
}

export default TextInput;