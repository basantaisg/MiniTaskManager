import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, } from "react";
import api from "../api/axios";
const AuthContext = createContext(null);
export const AuthProvider = ({ children, }) => {
    const [user, setUser] = useState(null);
    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        setUser(res.data.user || { email });
    };
    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { user, login, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within AuthProvider");
    return context;
};
