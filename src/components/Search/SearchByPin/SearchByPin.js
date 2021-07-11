import { useState } from 'react';
import './style.css';

const SearchByPin = () => {
    const [pincode, setPincode] = useState('');
    return (
        <div className='search-by-pin'>
            <input
                className='pin-input-box'
                name='pincode'
                value={pincode}
                placeholder='Enter your pincode...'
                onChange={(event) => setPincode(event.target.value)}
            />
            <button className='submit-search-by-pin' onClick={() => { }}>Search</button>
        </div>
    )
}

export default SearchByPin
