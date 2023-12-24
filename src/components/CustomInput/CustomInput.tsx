import React, { useEffect } from 'react';
import { CiSquareRemove } from 'react-icons/ci';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCharacter } from '../../redux/features/CharactersSlice';
import { FetchQueryData } from '../api/FetchData';
import { RootState } from '../../redux/store';
import { CharacterType } from '../CharacterPopUp/CharacterContainer';
import { GoTriangleDown } from 'react-icons/go';
import { GoTriangleUp } from 'react-icons/go';
import '../../index.css';

interface ICustomInput {
  setSearch: (search: string) => void;
  setCharacters: (characters: any) => void;
  query: string;
  loading: boolean;
  setIsLoading: (loading: boolean) => void;
  setError: (error: any) => void;
  handleInputFocus: () => void;
  reference: React.RefObject<HTMLInputElement>;
  isPopupVisible: boolean;
}

const CustomInput = ({
  setSearch,
  setCharacters,
  query,
  loading,
  setIsLoading,
  setError,
  handleInputFocus,
  reference,
  isPopupVisible,
}: ICustomInput) => {
  const storageCharacters = useSelector((state: RootState) => state.character);
  const dispatch = useDispatch();
  const handleCharacterRemove = (character: CharacterType) => {
    dispatch(deleteCharacter(character));
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setIsLoading(true);
        const result = await FetchQueryData('character/?name', { query });
        setCharacters(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchDataAsync();
      setError(null);
    } else {
      setCharacters([]);
    }
  }, [query]);

  return (
    <Spin spinning={loading}>
      <div className='flex items-center justify-center align-middle '>
        <div className='w-2/3' ref={reference} onFocus={handleInputFocus}>
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder='What are you looking for, pickle?'
            className='w-full h-10 border-b-2 border-green-600 outline-none '
          />
          {storageCharacters?.characters?.length > 0 ? (
            <div className='flex flex-wrap'>
              {storageCharacters.characters.map((selectedCharacter) => (
                <div
                  key={selectedCharacter.id}
                  className='p-2 flex text-center align-middle justify-center items-center border-2 border-gray-200'
                >
                  <div>
                    <small> {selectedCharacter.name}</small>
                  </div>
                  <div>
                    <CiSquareRemove
                      className='w-5 h-5 ml-2 mt-1 cursor-pointer'
                      onClick={() => handleCharacterRemove(selectedCharacter)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          {isPopupVisible ? (
            <GoTriangleDown className='icon' />
          ) : (
            <GoTriangleUp className='icon' />
          )}
        </div>
      </div>
    </Spin>
  );
};

export default CustomInput;
