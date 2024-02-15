import React, {useEffect, useState} from 'react';
import {useLazyGetUsersRepoQuery, useSearchUsersQuery} from "../Store/github/github.api";
import {useDebounce} from "../Hooks/debounce";
import {IUser} from "../Models/models";
import {ReposCard} from "../Components/ReposCard";

export const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data: userData} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    });
    const [fetchRepos, {isLoading: isRepoLoading, data: repos}] = useLazyGetUsersRepoQuery();

    useEffect(() => {
        setDropdown(debounced.length > 3 && userData?.length! > 0)
    }, [debounced, userData])

    const clickHandler = (userLogin: IUser['login']) => {
        fetchRepos(userLogin)
        setDropdown(false)
    }

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {isError && <p className='text-center text-red-500'>Something went wrong...</p>}

            <div className='relative w-[560px]'>
                <input
                    type="text"
                    className='border py-2 px-4 w-full h-[42px] mb-2'
                    placeholder='Search for GitHub username...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {dropdown && <ul
                    className='list-none absolute top-[42px] right-0 left-0 max-h-[200px] overflow-y-scroll shadow-md bg-white'>
                    {isLoading && <p className='text-center'>Loading...</p>}
                    {userData?.map(user => (
                        <li
                            className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                            onClick={() => clickHandler(user.login)}
                            key={user.id}
                        >{user.login}</li>
                    ))}
                </ul>}
                <div className="container">
                    { isRepoLoading && <p className='text-center'>Repos are loading...</p> }
                    { repos?.map(repo => <ReposCard repo={repo} key={repo.id}/> )}
                </div>
            </div>
        </div>
    );
};