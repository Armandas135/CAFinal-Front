import React, {useContext, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AppContext from "../context/AppContext";
import {Pagination} from "react-bootstrap";


const SingleThreadPage = () => {
    const {id} = useParams()
    const {threads, user, setThreads} = useContext(AppContext)
    const thisThread = threads.find(x => x._id === id)
    const favourited = JSON.parse(localStorage.getItem("favorites"))
    const isFavorite = favourited.find(x => x._id === id)
    const nav = useNavigate()
    const commmentRef = useRef()
    const postsPerPage = 10
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastComment = currentPage * postsPerPage
    const indexOfFirstComment = indexOfLastComment - postsPerPage
    const currentComments = thisThread.comments.slice(indexOfFirstComment, indexOfLastComment)

    const items = [];

    for (let number = 1; number <= Math.ceil(Number(thisThread.comments.length) / postsPerPage); number++) {
        items.push(
            <Pagination.Item onClick={() => setCurrentPage(number)} key={number} active={number === currentPage}>
                {number}
            </Pagination.Item>,
        );
    }
    function goToTop() {
        window.scrollTo(0, 0);
    }
    const toFavourites = () => {

        if (favourited) {
            if (isFavorite) {
            } else {
                favourited.push(thisThread)
                localStorage.setItem("favorites", JSON.stringify(favourited))
                nav('/favorites')
            }
        } else {
            const favorites = []
            favorites.push(thisThread)
            localStorage.setItem("favorites", JSON.stringify(favorites))
        }


    }
    const removeFavourite = () => {
        const filteredFavorites = favourited.filter(x => x._id !== id)
        localStorage.setItem("favorites", JSON.stringify(filteredFavorites))
        alert("Removed From Favorites")
        nav('/favorites')
    }
    const comment = async () => {
        window.scrollTo(0, 0);
        const item = {
            id,
            comment: commmentRef.current.value,
            user
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }
        const response = await fetch(`http://localhost:4000/addcomment`, options)
        const data = await response.json()
        if (data.success) {
            setThreads(data.threads)
        } else {
        }
    }
    return (
        <div className='d-flex flex-column align-items-center justify-content-center m-5'>
            <h5>Forumo tema:</h5>
            <h1>{thisThread.name}</h1>
            <div className='d-flex align-items-center flex-column mb-5'>
                <img className='picture m-2' src={thisThread.user.picture} alt=""/>
                <h3 className='bg-white'>{thisThread.user.username}</h3>
                {!isFavorite &&
                <button onClick={toFavourites} className='addToFavourites'>Pridėti į favoritus</button>
                }
                {isFavorite &&
                <button className='addToFavourites' onClick={removeFavourite}>Išimti iš favoritų</button>}
            </div>

            {thisThread.comments && currentComments.map((x, i) => {
                return (
                        <div key={i} className='d-flex justify-content-between w-75 mb-3'>
                            <div className='d-flex flex-column align-items-center justify-content-center borderComment p-lg-3'>
                                <h6>Komentatorius:</h6>
                                <img className='picture' src={x.user.picture} alt=""/>
                                <h4>vardas: {x.user.username}</h4>
                            </div>
                            <div className='d-flex flex-column  w-100 borderComment ms-lg-3'>
                                {x.comment.includes("http") ? <iframe className='blueBackground uploadedPicture ms-lg-3' src={x.comment} frameBorder="0"/> : <p className='blueBackground ms-lg-3 mt-3'>{x.comment}</p>}
                            </div>
                        </div>
                )
            })}

            <div className='w-80 d-flex'>
                <div className='d-flex flex-column m-5 w-100'>
                    <h2 className='justify-content-center d-flex'>Pridėti komentarą</h2>
                    <div className='d-flex justify-content-center pb-3'>
                        <input ref={commmentRef} className='w-50 h5rem topicsBar' placeholder='Rašykite komentarą (max - 200 simbolių)' type="text"/>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='w-50 topicsBar' onClick={comment}>Komentuoti</button>
                    </div>
                </div>
            </div>
            <div className='paginations'>
                <Pagination onClick={goToTop} className='mt-3'><p className='d-flex'>{items}</p></Pagination>
            </div>


        </div>
    );
};

export default SingleThreadPage;