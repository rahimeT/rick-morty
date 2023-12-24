import React from 'react';
import CharacterItem from './CharacterItem';

export type CharacterType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  created: string;
  image: string;
  episode: string[];
  url: string[];
};

interface ICharacterContainer {
  characters: CharacterType[];
  mainCharacters: CharacterType[];
  search: string;
  error: Error | null;
  reference: React.RefObject<HTMLInputElement>;
}

const CharacterContainer = ({
  characters,
  mainCharacters,
  search,
  error,
  reference,
}: ICharacterContainer) => {
  return (
    <>
      {error ? (
        <div className='text-center'>
          <h1 className='text-2xl text-red-500'>No epic character found!</h1>
        </div>
      ) : (
        <div
          className='center align-middle justify-center text-center w-2/3 max-h-96  overflow-scroll defaultCursor '
          ref={reference}
        >
          <div className='w-full'>
            {search
              ? characters
                  .filter((item) => item.name?.toLowerCase().includes(search))
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((character) => (
                    <CharacterItem
                      item={character}
                      key={character.id}
                      searchValue={search}
                    />
                  ))
              : mainCharacters
                  .filter((item) => item.name?.toLowerCase().includes(search))
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((character) => (
                    <CharacterItem
                      item={character}
                      key={character.id}
                      searchValue={search}
                    />
                  ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterContainer;
