import './deleteButton.css'
import React from 'react';

function DeleteButton(props) {
    return <>
        <input type="submit"
               id="delete"
               value="Delete Completed"
               onClick={props.onItemDeleted}
               aria-label="Hit space to delete completed tasks"
        />
    </>
}

export default DeleteButton;