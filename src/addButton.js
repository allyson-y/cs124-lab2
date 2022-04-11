import './addButton.css'
import React from 'react';

function AddButton(props) {
    return <>
        {/*<button*/}
        {/*    type={"button"}*/}
        {/*    id = "add"*/}
        {/*    onClick={props.onItemAdded}*/}
        {/*    aria-label="Hit space to add an item">*/}
        {/*    Add an item*/}
        {/*</button>*/}

        <input type="submit"
               id="add"
               value="Add an Item"
               onClick={props.onItemAdded}
               aria-label="Hit space to add an item"
        />
    </>
}

export default AddButton;
