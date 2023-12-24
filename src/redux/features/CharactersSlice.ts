import { createSlice } from '@reduxjs/toolkit';

interface ICharacterState {
  characters: any[];
}

const initialState: ICharacterState = {
  characters: localStorage.getItem('selectedCharacters')
    ? // @ts-ignore
      JSON.parse(localStorage.getItem('selectedCharacters'))?.characters
    : [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    handleCharacter: (state, action) => {
      const existCharacter = state.characters.find(
        (character) => character.id === action.payload.id
      );
      if (!existCharacter) {
        state.characters.unshift({ ...action.payload });
      } else {
        let newCharacters = state.characters.filter(
          (character) => character.id !== action.payload.id
        );
        state.characters = newCharacters;
      }
    },
    deleteCharacter: (state, action) => {
      let newCharacters = state.characters.filter(
        (character) => character.id !== action.payload.id
      );
      state.characters = newCharacters;
    },
  },
});
export const { handleCharacter, deleteCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;
