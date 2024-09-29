import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { actions } = useContext(Context);
    const navigate = useNavigate();  // Hook para la navegación

    const handleLogin = async () => {
        const login = await actions.login({ email: email, password: password });
        if (login) {
            navigate('/profile');  // Redirigir a la página de perfil si el login es correcto
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input 
                name="email" 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} 
                placeholder="Email" 
            />
            <input 
                name="password" 
                type="password" 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} 
                placeholder="Password" 
            />
            <button onClick={handleLogin}>
                Entrar
            </button>
        </div>
    );
};

export default Login;