import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/login_check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            
            const data = await response.json();
            console.log("data => ", data)
            setMessage(data.message);
        } catch (error) {
            console.log("error => ", error);
            setMessage("Erreur lors de la connexion.");
        }
    };
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center min-vh-100 p-3'>
            <div className='col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3'>
                <form className='form-login-mobile shadow-sm' onSubmit={handleSubmit}>
                    <div className='d-flex flex-column'>
                        <h2 className='text-center mb-4 text-primary h3'>Connexion</h2>
                        
                        <div className="did-floating-label-content mb-3">
                            <input 
                                type="email" 
                                className="did-floating-input"
                                placeholder=" " 
                                name="email"
                                value={formData.email} 
                                onChange={handleChange} 
                                required
                            />
                            <label className="did-floating-label">Email</label>
                        </div>
                        
                        <div className="did-floating-label-content mb-3">
                            <input 
                                type="password" 
                                className="did-floating-input"
                                placeholder=" " 
                                name="password"
                                value={formData.password} 
                                onChange={handleChange} 
                                required
                            />
                            <label className="did-floating-label">Mot de passe</label>
                        </div>
                        
                        {message && (
                            <div className="alert alert-info text-center mb-3" role="alert">
                                {message}
                            </div>
                        )}
                        
                        <div className='d-grid gap-3'>
                            <button type="submit" className="btn btn-primary btn-lg">
                                Se connecter
                            </button>
                            <div className="text-center">
                                <span className="text-muted small">Pas encore de compte ? </span>
                                <Link to="/signIn" className="text-decoration-none fw-semibold">
                                    S'inscrire
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;