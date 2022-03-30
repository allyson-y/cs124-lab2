import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';

function SortButton(props) {
    return <div>
        <Dropdown
            onSelect={props.handleSelect}>
            <Dropdown.Toggle variant="success">
                Sort Menu
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="name">
                    Sort by Name
                </Dropdown.Item>
                <Dropdown.Item href="priority">
                    Sort by Priority
                </Dropdown.Item>
                <Dropdown.Item href="date">
                    Sort by Date Created
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
}

export default SortButton;
