import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AppContext from "../../../context/AppContext";

const Login = () => {
    const passwordRef = useRef()
    const usernameRef = useRef()
    const [stayLogged, setStayLogged] = useState(false)
    const nav = useNavigate()
    const {setUser, setThreads} = useContext(AppContext)

    async function registerUser() {
        const item = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            stayLogged: stayLogged
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }
        const response = await fetch(`http://localhost:4000/login`, options)
        const data = await response.json()
        if (data.success) {
            nav("/")
            setUser(data.user)
            setThreads(data.threads)
            if (stayLogged) {
                localStorage.setItem('userSecret', data.user.secret);
            } else {
                localStorage.setItem('userSecret', null);
            }
        } else {
            alert(data.errMsg)
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center pt-4'>
            <div className='d-flex flex-column align-items-center registerContainer'>
                <input  className='marginbottom1rem' placeholder='Vartotojo vardas' ref={usernameRef}  type="text"/>
                <input className='marginbottom1rem' placeholder='Vartotojo slaptažodis' ref={passwordRef} type="password"/>
                    <h5 className='d-flex text-center'>Pažymėkite, jei norite likti prisijungę</h5>
                    <input className='marginbottom1rem' onChange={() => setStayLogged(!stayLogged)} type="checkbox"/>
                    <button className='w-100' onClick={registerUser}>Login</button>
            </div>
        </div>
    );
};

export default Login;