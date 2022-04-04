import './AddList.css'
import React from 'react';

function AddListButton(props) {
    return <>
        <button
            type={"button"}
            id = "newList"
            onClick={props.onListAdded}>
            Create new list
        </button>
    </>
}

export default AddListButton;
