import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../../context/AppContext";
import SmallProfile from "../SmallProfile/SmallProfile";
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    const {user, threads} = useContext(AppContext)
    const nav = useNavigate()
    const [userThreads, setUserThreads] = useState(null)

    useEffect(() => {
       const newThreads = threads.filter(x => x.user.secret === user.secret)
        setUserThreads(newThreads)
    }, [])

    return (
        <div className='d-flex  m-5'>
            <div className='d-flex flex-column'>
                <div>
                    <SmallProfile/>
                </div>
                <div className='d-flex justify-content-center'>
                    <h1>Mano sukurti postai</h1>

                </div>
                {userThreads && userThreads.map((x,i) => {
                    return(
                        <div className='d-flex w-100 justify-content-center mb-3'>
                            <button onClick={() => nav(`/threads/${x._id}`)} className='w-50 thread' key={i}>{x.name}</button>
                        </div>
                    )
                })}
            </div>

        </div>
    );
};

export default UserProfile;