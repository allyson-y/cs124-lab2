import "./PriorityButtons.css";
import React from 'react';

function PriorityButtons(props) {
    let displayList = ["high", "medium", "low"];

    return <span>
        <span className="priorityButtons1">
    <select
        className={"select"}
        value={props.priority}
        onChange={props.selectPriority}
        aria-label={"Selecting priority " + props.priority.toString()}
    >
        {props.priorityLevels.map(type =>
            <option value={type} className="a">{displayList[props.priorityLevels.indexOf(type)]}</option>
        )}
   </select>
            </span>


        <span className="priorityButtons2">
        {props.priorityLevels.map(type => (
            <button
                key={type}
                className={type}
                id={(type === props.priority).toString()}
                onClick={() => props.selectPriority(type)}
                aria-label={"Hit space to mark this task " + displayList[props.priorityLevels.indexOf(type)] + " priority"}
            >
                {displayList[props.priorityLevels.indexOf(type)]}
            </button>
        ))}
    </span>

    </span>
}

export default PriorityButtons;

