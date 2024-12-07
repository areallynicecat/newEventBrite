import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchAuthStatus = () => {
            const authData = JSON.parse(localStorage.getItem("auth"));
            if (authData) {
                setUser(authData.user); // Set user from localStorage
            } else {
                setUser(null); // Clear user if no auth data
            }
        };

        fetchAuthStatus();
    }, [location]);

    // Function to log in the user and store data in localStorage
    const login = (userData) => {
        setUser(userData.user); // Set the user state
        localStorage.setItem("auth", JSON.stringify(userData)); // Store auth data in localStorage
    };

    // Function to log out the user and clear data from localStorage
    const logout = () => {
        setUser(null); // Clear user state
        localStorage.removeItem("auth"); // Remove auth data from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
