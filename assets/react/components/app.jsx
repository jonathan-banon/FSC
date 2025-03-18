import React from 'react';

const App = () => {
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
                        <button>M'inscrire</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default App;