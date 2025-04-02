import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

    };
    return (
        <div className='d-flex justify-content-center align-items-center bg-home'>
            <form className='form-login'>
                <div className='d-flex flex-column'>
                    <label>Mail</label>
                    <input type="text" placeholder=" " />
                    <label>Mot de passe</label>
                    <input type="text" placeholder=" " />
                    <div className='d-flex flex-column'>
                        <button>Me connecter</button>
                        <Link to="/signIn">
                            <button>M'inscrire</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;