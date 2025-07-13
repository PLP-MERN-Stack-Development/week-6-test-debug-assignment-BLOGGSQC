import React, { useEffect, useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import { getBugs, createBug, updateBug, deleteBug } from './services/bugService';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [bugs, setBugs] = useState([]);

  const fetchBugs = async () => {
    const data = await getBugs();
    setBugs(data);
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleCreate = async (bug) => {
    const newBug = await createBug(bug);
    setBugs([newBug, ...bugs]);
  };

  const handleUpdate = async (id, updatedFields) => {
    const updated = await updateBug(id, updatedFields);
    setBugs(bugs.map((bug) => (bug._id === id ? updated : bug)));
  };

  const handleDelete = async (id) => {
    await deleteBug(id);
    setBugs(bugs.filter((bug) => bug._id !== id));
  };

  return (
    <ErrorBoundary>
      <div className="container">
        <h1>Bug Tracker</h1>
        <BugForm onCreate={handleCreate} />
        <BugList bugs={bugs} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
