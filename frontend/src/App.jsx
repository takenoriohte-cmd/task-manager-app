import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // タスク一覧をバックエンドから取得
  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  // タスクを追加する処理
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

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>タスク管理アプリ</h1>
      
      <form onSubmit={addTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          style={{ padding: '8px', width: '300px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>追加</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '8px' }}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;