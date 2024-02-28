import React, {useState} from 'react';
import {IRepos} from "../Models/models";
import {useActions} from "../Hooks/actions";
import {useAppSelector} from "../Hooks/redux";

interface IProps {
    repo: IRepos
}

export const ReposCard = ({repo}: IProps) => {
    const {addFavourites, removeFavourites} = useActions();
    const {favourites} =useAppSelector(store => store.github)
    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))
    const addToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addFavourites(repo.html_url)
        setIsFav(true)
    }
    const removeFromFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeFavourites(repo.html_url)
        setIsFav(false)
    }

    return (
        <div className='border px-5 py-3 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
            <a href={repo.html_url} target='_blank'>
                <h2 className='text-lg font-bold'>{repo.full_name}</h2>
                <p className='text-sm'>
                    Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                    Watchers: <span className='font-bold'>{repo.watchers}</span>
                </p>
                <p className='text-sm font-thin'>{repo?.description}</p>
            </a>

            {!isFav
                ? <button
                    onClick={addToFavorites}
                    className='px-2 py-4 bg-yellow-200 rounded mr-2 hover:shadow-md transition-all'
                >Add</button>
                : <button
                    onClick={removeFromFavorites}
                    className='px-2 py-4 bg-red-200 rounded hover:shadow-md transition-all'
                >Remove</button>}
        </div>
    );
};