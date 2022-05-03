import React, {useContext} from 'react';
import AppContext from "../../context/AppContext";
import {useNavigate} from "react-router-dom";


const SmallProfile = () => {
    const {user, setUser} = useContext(AppContext)
    const nav = useNavigate()

    function toFavourites() {
            nav('/favourites')
        }

    return (
        <div className='d-flex justify-content-center userProfileContainer'>
            <div className='smallUserProfile'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex flex-column align-items-center mb-5 profileBorder'>
                        <img className='picture' src={user.picture}/>
                        <button className='w-75'>Keisti nuotrauką</button>
                    </div>

                    <div className='d-flex flex-column align-items-center mb-5 usernameBorder'>
                        <h1 className='topicsBar'>Vartotojo vardas:</h1>
                        <h3 className='topicsBar'>{user.username}</h3>
                        <div>
                            <div className='d-flex flex-column'>
                                <button className='logoutBtn' onClick={() => {
                                    setUser(null)
                                    nav("/")
                                    localStorage.setItem('userSecret', null)}}>Atsijungti</button>
                                <button onClick={toFavourites}>Mėgstamiausi</button>
                            </div>

                    </div>
                    </div>

                </div>
            </div>

        </div>

    );
};

export default SmallProfile;