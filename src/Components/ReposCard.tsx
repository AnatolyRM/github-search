import React from 'react';
import {IRepos} from "../Models/models";

interface IProps {
    repo: IRepos
}

const ReposCard = ({repo}: IProps) => {
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
        </div>
    );
};

export default ReposCard;