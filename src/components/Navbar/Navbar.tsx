import './Navbar.scss';
import englandFlag from '../../assets/england-icon.png'
import germanyFlag from '../../assets/germany-icon.png'
import franceFlag from '../../assets/france-icon.png'
import spainFlag from '../../assets/spain-icon.png'
import italyFlag from '../../assets/italy-icon.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>Live Football Matches</h1>

      <ul className='flag-navigation'>
        <li>
          <Link to="/">
            <img src={englandFlag} alt="englandFlag" />
          </Link>
        </li>
        <li>
          <Link to="/spain-leagues">
            <img src={spainFlag} alt="spainFlag" />
          </Link>
        </li>
        <li>
          <Link to="/germany-leagues">
            <img src={germanyFlag} alt="germanyFlag" />
          </Link>
        </li>
        <li>
          <Link to="/italy-leagues">
            <img src={italyFlag} alt="italyFlag" />
          </Link>
        </li>
        <li>
          <Link to="/france-leagues">
            <img src={franceFlag} alt="franceFlag" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar