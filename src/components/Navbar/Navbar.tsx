import './Navbar.scss';
import footballIcon from '../../assets/football-navbar-img.png';
import englandFlag from '../../assets/england-icon.png'
import germanyFlag from '../../assets/germany-icon.png'
import franceFlag from '../../assets/france-icon.png'
import spainFlag from '../../assets/spain-icon.png'
import italyFlag from '../../assets/italy-icon.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to={'/'} className='header-link'>
        <h1>Live Football Matches</h1>
        <img src={footballIcon} alt="navbarImage" width={"60px"} height={"60px"} />
      </Link>
      <ul className='flag-navigation'>
        <li className='list-item'>
          <Link to="/live-football-app/england-leagues">
            <img src={englandFlag} alt="englandFlag" />
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/live-football-app/spain-leagues">
            <img src={spainFlag} alt="spainFlag" />
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/live-football-app/germany-leagues">
            <img src={germanyFlag} alt="germanyFlag" />
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/live-football-app/italy-leagues">
            <img src={italyFlag} alt="italyFlag" />
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/live-football-app/france-leagues">
            <img src={franceFlag} alt="franceFlag" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar