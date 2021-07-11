import './header.css';
import logo from '../../images/logo.png';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    return (
        <div className='header'>
            <div className='logo-img-wrapper' onClick={() => history.push('/home')}>
                <img className='logo-img' src={logo} alt='cowin-logo' />
            </div>
            <ul className='header-links'>
                <li className='header-link'><a href="/home">Home</a></li>
                <li className='header-link'><a href="/search">Search</a></li>
                <li className='header-link'><a href="/dashboard">Dashboard</a></li>
            </ul>
        </div>
    )
}

export default Header
