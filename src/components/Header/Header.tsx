import { NavLink } from 'react-router-dom';
import '../../index.css';

const Header = () => {
  return (
    <div className='border-b p-5'>
      <header className='flex justify-between items-center'>
        <NavLink to='/'>
          <h2 className='md:text-4xl title'>RICK & MORTY</h2>
        </NavLink>
      </header>
    </div>
  );
};

export default Header;
