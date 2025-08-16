import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Task.css";

export default function Tasks() {
  const { user, logout } = useAuth(); // <-- add logout
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data.tasks || res.data);
  };

  const createTask = async () => {
    if (!title) return;
    await api.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`, { data: { id } });
    fetchTasks();
  };

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>Welcome, {user?.email}</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="task-inputs">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="desc-input"
        />
        <button onClick={createTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
