import "./App.css"
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import AllThreads from "./pages/AllThreads";
import CreateThread from "./pages/CreateThread";
import UserProfile from "./components/UserProfile/UserProfile";
import SingleThreadPage from "./pages/SingleThreadPage";
import FavouriteThreadsPage from "./pages/FavouriteThreadsPage";
import Toolbar from "./components/Toolbar/Toolbar"
import AppContext from "./context/AppContext";

const App = () => {
    const [user, setUser] = useState(null)
    const [threads, setThreads] = useState([])
    const favourited = JSON.parse(localStorage.getItem("favorites"))

    useEffect(() => {
        loggedIn()
    }, [])

    async function loggedIn() {
        const item = {
            userSecret: localStorage.getItem('userSecret')
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }

        const res = await fetch(`http://localhost:4000/loggedIn`, options)
        const data = await res.json()

        if (data.success) {
            setUser(data.user)
            setThreads(data.threads)
        } else {
            setThreads(data.threads)
        }
        if (!(favourited)) {
            localStorage.setItem("favourites", JSON.stringify([]))
        }
    }

    return (
        <AppContext.Provider value={{user, setUser, threads, setThreads, favourited}}>
                <div className='d-flex flex-column vh100'>
                    <Router>
                        <div>
                            <Toolbar/>
                        </div>
                        <Routes>
                            <Route path="/" element={<AllThreads/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/newthread" element={<CreateThread/>}/>
                            <Route path="/threads/:id" element={<SingleThreadPage/>}/>
                            <Route path="/profile" element={<UserProfile/>}/>
                            <Route path="/favourites" element={<FavouriteThreadsPage/>}/>
                        </Routes>
                    </Router>
                </div>
        </AppContext.Provider>
    );
};

export default App;