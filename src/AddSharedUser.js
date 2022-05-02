import React from 'react';

function AddSharedUser(props) {
    return <>
        <form onSubmit={props.shareList}>
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