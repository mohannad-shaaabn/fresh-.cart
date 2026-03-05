import { useEffect, useState, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    async function verifyToken(storedToken) {
        try {

            await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken', {
                headers: {
                    token: storedToken
                }
            })

            setToken(storedToken)

        } catch (error) {

            localStorage.removeItem('token')
            setToken(null)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        if (storedToken) {
            verifyToken(storedToken)
        } else {
            setLoading(false)
        }
    }, [])

    if (loading) {
        return null   // أو حط Loader إذا بدك
    }

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}