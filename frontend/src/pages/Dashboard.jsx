import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import api from "../services/api";
import "./dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dash-container">
      <h1 className="dash-title">Dashboard</h1>

      <div className="form-section">
        <TaskForm onSaved={fetchTasks} />
      </div>

      <h2 className="task-heading">Tasks</h2>

      {loading && <p className="loading">Loading...</p>}

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <p className="status">
              Status: <span className={`badge ${task.status}`}>
                {task.status}
              </span>
            </p>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        ))}

        {!loading && tasks.length === 0 && (
          <p className="no-task">No tasks yet</p>
        )}
      </div>
    </div>
  );
}
