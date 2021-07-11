import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import DashBoard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => {
  return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
          <Route exact path="/" component={() => <Redirect to='/home' />} />
            <Route exact path="/home" component={Home} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/dashboard' component={DashBoard} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
  );
}

export default App;
