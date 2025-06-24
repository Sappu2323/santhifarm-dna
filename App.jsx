import { useState, useEffect } from 'react';

export default function App() {
  const [area, setArea] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (area) {
      const stored = localStorage.getItem(`tasks_${area}`);
      setTasks(stored ? JSON.parse(stored) : []);
    }
  }, [area]);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${area}`, JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (!newName.trim()) return;
    const newTask = { name: newName, note: newNote, collected: false };
    const updated = [...tasks, newTask];
    saveTasks(updated);
    setNewName('');
    setNewNote('');
  };

  const toggleCollected = (index) => {
    const updated = [...tasks];
    updated[index].collected = !updated[index].collected;
    saveTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    saveTasks(updated);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        backgroundColor: '#1e6f5c', color: 'white', padding: '10px'
      }}>
        <img src="/santhifarm-logo.png" alt="SanthiFarm Logo" style={{ width: 40, height: 40, borderRadius: '50%' }} />
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>SanthiFarm DNA Tracker</h1>
      </header>

      {!area ? (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setArea('Male')} style={{ padding: 10, width: 200 }}>Malé</button>
          <button onClick={() => setArea('Hulhumale')} style={{ padding: 10, width: 200 }}>Hulhumalé</button>
        </div>
      ) : (
        <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>DNA Samples - {area}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            <input placeholder="Owner Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <input placeholder="Notes (optional)" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            <button onClick={addTask}>Add</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tasks.map((task, index) => (
              <div key={index} style={{ padding: 10, backgroundColor: 'white', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{
                    fontWeight: 'bold',
                    textDecoration: task.collected ? 'line-through' : 'none',
                    color: task.collected ? 'gray' : 'black'
                  }}>{task.name}</p>
                  {task.note && <p style={{ fontSize: '12px', color: 'gray' }}>{task.note}</p>}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => toggleCollected(index)}>{task.collected ? 'Undo' : '✓'}</button>
                  <button onClick={() => deleteTask(index)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
          <button style={{ marginTop: 20 }} onClick={() => setArea(null)}>← Back</button>
        </div>
      )}
    </div>
  );
}
