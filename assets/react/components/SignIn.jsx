import React from 'react';
import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div className='d-flex justify-content-center align-items-center bg-home'>
            <form className='form-login'>
                <div>
                    <label>Prénom</label>
                    <input type="text" placeholder=" " />
                    <label>Nom</label>
                    <input type="text" placeholder=" " />
                </div>
                <div>
                    <label>Nom de Club</label>
                    <input type="text" placeholder=" " />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" placeholder=" " />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type="text" placeholder=" " />
                </div>
                <div>
                    <label>Validation de mot de passe</label>
                    <input type="text" placeholder=" " />
                </div>
                <div>
                    <Link to="/">
                        <button>Retour</button>
                    </Link>
                    <button>Valider</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;