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
            console.log("error => ",error);
            setMessage("Erreur lors de l'inscription.");
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-home'>
            <form className='form-login' onSubmit={handleSubmit}>
                <div>
                    <label>Prénom</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                    <label>Nom</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Nom de Club</label>
                    <input type="text" name="club" value={formData.club} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Validation de mot de passe</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                {message && <p>{message}</p>}
                <div>
                    <Link to="/">
                        <button type="button">Retour</button>
                    </Link>
                    <button type="submit">Valider</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;