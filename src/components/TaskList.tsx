import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiCheckSquare } from 'react-icons/fi'
import { Task } from './Task';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function generateId() {
    return Math.round(Math.random() * 10**8);
  }
  
  function handleCreateNewTask() {
    if (newTaskTitle !== "") {
      const newTask: Task = {
        id: generateId(),
        title: newTaskTitle,
        isComplete: false
      }
      setTasks([...tasks, newTask])
    }
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(tasks.map(t => t.id !== id ? (t) : ({
      ...t,
      isComplete: !t.isComplete
    })))
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task}
              eventToggleTaskCompletion={
                id => handleToggleTaskCompletion(id)
              }
              eventRemoveTask={
                id => handleRemoveTask(id)
              }
            />
          ))}
          
        </ul>
      </main>
    </section>
  )
}