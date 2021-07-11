import './home.css';
import vaccinationImg from '../../images/covid-vaccination.jpg';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    return (
        <section className='home'>
            <div className='vaccination-info'>
                <h1 className='emphasis-text'>Are you vaccinated?</h1>
                <h2 className='lower-emphasis-text'>Win Over Covid-19</h2>
                <p className='info-text'>COVID 19-vaccines are effective and can keep you from getting and spreading the virus that causes COVID-19. After you are fully vaccinated for COVID-19, you can resume many activities that you did before the pandemic. You can resume activities without wearing a mask or staying 6 feet apart, except where required by federal, state, local, tribal, or territorial laws, rules, and regulations, including local business and workplace guidance.
                </p>
                <button className='call-to-action' onClick={() => history.push('/search')}>Search for Slot</button>
            </div>
            <div className='hero-img'>
                <img src={vaccinationImg} alt='Vaccination' id='vaccination' />
            </div>
        </section>
    )
}

export default Home
