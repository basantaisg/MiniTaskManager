import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Register.css";
export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", { name, email, password });
            console.log("User created:", res.data);
            navigate("/"); // Redirect to login page
        }
        catch (err) {
            setError(err.response?.data?.message || "Registration failed!");
        }
    };
    return (_jsx("div", { className: "register-container", children: _jsxs("form", { onSubmit: handleSubmit, className: "register-form", children: [_jsx("h1", { children: "Register" }), error && _jsx("p", { className: "error", children: error }), _jsx("input", { type: "text", placeholder: "Name", value: name, onChange: (e) => setName(e.target.value) }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { type: "submit", children: "Register" })] }) }));
}
