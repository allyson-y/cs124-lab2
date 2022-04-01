import './addButton.css'
import React from 'react';

function AddButton(props) {
    return <>
        <button
            type={"button"}
            id = "add"
            onClick={props.onItemAdded}
            aria-label="Hit space to add an item">
            Add an item
        </button>
    </>
}

export default AddButton;
