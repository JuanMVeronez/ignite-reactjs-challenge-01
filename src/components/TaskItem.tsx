import { FiTrash } from "react-icons/fi";

import { Task } from "./Task";

type TaskItemProps = {
  task: Task
  eventToggleTaskCompletion: (id: number) => void
  eventRemoveTask: (id: number) => void
}

export function TaskItem(props: TaskItemProps) {

  const toggleTaskCompletion = (id: number) => {
    props.eventToggleTaskCompletion(id)
  }
  const removeTask = (id: number) => {
    props.eventRemoveTask(id)
  }

  return (
    <li>
      <div className={props.task.isComplete ? 'completed' : ''} data-testid="task" >
        <label className="checkbox-container">
          <input 
            type="checkbox" readOnly
            checked={props.task.isComplete}
            onClick={() => toggleTaskCompletion(props.task.id)}
          />
          <span className="checkmark"></span>
        </label>
        <p>{props.task.title}</p>
      </div>

      <button type="button" data-testid="remove-task-button" 
        onClick={() => removeTask(props.task.id)}
      >
        <FiTrash size={16}/>
      </button>
    </li>
  )
}