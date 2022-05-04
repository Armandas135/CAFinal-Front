import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import AppContext from "../../context/AppContext";

const Toolbar = () => {
    const {user} = useContext(AppContext);
    const nav = useNavigate();

    function home() {
        nav('/')
    }

    function toNewThread() {
        nav('/newThread')
    }

    function toRegister() {
        nav('/register')
    }

    function toLogin() {
        nav('/login')
    }

    function toProfile() {
        nav('/profile')
    }
    return (
        <div className='shadow'>
                <div className='d-flex toolbar justify-content-between '>
                    <h1 className='group ml-6 d-flex align-items-center text-center mt-2'>BMW GROUP</h1>
                    <div className='d-flex justify-content-end group'>
                        <button onClick={home} className='marginright1rem'>Grįžti į pagrindinį</button>
                        {user &&
                        <button onClick={toNewThread} className='marginright1rem'>Pradėti naują temą</button>}
                        {!user &&
                        <div className='d-flex justify-content-between align-items-center'>
                            <button onClick={toRegister}>Registruotis</button>
                            <button onClick={toLogin}>Prisijungti</button>
                        </div>
                        }
                        {user &&
                        <div>
                            <button className='toProfile d-flex align-items-center justify-content-center' onClick={toProfile}><button className='red'>{user.username}</button></button>
                        </div>
                        }
                    </div>



            </div>
        </div>

    );
};

export default Toolbar;