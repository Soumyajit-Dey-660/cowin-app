import { useState, useEffect } from 'react';
import './style.css';
import { PAGE_RANGE, ITEMS_PER_PAGE } from '../../../constants/pageConstants';
import { useLocation, useHistory } from 'react-router-dom';
import Pagination from "react-js-pagination";
import SearchList from '../SearchList/SearchList';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const SearchLists = ({ results }) => {
    const history = useHistory();
    const page = useQuery().get('page') || 1;
    const [displayResults, setDisplayResults] = useState([]);
    const [error, setError] = useState('');
    const totalPages = Math.ceil(results.length /ITEMS_PER_PAGE) + 1;

    const handlePageChange = pageNumber => {
        console.log(pageNumber);
        history.push(`/search?page=${pageNumber}`)
    }
    useEffect(() => { 
        console.log(page);
        if (parseInt(page) < 0 || parseInt(page) > totalPages) {
            setError('Please choose a valid page number');
            return;
        }
        if (page === totalPages) 
            setDisplayResults(results.slice(ITEMS_PER_PAGE * (page-1), results.length));
        else
            setDisplayResults(results.slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page))
        window.scrollTo(0, document.body.scrollHeight);
    }, [page])

    return (
        <div className='search-results'>
            {error !== '' && <p className='error-message'>{error}</p>}
            {error === '' && displayResults.map((result, idx) => (
                <SearchList key={idx} result={result} />
            ))}
            {results.length !== 0 && (
                <Pagination 
                    activePage={parseInt(page)}
                    itemsCountPerPage={ITEMS_PER_PAGE}
                    totalItemsCount={results.length}
                    pageRangeDisplayed={PAGE_RANGE}
                    onChange={handlePageChange}
                />
            )}
        </div>
    )
}

export default SearchLists
