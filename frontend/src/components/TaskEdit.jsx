import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('未着手');
  const [priority, setPriority] = useState('中');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');

  // 編集対象のタスクデータを取得
  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      const task = response.data;
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || '未着手');
      setPriority(task.priority || '中');
      setDueDate(task.due_date || '');
      setAssignedTo(task.assigned_to || '');
      setEstimatedHours(task.estimated_hours ?? '');
    } catch (error) {
      console.error('タスク取得エラー:', error);
      alert('タスク情報の取得に失敗しました。');
      navigate('/dashboard');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, {
        title,
        description,
        status,
        priority,
        due_date: dueDate || null,
        assigned_to: assignedTo,
        estimated_hours: estimatedHours !== '' ? parseFloat(estimatedHours) : null,
      });
      alert('タスクを更新しました！');
      navigate('/dashboard');
    } catch (error) {
      console.error('タスク更新エラー:', error);
      alert('タスクの更新に失敗しました。');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>タスク編集画面</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: '15px' }}>
          <label>タスク名: </label><br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>詳細 (Description): </label><br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '8px', height: '80px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>ステータス: </label><br />
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
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
          更新する
        </button>
        <button type="button" onClick={() => navigate('/dashboard')} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}>
          戻る
        </button>
      </form>
    </div>
  );
}