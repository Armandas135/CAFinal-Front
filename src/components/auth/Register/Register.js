import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";

const Register = () => {
    const passwordRef = useRef()
    const passwordAgainRef = useRef()
    const usernameRef = useRef()
    const nav = useNavigate()

    async function registerUser() {
        const item = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            passwordAgain: passwordAgainRef.current.value,
            image: '',
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }
        const response = await fetch(`http://localhost:4000/register`, options)
        const data = await response.json()
        if (data.success) {
            nav("/login")
        } else {
            alert(data.errorMessage)
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center pt-4'>
            <div className='d-flex flex-column align-items-center registerContainer'>
                <input className='marginbottom1rem' placeholder='Vartotojo vardas' ref={usernameRef} type="text"/>
                <input className='marginbottom1rem' placeholder='Vartotojo slaptažodis' ref={passwordRef}
                       type="password"/>
                <input className='marginbottom1rem' placeholder='Pakartokite slaptažodį' ref={passwordAgainRef}
                       type="password"/>
                <button className='w-100' onClick={registerUser}>Registruotis</button>

            </div>
        </div>

    );
};

export default Register;