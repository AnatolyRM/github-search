import React from 'react';
import { useSearchUsersQuery } from "../Store/github/github.api";

const HomePage = () => {
    const {isLoading, isError, data} = useSearchUsersQuery('AnatolyRM');

    return (
        <div>
            {/*{isLoading ? <h1>Loading...</h1> : <p>{data}</p>}*/}
            <h1>Home</h1>
        </div>
    );
};

export default HomePage;
