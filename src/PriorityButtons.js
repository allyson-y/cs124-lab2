import './PriorityButtons.css'
import React from 'react';

function PriorityButtons(props) {
    return <>
        {props.priorityLevels.map(type => (
            <button
                key={type}
                id={(type===props.priority).toString()}
                onClick={() => props.selectPriority(type)}
            >
                {type}
            </button>
        ))}
    </>
}

export default PriorityButtons;