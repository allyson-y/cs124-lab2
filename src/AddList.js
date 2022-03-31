// import './addButton.css'
import React from 'react';

function AddListButton(props) {
    return <>
        <button
            type={"button"}
            id = "add"
            onClick={props.onListAdded}>
            Create a List
        </button>
    </>
}

export default AddListButton;
