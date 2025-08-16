import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Task.css";

export default function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data.tasks || res.data);
  };

  const createTask = async () => {
    if (!title) return; // simple validation
    await api.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`, { data: { id } });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-container">
      <h1>Welcome, {user?.email}</h1>
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
