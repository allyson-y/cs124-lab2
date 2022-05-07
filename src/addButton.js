import './addButton.css'
import React from 'react';

function AddButton(props) {
    return <>
        <input type="submit"
               id="add"
               value="Add an Item"
               onClick={props.onItemAdded}
               aria-label="Hit space to add an item"
        />
    </>
}

export default AddButton;
