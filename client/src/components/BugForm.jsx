import React, { useState } from 'react';

function BugForm({ onCreate }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() !== '') {
      onCreate(formData);
      setFormData({ title: '', description: '', priority: 'medium', status: 'open' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
      <button type="submit">Report Bug</button>
    </form>
  );
}

export default BugForm;
