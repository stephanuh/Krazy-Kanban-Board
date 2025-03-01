import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  const titleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (auth.loggedIn()) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const logoutClick = ():void => {
    auth.logout();
    navigate('/login');
  }

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/' onClick={titleClick}>
          Krazy Kanban Board
        </Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className='nav-item'>
            <Link to='/login'>
              <button type='button'>Login</button>
            </Link>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={logoutClick}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
