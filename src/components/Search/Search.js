import { useState } from 'react';
import './search.css';
import SearchByDistrict from './SearchByDistrict/SearchByDistrict';
import SearchByMap from './SearchByMap/SearchByMap';
import SearchByPin from './SearchByPin/SearchByPin';

const Search = () => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <div className='search-container'>
            <div id="search-options">
                <button className="search-option" onClick={() => {setSelectedOption('SEARCH_BY_PINCODE')}}>Search By Pin</button>
                <button className="search-option" onClick={() => {setSelectedOption('SEARCH_BY_DISTRICT')}}>Search By District</button>
                <button className="search-option" onClick={() => { setSelectedOption('SEARCH_BY_MAP') }}>Search By Map</button>
            </div>
            <div className='search-option-description'>
                {
                    selectedOption === 'SEARCH_BY_PINCODE' ? <SearchByPin /> : selectedOption === 'SEARCH_BY_DISTRICT' ? <SearchByDistrict /> : selectedOption === 'SEARCH_BY_MAP' ? <SearchByMap /> : <>Please Select an Option</>
                }
            </div>
        </div>
    )
}

export default Search
