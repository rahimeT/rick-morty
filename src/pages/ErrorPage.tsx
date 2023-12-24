import { Link } from 'react-router-dom';
import '../index.css';

export const ErrorPage = () => {
  return (
    <div className='errorContainer'>
      <img src={'images/notFound.png'} className='img' alt='error' />
      <h1>
        <Link to='/' className='goHome'>
          <span style={{ color: 'red' }}>Go Home!</span>
        </Link>
      </h1>
    </div>
  );
};
