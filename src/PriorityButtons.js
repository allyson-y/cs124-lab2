import './PriorityButtons.css'
import React from 'react';

function PriorityButtons(props) {
    let displayList = ["low", "medium", "high"];
    return <>
        {props.priorityLevels.map(type => (
            <button
                key={type}
                id={(type===props.priority).toString()}
                onClick={() => props.selectPriority(type)}
            >
                {displayList[type]}
            </button>
        ))}
    </>
}

export default PriorityButtons;