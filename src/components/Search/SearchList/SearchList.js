import { useState } from 'react';
import './style.css';
import Modal from 'react-modal';
import vaccinationImg from '../../../images/covid-vaccination.jpg';

const SearchList = ({ result }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { center_id, name, address, state_name, district_name, block_name, from, to } = result;
    const modalStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(217, 217, 217, 0.95)'
        },
        content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    };
    const formatTime = (time) => {
        const arr = time.split(':');
        let formattedTime;
        if (parseInt(arr[0]) < 12)
            formattedTime = arr[0] + ':' + arr[1] + ' AM';
        else 
            formattedTime = arr[0] === '12' ? arr[0] + ':' + arr[1] + ' PM' : (parseInt(arr[0]) - 12).toString() + ':' + arr[1] + ' PM';
        return formattedTime;
    }
    return (
        <>
            <Modal
                className='modal-desc'
                isOpen={isModalOpen}
                onRequestClose={() => { setIsModalOpen(false); console.log(isModalOpen)}}
                style={modalStyle}
            >
                <div className='modal-content'>
                    <h2>{name}</h2>
                    <p className='center-id'>Center ID: <strong>{center_id}</strong></p>
                    <div className='location'>
                        <p>{state_name}</p>
                        <p>{district_name}</p>
                    </div>
                    <p>{address}</p>
                    <p>{block_name}</p>
                    <div className='timing'>
                        <p>From: <strong>{formatTime(from)}</strong></p><p>To: <strong>{formatTime(to)}</strong></p>
                    </div>
                    <button className='close-modal' onClick={() => setIsModalOpen(false)}>X</button>
                </div>
                <img className='vaccination-img' src={vaccinationImg} alt='vaccination' />
            </Modal>
            <div className='search-result' onClick={() => setIsModalOpen(true)}>
                <p>{result.name}</p>
                <p className='view-details' onClick={() => setIsModalOpen(true)}>View Details</p>
            </div>
        </>
    )
}

export default SearchList
