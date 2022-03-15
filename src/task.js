import './task.css';
import Checkbox from './checkbox';
import TextInput from './textInput';

function Task(props) {
    // checked holds all checkboxes that are checked

    function toggleCheckbox() {
        console.log(props.item.isChecked)
        props.onItemChanged(props.item.id, "isChecked", !props.item.isChecked)
    }

    return <>
        <Checkbox
            toggleCheck={toggleCheckbox}
            checkedBox={props.item.isChecked}
        />
        <TextInput
            onItemChanged={props.onItemChanged}
            textData={props.item.textInput}
            taskId={props.item.id}
            isBlur={props.item.isChecked}
        />
        <br/>
    </>
}

export default Task;
