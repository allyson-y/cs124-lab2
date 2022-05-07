import React from 'react';

function AddSharedUser(props) {

    return <>
        <label>
                <input
                    type="text"
                    value={props.value}
                    onChange={props.handleChange}
                    placeholder={"Email to share with"}/>
            </label>
        <button
            value={props.value}
            onClick={(e) =>
                    props.handleListChanged(props.id, "sharedWith", props.emails.concat([e.target.value])
                        .catch(err => {console.log("error")}))
        }>
            Share
        </button>
    </>
}

export default AddSharedUser;