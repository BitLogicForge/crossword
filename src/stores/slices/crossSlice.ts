import { createSlice } from "@reduxjs/toolkit";
import { wordList } from '../../data/initial';

type TExampleState = {

  gridSize: {
    width: number;
    height: number;
  }
  currentGrid: string[][] | null;
  currentGridFilled: string[][] | null;
  wordList: string[];
};

const initialState: TExampleState = {
  gridSize: {
    width: 10,
    height: 10,
  },
  currentGrid: null,
  currentGridFilled: null,
  wordList: wordList,

};

const crossSlice = createSlice({
  name: "crossword",
  initialState,
  reducers: {
    setGridSize: (state, action) => {
      state.gridSize = action.payload;
    },
    setGridWidth: (state, action) => {
      state.gridSize.width = action.payload;
    },
    setGridHeight: (state, action) => {
      state.gridSize.height = action.payload;
    },
    resetGridSize: (state) => {
      state.gridSize = initialState.gridSize;
    },
    setCurrentGrid: (state, action) => {
      state.currentGrid = action.payload;
    },
    setCurrentGridFilled: (state, action) => {
      state.currentGridFilled = action.payload;
    },
    setWordList: (state, action) => {
      state.wordList = action.payload;
    },
    addWordToList: (state, action) => {
      state.wordList.push(action.payload);
    },
    removeWordFromList: (state, action) => {
      state.wordList = state.wordList.filter(word => word !== action.payload);
    },
    resetExampleState: () => initialState,

  },
});

export const {
  setGridSize,
  setGridWidth,
  setGridHeight,
  resetGridSize,
  setCurrentGrid,
  setCurrentGridFilled,
  setWordList,
  addWordToList,
  removeWordFromList,
  resetExampleState
} = crossSlice.actions;
export default crossSlice.reducer;
