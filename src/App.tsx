import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import FavouritesPage from "./Pages/FavouritesPage";
import Navigation from "./Components/Navigation";

function App() {
    return (
        <>
            <Navigation />

            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/favourites' element={<FavouritesPage/>}/>
            </Routes>

        </>

    );
}

export default App;
