import React, {useEffect, useState} from 'react';
import { useSearchUsersQuery } from "../Store/github/github.api";
import {useDebounce} from "../Hooks/debounce";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data: userData} = useSearchUsersQuery(debounced, {
        skip: search.length < 3
    });

    useEffect(() => {
        setDropdown(debounced.length > 3 && userData?.length! > 0)
    }, [debounced])
    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            { isError && <p className='text-center text-red-500'>Something went wrong...</p> }

            <div className='relative w-[560px]'>
                <input
                    type="text"
                    className='border py-2 px-4 w-full h-[42px] mb-2'
                    placeholder='Search for GitHub username...'
                    value={search}
                    onChange={e=> setSearch(e.target.value)}
                />
                { dropdown && <ul
                    className='list-none absolute top-[42px] right-0 left-0 max-h-[200px] overflow-y-scroll shadow-md bg-white'>
                    {isLoading && <p className='text-center'>Loading...</p>}
                    {userData?.map(user => (
                        <li
                            className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                            key={user.id}
                        >{user.login}</li>
                    ))}
                </ul>}
            </div>
        </div>
    );
};

export default HomePage;
