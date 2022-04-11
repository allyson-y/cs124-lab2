import "./PriorityButtons.css";
import React from 'react';

function PriorityButtons(props) {
<<<<<<< HEAD
    const displayList = ["high", "medium", "low"];
    console.log("priority is " + props.priority.toString())
    console.log(props.priorityLevels)
    // console.log(displayList[indexOf(props.priority)])
    console.log(displayList[props.priorityLevels.indexOf(props.priority)])

=======
    let displayList = ["high", "medium", "low"];
>>>>>>> e2b4a49e171ed224532aaed7e0ff9a7ba0dbc6c9
    return <span>
        <span className="priorityButtons1">
    <select
        className={"select"}
        value={props.priority}
        // id={props.priority}
        onChange={props.selectPriority}
        aria-label={"Hit space to enter priorities, use cursor to select priority, hit space to confirm"}
    >
        {props.priorityLevels.map(type =>
            <option value={type} class="a">{displayList[props.priorityLevels.indexOf(type)]}</option>
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
            >
                {displayList[props.priorityLevels.indexOf(type)]}
            </button>
        ))}
    </span>

    </span>
}

export default PriorityButtons;

