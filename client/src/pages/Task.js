import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Task.css";
export default function Tasks() {
    const { user, logout } = useAuth(); // <-- add logout
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const fetchTasks = async () => {
        const res = await api.get("/tasks");
        setTasks(res.data.tasks || res.data);
    };
    const createTask = async () => {
        if (!title)
            return;
        await api.post("/tasks", { title, description });
        setTitle("");
        setDescription("");
        fetchTasks();
    };
    const deleteTask = async (id) => {
        await api.delete(`/tasks/${id}`, { data: { id } });
        fetchTasks();
    };
    const handleLogout = async () => {
        await logout();
    };
    useEffect(() => {
        fetchTasks();
    }, []);
    return (_jsxs("div", { className: "tasks-container", children: [_jsxs("div", { className: "tasks-header", children: [_jsxs("h1", { children: ["Welcome, ", user?.email] }), _jsx("button", { onClick: handleLogout, className: "logout-btn", children: "Logout" })] }), _jsxs("div", { className: "task-inputs", children: [_jsx("input", { placeholder: "Title", value: title, onChange: (e) => setTitle(e.target.value), className: "title-input" }), _jsx("input", { placeholder: "Description", value: description, onChange: (e) => setDescription(e.target.value), className: "desc-input" }), _jsx("button", { onClick: createTask, children: "Add" })] }), _jsx("div", { className: "task-list", children: tasks.map((task) => (_jsxs("div", { className: "task-card", children: [_jsxs("div", { children: [_jsx("h2", { children: task.title }), _jsx("p", { children: task.description })] }), _jsx("button", { onClick: () => deleteTask(task.id), children: "Delete" })] }, task.id))) })] }));
}
