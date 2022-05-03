import React from 'react';
import {useNavigate} from "react-router-dom";
import TopicsBar from "../components/TopicsBar/TopicsBar";
import http from "../plugins/http";

const FavouriteThreadsPage = () => {
    const favourited = JSON.parse(localStorage.getItem("favorites"));
    const nav = useNavigate()
    return (
        <div className='backgroundColorFavourite'>
            <h1 className='d-flex justify-content-center margin1rem bckclr'>Mėgstamiausios temos</h1>
            <TopicsBar/>
            {favourited && favourited.map((x, i) => {
                return (
                    <div>
                        <div key={i} className='d-flex justify-content-center singleThread pb-3 favouriteThreads'>
                            <div onClick={() => nav(`/threads/${x._id}`)}
                                 className='thread mb-3 align-items-center d-flex justify-content-center'>
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
        </div>
    );
};

export default FavouriteThreadsPage;