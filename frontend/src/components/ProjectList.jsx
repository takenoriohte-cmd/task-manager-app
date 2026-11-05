import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, taskRes] = await Promise.all([
        api.get('/projects'),
        api.get('/tasks')
      ]);
      setProjects(projRes.data);
      setTasks(taskRes.data);
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('このプロジェクトを削除しますか？（紐づくタスクの扱いにはご注意ください）')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchData();
      } catch (error) {
        console.error('プロジェクト削除エラー:', error);
        alert('プロジェクトの削除に失敗しました。');
      }
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '20px' }}>
      {/* ヘッダー部分 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>プロジェクト管理</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/dashboard" style={{ padding: '8px 14px', backgroundColor: '#6c757d', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px' }}>
            ダッシュボードへ戻る
          </Link>
          <Link to="/projects/new" style={{ padding: '8px 14px', backgroundColor: '#28a745', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px' }}>
            + 新規プロジェクト作成
          </Link>
        </div>
      </div>

      {/* プロジェクト一覧・カード形式 */}
      {projects.length === 0 ? (
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center', color: '#666' }}>
          <p>プロジェクトがまだ登録されていません。「新規プロジェクト作成」から追加してみましょう。</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {projects.map((project) => {
            // このプロジェクトに紐づくタスクをフィルタリング
            const projectTasks = tasks.filter(task => task.project_id === project.project_id);
            
            // 見込み時間の合計を計算
            const totalEstimatedHours = projectTasks.reduce((sum, task) => sum + (task.estimated_hours || 0), 0);

            // ★ 進捗率の自動計算（完了タスク数 / 総タスク数）
            const totalTasksCount = projectTasks.length;
            const completedTasksCount = projectTasks.filter(task => task.status === '完了').length;
            const progressRate = totalTasksCount > 0 
              ? Math.round((completedTasksCount / totalTasksCount) * 100) 
              : 0;

            return (
              <div key={project.project_id} style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: '#007bff', fontSize: '20px' }}>{project.project_name}</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{project.description || '説明なし'}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleDeleteProject(project.project_id)} 
                      style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                    >
                      削除
                    </button>
                  </div>
                </div>

                {/* プロジェクト情報サマリー ＆ 進捗バー */}
                <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <div><strong>総見込み時間:</strong> {totalEstimatedHours} 時間</div>
                    <div><strong>タスク完了数:</strong> {completedTasksCount} / {totalTasksCount} 件</div>
                    <div><strong>進捗率:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>{progressRate}%</span></div>
                  </div>
                  {/* プログレスバー */}
                  <div style={{ width: '100%', backgroundColor: '#e9ecef', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${progressRate}%`, backgroundColor: '#28a745', height: '100%', transition: 'width 0.3s ease' }}></div>
                  </div>
                </div>

                {/* 紐づくタスク一覧 */}
                <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#333' }}>紐づくタスク一覧</h4>
                {projectTasks.length === 0 ? (
                  <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>このプロジェクトに属するタスクはまだありません（新規タスク作成時にこのプロジェクトを選択できます）。</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#e9ecef', textAlign: 'left' }}>
                          <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>タスク名</th>
                          <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>ステータス</th>
                          <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>優先度</th>
                          <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>期限</th>
                          <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>担当者</th>
                          <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>見積工数</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectTasks.map((task) => (
                          <tr key={task.id}>
                            <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.title}</td>
                            <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>
                              <span style={{ 
                                padding: '2px 6px', 
                                borderRadius: '4px', 
                                fontSize: '12px',
                                backgroundColor: task.status === '完了' ? '#d4edda' : task.status === '進行中' ? '#cce5ff' : '#fff3cd',
                                color: task.status === '完了' ? '#155724' : task.status === '進行中' ? '#004085' : '#856404'
                              }}>
                                {task.status || '未着手'}
                              </span>
                            </td>
                            <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.priority}</td>
                            <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.due_date || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.assigned_to || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{task.estimated_hours ? `${task.estimated_hours}h` : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}