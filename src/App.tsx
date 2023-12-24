import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App = () => {
  const characters = useSelector((state: RootState) => state.character);
  useEffect(() => {
    localStorage.setItem('selectedCharacters', JSON.stringify(characters));
  }, [characters]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
