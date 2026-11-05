import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function TaskCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('中');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', {
        title,
        description,
        priority,
        due_date: dueDate || null,
        assigned_to: assignedTo,
        estimated_hours: estimatedHours ? parseFloat(estimatedHours) : null,
        status: '未着手'
      });
      alert('タスクを作成しました！');
      navigate('/dashboard');
    } catch (error) {
      console.error('タスク作成エラー:', error);
      alert('タスクの作成に失敗しました。');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>タスク作成画面</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>タスク名: </label><br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>詳細 (Description): </label><br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '8px', height: '80px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>優先度: </label><br />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>期限 (Due Date): </label><br />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>担当者: </label><br />
          <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>見積もり工数 (時間): </label><br />
          <input type="number" step="0.5" value={estimatedHours} onChange={(e) => setEstimatedHours(e.target.value)} placeholder="例: 3.5" style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          登録する
        </button>
        <button type="button" onClick={() => navigate('/dashboard')} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}>
          戻る
        </button>
      </form>
    </div>
  );
}