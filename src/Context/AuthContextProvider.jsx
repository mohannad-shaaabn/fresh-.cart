import { useEffect, useState } from 'react'
import { createContext } from 'react'
export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
    let [token, setToken] = useState(null)
    useEffect(() => {
        let tokenStorage = localStorage.getItem('token');
        if (tokenStorage) {
            setToken(tokenStorage);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>
    )
}
