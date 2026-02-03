import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        if (token){
            validateToken();
        }else{
            setLoading(false);
        }
    }, [token])

    const validateToken = async() => {
        try{
            const res = await fetch('http://localhost:3000/api/auth/me', {
                headers:{
                    "Authorization" : `Bearer ${token}`,
                }
            })
            if (res.ok){
                const userData = await res.json();
                setUser(userData);
            }else{
                localStorage.removeItem("token");
                setToken(null);
            }
        }catch(error){
            console.error("Token Validation Failed", error);
            localStorage.removeItem("token");
            setToken(null);
        }finally{
            setLoading(false)
        }
        
    }

    const login = async (email, password) => {
        try{
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })
            if (!res.ok){
                const error = await res.json();
                throw error;
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setToken(data.token);
            return data;

        }catch(error){
            console.error(error);
        }
    }

    const register = async(email, password, username) => {
        try{
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password, username})
            })
            if (!res.ok){
                const error = await res.json();
                throw error;
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setToken(data.token)
            return data;

        }catch(error){
            console.error(error);
        }
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return(
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
    
}

export const useAuth = () => useContext(AuthContext);