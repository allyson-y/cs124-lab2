import React from "react";
import Task from './task'

function TaskList(props) {
    return <>
        {
            props.todo.map(singleTask => {
                return <>
                    <Task
                        onItemChanged={props.onItemChanged}
                        item={singleTask}
                    />
                </>
            })
        }
    </>
}

export default TaskList;