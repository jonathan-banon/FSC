import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logoFsc from '../../images/logo-fsc.png';

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
        <div className='d-flex justify-content-center align-items-center min-vh-100 bg-home p-3'>
            <form className='form-login' onSubmit={handleSubmit}>
                <div className='d-flex align-items-center'>
                    <img src={logoFsc} alt="Logo" className="img-fluid" />
                    <h2 className='text-center text-dark fw-bold fs-4 w-100'>ESPACE TOURNOI</h2>
                </div>
                <div>
                    <div className="did-floating-label-content mb-5">
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

                    <div className="did-floating-label-content">
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
                </div>


                <div className="d-grid gap-2">
                    <button className="bg-dark rounded-pill  text-white mb-3" type="submit">Me connecter</button>
                    <Link to="/signIn" className='text-center'>
                        <button className="bg-white rounded-pill" type="button"> M'inscrire</button>
                    </Link>
                </div>

            </form>
        </div>
    );
};

export default Login;