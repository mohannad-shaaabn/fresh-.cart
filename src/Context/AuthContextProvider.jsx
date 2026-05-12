import { useEffect, useState } from 'react'
import { createContext } from 'react'
export const AuthContext = createContext();

function getStoredToken() {
    const storedToken = localStorage.getItem('token');
    if (!storedToken || storedToken === 'null' || storedToken === 'undefined') {
        return null;
    }
    return storedToken;
}

export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(() => getStoredToken())

    useEffect(() => {
        const syncToken = () => {
            setToken(getStoredToken());
        };

        syncToken();
        window.addEventListener('storage', syncToken);

        return () => {
            window.removeEventListener('storage', syncToken);
        };
    }, []);

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>{children}</AuthContext.Provider>
    )
}
