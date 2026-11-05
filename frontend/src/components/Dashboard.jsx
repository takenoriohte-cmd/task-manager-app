import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('タスク取得エラー:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('このタスクを削除しますか？')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('削除エラー:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>ダッシュボード画面 (メイン)</h2>
        <div>
          <Link to="/tasks/new" style={{ marginRight: '15px', padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
            + 新規タスク作成
          </Link>
          <Link to="/login" style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
            ログアウト
          </Link>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>登録済みタスク一覧</h3>
        {tasks.length === 0 ? (
          <p>タスクがまだ登録されていません。「新規タスク作成」から追加してみましょう。</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#e9ecef', textAlign: 'left' }}>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>タイトル</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>優先度</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>期限</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>担当者</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>工数</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.title}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.priority}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.due_date || '-'}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.assigned_to || '-'}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.estimated_hours ? `${task.estimated_hours}h` : '-'}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>
                    <button onClick={() => handleDelete(task.id)} style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}