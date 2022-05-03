import React from 'react';

function AddSharedUser(props) {
    return <>
        {/*<form onSubmit={e => props.handleListChanged(props.id, "name", props.emails.concat([e.target.value]))}>*/}
        {/*<form onSubmit={e => console.log(e.target.value)}>*/}
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
                    props.handleListChanged(props.id, "sharedWith", props.emails.contains(e.target.value) ? props.emails : props.emails.concat([e.target.value]))}>
            Share
        </button>
        {/*<input*/}
        {/*    type="submit"*/}
        {/*    value={props.value}*/}
        {/*    onChange={(e) =>*/}
        {/*        props.handleListChanged(props.id, "sharedWith", props.emails.concat([e.target.value]))}/>*/}
            {/*<input type="submit" value="Share" />*/}
        {/*</form>*/}
    </>
}

export default AddSharedUser;