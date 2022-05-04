import React from 'react';

const TopicsBar = () => {
    return (
        <div className='d-flex justify-content-evenly allThreads'>
            <h3 className='allThreads'>
                Tema
            </h3>
            <h3 className='allThreads'>Sukūrė</h3>
            <h3 className='allThreads'>Atsakymų sk.</h3>
        </div>
    );
};

export default TopicsBar;