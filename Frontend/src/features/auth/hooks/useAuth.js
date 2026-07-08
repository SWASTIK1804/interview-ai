import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe, getApiErrorMessage } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, error, setError } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        setError("")
        try {
            const data = await login({ email, password })
            setUser(data.user)
            return true
        } catch (error) {
            setUser(null)
            setError(getApiErrorMessage(error))
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        setError("")
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return true
        } catch (error) {
            setUser(null)
            setError(getApiErrorMessage(error))
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        setError("")
        try {
            await logout()
            setUser(null)
            return true
        } catch (error) {
            setError(getApiErrorMessage(error))
            return false
        } finally {
            setLoading(false)
        }
    }

    const getAndSetUser = useCallback(async () => {
        try {
            const data = await getMe()
            setUser(data.user)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [ setLoading, setUser ])

    useEffect(() => {
        getAndSetUser()
    }, [ getAndSetUser ])

    return { user, loading, error, setError, handleRegister, handleLogin, handleLogout }
}
