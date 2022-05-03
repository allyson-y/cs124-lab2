import React from 'react';

function AddSharedUser(props) {
    return <>
        {/*<form onSubmit={e => props.handleListChanged(props.id, "name", props.emails.concat([e.target.value]))}>*/}
        <form onSubmit={e => console.log(e.target.value)}>
        <label>
                <input
                    type="text"
                    value={props.value}
                    onChange={props.handleChange}
                    placeholder={"Email of user to share list with"}/>
            </label>
            <input type="submit" value="Share" />
        </form>
    </>
}

export default AddSharedUser;