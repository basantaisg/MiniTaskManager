import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Task";
import { Routes, Route } from "react-router-dom";
function App() {
    return (_jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/", element: _jsx(Login, {}) }), _jsx(Route, { path: "/tasks", element: _jsx(Tasks, {}) })] }) }));
}
export default App;
