import React from 'react';
import {useAppSelector} from "../Hooks/redux";

export const FavouritesPage = () => {
    const {favourites} = useAppSelector(state => state.github)

    if (favourites.length === 0) return <p className='text-center'>No items.</p>

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            <ul className='list-none'>
                {favourites.map((el) => <li key={el}>
                    <a href={el} target='_blank'>{el}</a>
                </li>)}
            </ul>
        </div>

    );
}