import React, { useState } from 'react';
import { Link } from "react-router-dom";

const SignIn = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        club: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/userCreate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    club: formData.club,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                })
            });

            const data = await response.json();
            console.log("data => ", data)
            setMessage(data.message);
        } catch (error) {
            console.log("error => ", error);
            setMessage("Erreur lors de l'inscription.");
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100 bg-home p-3'>
            <form className='form-login' onSubmit={handleSubmit}>
                <div className='mt-2'>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="did-floating-label-content">
                                <input
                                    type="text"
                                    className="did-floating-input"
                                    placeholder=" "
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="did-floating-label">Prénom</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="did-floating-label-content">
                                <input
                                    type="text"
                                    className="did-floating-input"
                                    placeholder=" "
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="did-floating-label">Nom</label>
                            </div>
                        </div>
                    </div>

                    <div className="did-floating-label-content mb-4">
                        <input
                            type="text"
                            className="did-floating-input"
                            placeholder=" "
                            name="club"
                            value={formData.club}
                            onChange={handleChange}
                            required
                        />
                        <label className="did-floating-label">Nom de Club</label>
                    </div>

                    <div className="did-floating-label-content mb-4">
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

                    <div className="did-floating-label-content mb-4">
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

                    <div className="did-floating-label-content mb-3">
                        <input
                            type="password"
                            className="did-floating-input"
                            placeholder=" "
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <label className="did-floating-label">Confirmation mot de passe</label>
                    </div>

                    {message && (
                        <div className="alert alert-info text-center mb-3" role="alert">
                            {message}
                        </div>
                    )}
                </div>

                <div className="d-grid gap-2">
                    <button className="bg-dark rounded-pill text-white mb-3" type="submit">
                        Valider l'inscription
                    </button>
                    <Link to="/" className='text-center'>
                        <button className="bg-white rounded-pill" type="button">
                            Retour à la connexion
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignIn;