import React, {useContext} from 'react';
import mainContext from "../context/AppContext";
import {useNavigate} from "react-router-dom";
import TopicsBar from "../components/TopicsBar/TopicsBar";


const AllThreads = () => {

    const {threads} = useContext(mainContext)
    const nav = useNavigate()

    return (
        <div className='allThreads fontsizeall'>
            <h1 className='d-flex justify-content-center margin1rem allThreads'>Pasirinkite temą</h1>
            <TopicsBar/>
            {threads && threads.map((x, i) => {
                return (
                    <div>
                        <div key={i} className='d-flex justify-content-center singleThread mb-3 allThreads'>
                            <div onClick={() => nav(`/threads/${x._id}`)} className='thread d-flex align-items-center'>
                                <div className='flex-grow-1 w-1rem ml-3'><b>{x.name}</b></div>
                                <div className='flex-grow-1 w-1rem ml-custom'>
                                    {x.user.username}
                                </div>
                                <div className='flex-grow-1 w-1rem d-flex justify-content-end mr-4'>
                                    {x.comments.length}
                                </div>
                            </div>
                        </div>

                    </div>

                )
            })}
            <div className='d-flex justify-content-center copyright'><h3>© Armandas Inc. All rights reserved.</h3></div>

        </div>
    );
};

export default AllThreads;