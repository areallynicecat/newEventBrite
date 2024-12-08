import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Get the authData (both token and user) from localStorage
        const authData = localStorage.getItem("auth");
        return authData ? JSON.parse(authData).user : null; // Retrieve the user
    });

    const login = (userData) => {
        setUser(userData.user); // Set user state
        const { token, user } = userData;
        console.log(token);

        // Store both the token and user data in localStorage
        localStorage.setItem("auth", JSON.stringify({ token, user }));
    };

    const logout = () => {
        setUser(null); // Remove user
        localStorage.removeItem("auth"); // Remove auth data (token and user) from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
