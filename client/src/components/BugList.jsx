import React from 'react';

function BugList({ bugs, onUpdate, onDelete }) {
  return (
    <div>
      <h2>Reported Bugs</h2>
      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id}>
              <strong>{bug.title}</strong> — {bug.status} | {bug.priority}
              <br />
              <small>{bug.description}</small>
              <div>
                <button onClick={() => onUpdate(bug._id, { status: 'in-progress' })}>In Progress</button>
                <button onClick={() => onUpdate(bug._id, { status: 'resolved' })}>Resolve</button>
                <button onClick={() => onDelete(bug._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BugList;
