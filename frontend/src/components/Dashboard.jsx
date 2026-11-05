import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

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

  // サンプルデータを投入する処理
  const handleInsertSamples = async () => {
    try {
      await api.post('/samples');
      alert('サンプルデータを投入しました！');
      fetchTasks();
    } catch (error) {
      console.error('サンプル投入エラー:', error);
      alert('サンプルデータの投入に失敗しました。');
    }
  };

  // サンプルデータを削除する処理
  const handleDeleteSamples = async () => {
    if (window.confirm('すべてのデータ（サンプル含む）を削除しますか？')) {
      try {
        await api.delete('/samples');
        alert('データをすべて削除しました！');
        fetchTasks();
      } catch (error) {
        console.error('サンプル削除エラー:', error);
        alert('データの削除に失敗しました。');
      }
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '20px' }}>
      {/* 最上部の控えめなサンプル操作リンク（端っこに配置） */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '10px' }}>
        <button 
          onClick={handleInsertSamples} 
          style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer', fontSize: '12px', padding: 0, textDecoration: 'underline' }}
        >
          [サンプル投入]
        </button>
        <button 
          onClick={handleDeleteSamples} 
          style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '12px', padding: 0, textDecoration: 'underline' }}
        >
          [データ全削除]
        </button>
      </div>

      {/* ヘッダー部分 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '25px', 
        flexWrap: 'wrap', 
        gap: '15px',
        borderBottom: '2px solid #eaeaea',
        paddingBottom: '15px'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>ダッシュボード</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link to="/projects" style={{ padding: '8px 14px', backgroundColor: '#17a2b8', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            📁 プロジェクト一覧
          </Link>
          <Link to="/projects/new" style={{ padding: '8px 14px', backgroundColor: '#28a745', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            + 新規プロジェクト作成
          </Link>
          <Link to="/tasks/new" style={{ padding: '8px 14px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            + 新規タスク作成
          </Link>
          <Link to="/login" style={{ padding: '8px 14px', backgroundColor: '#343a40', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            ログアウト
          </Link>
        </div>
      </div>

      {/* タスク一覧セクション */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', color: '#333' }}>登録済みタスク一覧</h3>
        {tasks.length === 0 ? (
          <p style={{ color: '#666', margin: 0 }}>タスクがまだ登録されていません。「新規タスク作成」から追加してみましょう。</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
              <thead>
                <tr style={{ backgroundColor: '#e9ecef', textAlign: 'left' }}>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>タイトル</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>優先度</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>期限</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>担当者</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>工数</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{task.title}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{task.priority}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{task.due_date || '-'}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{task.assigned_to || '-'}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{task.estimated_hours ? `${task.estimated_hours}h` : '-'}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                      <button 
                        onClick={() => navigate(`/tasks/edit/${task.id}`)} 
                        style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                      >
                        編集
                      </button>
                      <button 
                        onClick={() => handleDelete(task.id)} 
                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}