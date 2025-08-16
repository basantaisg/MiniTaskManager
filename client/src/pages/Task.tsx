import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Button, Card } from "@shadcn/ui";

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
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h1>
      <div className="flex space-x-2 mb-6">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-lg border w-1/4"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 rounded-lg border w-3/4"
        />
        <Button onClick={createTask}>Add</Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4 flex justify-between items-center">
            <div>
              <h2 className="font-bold">{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <Button variant="destructive" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
