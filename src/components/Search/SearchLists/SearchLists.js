import React from 'react';
import './style.css';
import SearchList from '../SearchList/SearchList';

const SearchLists = ({ results }) => {
    return (
        <div class='search-results'>
            {results.map((result, idx) => (
                <SearchList key={idx} result={result} />
            ))}
        </div>
    )
}

export default SearchLists
