import {Link} from 'react-router-dom';
import '../styles/Header.css'

function Header() {
    return (
        <div className='header'>
            <div className='logo'>
                <img src="/assets/images/website-logo.webp" alt="Invalid path" />
            </div>
            <nav>
                <Link to='/'>Dashboard</Link>
                <Link to='/cart'>Cart</Link>
                <Link to='/login'>Login</Link>
                <Link to='/signin'>Sign In</Link>
            </nav>
        </div>
    );
}

export default Header;