import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function ProjectCreate() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', {
        project_name: projectName,
        description: description,
        progress_rate: 0.0
      });
      alert('プロジェクトを作成しました！');
      navigate('/projects'); // 作成後はプロジェクト一覧へ遷移
    } catch (error) {
      console.error('プロジェクト作成エラー:', error);
      alert('プロジェクトの作成に失敗しました。');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>新規プロジェクト作成</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>プロジェクト名: </label><br />
          <input 
            type="text" 
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)} 
            style={{ width: '100%', padding: '8px' }} 
            required 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>説明 (Description): </label><br />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={{ width: '100%', padding: '8px', height: '80px' }} 
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          プロジェクトを登録
        </button>
        <button type="button" onClick={() => navigate('/dashboard')} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ダッシュボードへ戻る
        </button>
      </form>
    </div>
  );
}