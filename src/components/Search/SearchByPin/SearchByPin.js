import { useState } from 'react';
import './style.css';
import axios from 'axios';
import { cowinAPI } from '../../../constants/apiConstants';
import ClipLoader from "react-spinners/ClipLoader";
import SearchLists from '../SearchLists/SearchLists';

const SearchByPin = () => {
    const [pincode, setPincode] = useState('');
    const [error, setError] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const loaderStyle = `
        display: block;
        margin: 0 auto;
`;

    const getCorrectDateFormat = () => {
        let correctDate;
        const arr = selectedDate.split('-');
        correctDate = arr[2] + '-' + arr[1] + '-' + arr[0];
        return correctDate;
    }

    const getSearchResults = async () => {
        try {
            setLoading(true);
            const { data: { sessions } } = await axios.get(`${cowinAPI}/appointment/sessions/public/findByPin?pincode=${pincode}&date=${getCorrectDateFormat(selectedDate)}`);
            setSearchResults(sessions);
            setLoading(false);
        } catch (error) {
            setError('Some unexpected error while fetching the data');
            setLoading(false);
        }
    }

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
    }

    const handlePinSubmit = () => {
        const isValidPin = /^(\d{4}|\d{6})$/.test(pincode);
        if (!isValidPin) {
            setError('Please enter a valid Pincode');
            return;
        }
        const currentDate = new Date();
        if (new Date(selectedDate) < currentDate && !isToday(new Date(selectedDate))) {
            setError('Please select a valid date');
            return;
        }
        setError('');
        getSearchResults();
        setSearched(true);
    }
    return (
        <div className='search-by-pin'>
            <input
                className='pin-input-box'
                name='pincode'
                value={pincode}
                placeholder='Enter your pincode...'
                onChange={(event) => setPincode(event.target.value)}
            />
            { pincode !== '' && (
                <>
                    <label className='input-label' htmlFor="date-availability">Select a date:</label>
                    <input
                        className='select-input'
                        type="date"
                        id="date-availability"
                        name="selectedDate"
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                    />
                </>
            )}
            { selectedDate !== '' && (
                <div className='submit-search-by-pin-wrapper'>
                    <button className='submit-search-by-pin' onClick={handlePinSubmit}>Search</button>
                </div>
            )}
            
            {error !== '' && <p className='error-message'>{error}</p>}
            {searchResults.length === 0 && searched && loading !== true && <h2 style={{ textAlign: 'center' }}>No centers found.</h2>}
            {loading && <ClipLoader color={'blue'} loading={loading} css={loaderStyle} size={50} /> }
            {searchResults.length !== 0 && (
                <SearchLists results={searchResults} />
            )}
        </div>
    )
}

export default SearchByPin
