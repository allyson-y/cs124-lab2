import './task.css';
import Checkbox from './checkbox';
import TextInput from './textInput';
import PriorityButtons from './PriorityButtons';

function Task(props) {
    // checked holds all checkboxes that are checked

    function toggleCheckbox() {
        props.onItemChanged(props.item.id, "isChecked", !props.item.isChecked)
    }

    function selectPriority(selectedPriority) {
        props.onItemChanged(props.item.id, "priority", selectedPriority)
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
        <PriorityButtons
            priority={props.item.priority}
            taskId={props.item.id}
            priorityLevels={props.priorityLevels}
            selectPriority={selectPriority}>
        </PriorityButtons>
        <br/>
    </>
}

export default Task;
