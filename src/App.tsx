import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
type Task = {
  id: string
  task: string
  done: boolean
}
function App() {
  const [task, setTask] = useState<string>('')
  const [done, setTaskDone] = useState<boolean>(false)
  const [taskList, setTaskList] = useState<Task[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'done' | 'undone'>('all')

  function createTaskObject(task: string, done: boolean) {
    const newTask = {
      id: uuidv4(),
      task: task.trim(),
      done: done,
    }
    if (task.trim() === '') {
      alert('Please add a task')
      return
    }
    setTaskList([...taskList, newTask])
  }
  function handleSubmit(e: any) {
    e.preventDefault()
    setTask('')
  }
  function handleDone(id: string) {
    const found = taskList.find((t) => t.id === id)
    if (found) {
      found.done = !found.done
      setTaskList([...taskList])
    }
  }
  function deleteDoneTasks() {
    const newTaskList = taskList.filter((task) => task.done === false)
    setTaskList(newTaskList)
  }

  function filteredTasks() {
    if (activeTab === 'done') {
      return taskList.filter(task => task.done)
    } else if (activeTab === 'undone') {
      return taskList.filter(task => !task.done)
    } else {
      return taskList
    }
  }

  return (
    <div className='App'>
      <div>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <input value={task} onChange={(e) => setTask(e.target.value)} placeholder='What needs to be done?' />
          <button className='btn-add' onClick={() => createTaskObject(task, done)} type='submit'>Add task</button>
        </form>

        <div className="tabs">
          <button
            className={activeTab === 'all' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={activeTab === 'done' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('done')}
          >
            Done
          </button>
          <button
            className={activeTab === 'undone' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('undone')}
          >
            Undone
          </button>
        </div>

        <ul className='taskList'>
          {filteredTasks().map((task, index) => {
            return (
              <>
                <li key={index} className='card'>
                  <p>{task.done ? '✓': '🛈'}</p><p className={task.done ? 'done' : ''}> {task.task}</p>
                  <button className='btn-done' onClick={() => handleDone(task.id)}>{task.done ? "Mark as undone" : "Mark as done"}</button>
                </li >
              </>
            )
          })}
        </ul>
        <div className='footer'>
          <p>{taskList.length === 1 ? `${taskList.length} task left` : `${taskList.length} tasks left`}</p>
          <button className='btn-delete' onClick={() => deleteDoneTasks()}>Delete done tasks</button>
        </div>
      </div >
    </div>
  )
}

export default App
