import React, { useEffect, useState, useRef } from 'react';
import CustomInput from '../components/CustomInput/CustomInput';
import CharacterContainer from '../components/CharacterPopUp/CharacterContainer';
import { FetchMainData } from '../components/api/FetchData';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const MainPage = () => {
  const [search, setSearch] = useState<string>('');
  const [characters, setCharacters] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const storageCharacters = useSelector((state: RootState) => state.character);
  const [isPopupVisible, setPopupVisibility] = useState<boolean>(false);
  let characterPage = storageCharacters?.characters?.length;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popupRef = useRef<HTMLInputElement | null>(null);

  const handleInputFocus = () => {
    setPopupVisibility(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setPopupVisibility(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    const fetchDataAsync = async () => {
      try {
        setIsLoading(true);
        const result = await FetchMainData('character', characterPage);
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [characterPage]);

  return (
    <>
      <div>
        <CustomInput
          setSearch={setSearch}
          query={search}
          setCharacters={setCharacters}
          loading={isLoading}
          setIsLoading={setIsLoading}
          setError={setError}
          handleInputFocus={handleInputFocus}
          reference={inputRef}
          isPopupVisible={isPopupVisible}
        />
      </div>
      <br />
      {isPopupVisible && (
        <div>
          <CharacterContainer
            reference={popupRef}
            error={error}
            mainCharacters={data}
            search={search}
            characters={characters}
          />
        </div>
      )}
    </>
  );
};

export default MainPage;
