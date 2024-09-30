import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const Private = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlePrivate = async (e) => {
        e.preventDefault();
        try {
            await actions.private({ email, password });
            // Redireciona para a página de login após o registro bem-sucedido
            navigate('/private');
        } catch (error) {
            // Aqui você pode adicionar lógica para lidar com erros
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Private Zone</h1>
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
            <button onClick={handlePrivate}>
                Entrar
            </button>
        </div>
    );
};

export default Private;