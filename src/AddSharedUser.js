import React from 'react';

function AddSharedUser(props) {
    return <>
        <label>
                <input
                    type="text"
                    value={props.value}
                    onChange={props.handleChange}
                    placeholder={"Email of user to share list with"}/>
            </label>
        <button
            value={props.value}
            onClick={(e) =>
                    props.handleListChanged(props.id, "sharedWith", props.emails.concat([e.target.value]))}>
            Share
        </button>
    </>
}

export default AddSharedUser;