import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProjectList() {
  // サンプル用のプロジェクトデータ（後ほどバックエンドAPIと連携可能）
  const [projects] = useState([
    { id: 1, name: 'Webサイトリニューアルプロジェクト', description: 'コーポレートサイトのデザイン刷新と機能改修' },
    { id: 2, name: '社内タスク管理システム開発', description: 'Spring BootとReactを用いた社内向けツールの構築' },
  ]);

  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>プロジェクト一覧画面</h2>
        <div>
          <button 
            onClick={() => navigate('/dashboard')} 
            style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ダッシュボードへ戻る
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h3>プロジェクト一覧</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e9ecef', textAlign: 'left' }}>
              <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>ID</th>
              <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>プロジェクト名</th>
              <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>説明</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{project.id}</td>
                <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{project.name}</td>
                <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{project.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}