import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { cowinAPI } from '../../../constants/apiConstants';
import SearchLists from '../SearchLists/SearchLists';

const SearchByDistrict = () => {
    const [allStates, setAllStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [allDistricts, setAllDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const getStates = async () => {
        try {
            const { data: { states } } = await axios.get(`${cowinAPI}/admin/location/states`);
            setAllStates(states);
        } catch (error) {
            setError('Some error occured while fetching the data');
        }
    }

    const getDistricts = async () => {
        try {
            const { data: { districts } } = await axios.get(`${cowinAPI}/admin/location/districts/${selectedState}`);
            setAllDistricts(districts);
        } catch(error) {
            setError('Some error occured while fetching the data');
        }
    }

    const getCorrectDateFormat = () => {
        let correctDate;
        const arr = selectedDate.split('-');
        correctDate = arr[2] + '-' + arr[1] + '-' + arr[0];
        return correctDate; 
    }

    const getSearchResults = async () => {
        const { data: { sessions } } = await axios.get(`${cowinAPI}/appointment/sessions/public/findByDistrict?district_id=${selectedDistrict}&date=${getCorrectDateFormat(selectedDate)}`);
        setSearchResults(sessions);

    }

    const submitSearch = () => {
        console.log(getCorrectDateFormat(selectedDate));
        console.log(selectedDistrict);
        const currentDate = new Date();
        if(!(new Date(selectedDate) > currentDate)) {
            setError('Please select a valid date');
            return;
        }
        setError('');
        getSearchResults();
        setSearched(true);
    }

    useEffect(() => {
        getStates();
    }, [])

    useEffect(() => {
        if (selectedState !== '')
            getDistricts();
    }, [selectedState])

    return (
        <div className='search-by-district'>
            <div>
                <label className='input-label' htmlFor='state-dropdown'>Select a state:</label>
                <select 
                    className='select-input' 
                    id='state-dropdown' 
                    defaultValue={selectedState}
                    onChange={(event) => setSelectedState(event.target.value)}
                >
                    {
                        allStates.map(state => (
                            <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
                        ))
                    }
                </select>
            </div>
            { allDistricts.length > 0 && (
                <div>
                    <label className='input-label' htmlFor='district-dropdown'>Select a district:</label>
                    <select
                        className='select-input'
                        id='district-dropdown'
                        defaultValue={selectedDistrict}
                        onChange={(event) => setSelectedDistrict(event.target.value)}
                    >
                        {
                            allDistricts.map(district => (
                                <option key={district.district_id} value={district.district_id}>{district.district_name}</option>
                            ))
                        }
                    </select>
                </div>
            )}
            { selectedDistrict !== '' && (
                <div>
                    <label className='input-label' htmlFor="date-availability">Select a date:</label>
                    <input 
                        className='select-input'
                        type="date" 
                        id="date-availability" 
                        name="selectedDate" 
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                    />
                </div>
            )}
            {error && <p className='error-message'>{error}</p>}
            { selectedDate !== '' && (
                <div className='submit-search-by-district-wrapper'>
                    <button className='submit-search-by-district' onClick={submitSearch}>Search</button>
                </div>
            )}
            {searchResults.length !== 0 && (
                <SearchLists results={searchResults}  />
            )}
            {searchResults.length === 0 && searched && (
                <h2>No Slots available. Try a different date.</h2>
            )}
        </div>
    )
}

export default SearchByDistrict
