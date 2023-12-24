import { useState, useEffect } from 'react';
import Checkbox from './Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { handleCharacter } from '../../redux/features/CharactersSlice';
import { CharacterType } from './CharacterContainer';
import { RootState } from '../../redux/store';
import '../../index.css';

interface ICharacterContainer {
  item: CharacterType;
  searchValue: string;
}

const CharacterItem = ({ item, searchValue }: ICharacterContainer) => {
  const storageCharacters = useSelector((state: RootState) => state.character);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let matched = storageCharacters?.characters?.find(
      (character) => character.id === item.id
    );
    if (matched) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [storageCharacters, item]);

  let charName = item?.name;
  let charImg = item?.image;
  let charEpisode =
    item?.episode?.length === 1
      ? '1 Episode'
      : `${item?.episode?.length} Episodes`;

  const handleSearchMatch = (text: string, inputText: string) => {
    const lowerCaseInputText = inputText.toLowerCase();
    const lowerCaseText = text.toLowerCase();

    if (lowerCaseText.includes(lowerCaseInputText)) {
      const startIndex = lowerCaseText.indexOf(lowerCaseInputText);
      const endIndex = startIndex + inputText.length;
      return (
        <>
          {text.substring(0, startIndex)}
          <strong className='highlights'>
            {text.substring(startIndex, endIndex)}
          </strong>
          {text.substring(endIndex)}
        </>
      );
    }
  };

  const handleCharacterSelect = (item: CharacterType) => {
    dispatch(handleCharacter(item));
  };

  return (
    <div
      className='hover:bg-gray-200 transition duration-300 ease-in-out flex text-center align-middle justify-items-start border-2 border-gray-200'
      onClick={() => handleCharacterSelect(item)}
    >
      <Checkbox isChecked={isChecked} />
      <div>
        <div className='p-2'>
          <img
            className='object-cover w-20 h-20 rounded-lg'
            src={charImg}
            alt='@hasangkz'
          />
        </div>
      </div>
      <div className='flex flex-col text-left justify-center'>
        <div>
          <span className='hover-underline-animation'>
            {handleSearchMatch(charName, searchValue)}
          </span>
        </div>
        <div>
          <span>{charEpisode}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
