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

  // 完了状態の切り替え
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

  // タスクの削除
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
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1>タスク管理アプリ</h1>
      
      <form onSubmit={addTask} style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          style={{ padding: '8px', flex: 1 }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>追加</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', background: '#f9f9f9', padding: '10px', borderRadius: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#888' : '#000' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
              />
              {task.title}
            </label>
            <button onClick={() => deleteTask(task.id)} style={{ background: '#ff4d4d', color: '#white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;