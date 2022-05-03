import React, {useContext, useRef} from 'react';
import mainContext from "../context/AppContext";
import {useNavigate} from "react-router-dom";


const CreateThread = () => {
    const threadRef = useRef()
    const {user, setThreads} = useContext(mainContext)
    const nav = useNavigate()
    async function addThread() {
        const item = {
            name: threadRef.current.value,
            user,
            comments: [],
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }
        const response = await fetch(`http://localhost:4000/addthread`, options)
        const data = await response.json()
        if (data.success) {
            nav("/")
            setThreads(data.threads)
        } else {
            alert(data.errorMessage)
        }
    }

    return (
        <div className='d-flex justify-content-center'>
            <div className='addThreadContainer w-25 d-flex flex-column m-5 border justify-content-center'>
                <h1 className='d-flex  justify-content-center'>Sukurti naują temą</h1>
                <div className='d-flex justify-content-center align-items-center pt-3 pb-3'>
                    <input className='w-75' ref={threadRef} placeholder="Temos pavadinimas, iki 20 simbolių" type="text"/>
                </div>
                <div className='w-100 justify-content-center d-flex'>
                    <button className='w-25' onClick={addThread}>Sukurti temą</button>

                </div>
            </div>
        </div>

    );
};

export default CreateThread;