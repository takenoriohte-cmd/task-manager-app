import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks([...tasks, newTask]);
        setTitle('');
      })
      .catch(err => console.error('Error adding task:', err));
  };

  const toggleTask = (task) => {
    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task.title, completed: !task.completed })
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      })
      .catch(err => console.error('Error updating task:', err));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      })
      .catch(err => console.error('Error deleting task:', err));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">タスク管理アプリ</h1>
      
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          className="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
        />
        <button type="submit" className="btn-add">追加</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <label className={`task-label ${task.completed ? 'completed-text' : ''}`}>
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
              />
              {task.title}
            </label>
            <button onClick={() => deleteTask(task.id)} className="btn-delete">削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;