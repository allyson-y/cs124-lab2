import "./PriorityButtons.css";
import React from 'react';

function PriorityButtons(props) {
    let displayList = ["high", "medium", "low"];
    return <span className="priorityButtons">
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

}

export default PriorityButtons;