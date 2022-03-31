import React from "react";
import Task from './task'

function TaskList(props) {
    return <>
        {
            props.uncompletedTodo.map(singleTask => {
                return <>
                    <Task
                        onItemChanged={props.onItemChanged}
                        item={singleTask}
                        priorityLevels={props.priorityLevels}
                    />
                </>
            })
        }

        {
            props.completedTodo.length > 0 && <h4>Completed</h4>
        }

        {
            props.completedTodo.map(singleTask => {
                return <>
                    <Task
                        onItemChanged={props.onItemChanged}
                        item={singleTask}
                        priorityLevels={props.priorityLevels}
                    />
                </>
            })
        }
    </>
}

export default TaskList;

