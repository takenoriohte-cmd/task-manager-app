import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // サンプルタイトルの定義（判定用）
  const sampleTitles = [
    "要件定義書の作成",
    "画面デザインの検討",
    "データベース設計",
    "API実装",
    "結合テスト"
  ];

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

  const handleRestoreSamples = async () => {
    try {
      setMessage('');
      const response = await api.post('/samples');
      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage('サンプルデータを復元しました！');
      }
      fetchTasks();
    } catch (error) {
      console.error('サンプル復元エラー:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('サンプルデータの復元に失敗しました。');
      }
    }
  };

  const handleDeleteSamples = async () => {
    if (window.confirm('サンプルデータのみを削除しますか？')) {
      try {
        setMessage('');
        const response = await api.delete('/samples');
        if (response.data && response.data.message) {
          setMessage(response.data.message);
        } else {
          setMessage('サンプルデータを削除しました。');
        }
        fetchTasks();
      } catch (error) {
        console.error('サンプル削除エラー:', error);
        setMessage('サンプルデータの削除に失敗しました。');
      }
    }
  };

  return (
    <div style={{ width: '95%', maxWidth: '1400px', margin: '20px auto', padding: '10px 20px' }}>
      {/* 最上部のサンプル操作コントロール */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
        {message && (
          <span style={{ fontSize: '12px', color: '#555', backgroundColor: '#e2f0cb', padding: '2px 8px', borderRadius: '4px' }}>
            {message}
          </span>
        )}
        <button 
          onClick={handleRestoreSamples} 
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '12px', padding: 0, textDecoration: 'underline' }}
        >
          [サンプル復元]
        </button>
        <button 
          onClick={handleDeleteSamples} 
          style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '12px', padding: 0, textDecoration: 'underline' }}
        >
          [サンプル削除]
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
          <p style={{ color: '#666', margin: 0 }}>タスクがまだ登録されていません。「新規タスク作成」または右上の「サンプル復元」から追加してみましょう。</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
              <thead>
                <tr style={{ backgroundColor: '#e9ecef', textAlign: 'left' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>タイトル</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>優先度</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>期限</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>担当者</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>工数</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const isSample = sampleTitles.includes(task.title);

                  return (
                    <tr 
                      key={task.id} 
                      style={{ 
                        backgroundColor: isSample ? '#f9fafb' : '#ffffff',
                        color: isSample ? '#6c757d' : '#212529'
                      }}
                    >
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        {isSample && (
                          <span style={{ 
                            display: 'inline-block', 
                            backgroundColor: '#e9ecef', 
                            color: '#495057', 
                            fontSize: '11px', 
                            padding: '1px 6px', 
                            borderRadius: '3px', 
                            marginRight: '8px',
                            fontWeight: 'bold'
                          }}>
                            サンプル
                          </span>
                        )}
                        {task.title}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{task.priority}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{task.due_date || '-'}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{task.assigned_to || '-'}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{task.estimated_hours ? `${task.estimated_hours}h` : '-'}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}