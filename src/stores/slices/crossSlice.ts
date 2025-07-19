import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { wordList } from '../../data/initial';
import { generateRandomId } from "../../utils/utils";

type TExampleState = {

  gridSize: {
    width: number;
    height: number;
  }
  currentGrid: string[][] | null;
  currentGridFilled: string[][] | null;
  words: { label: string, id: string }[];
};

const initialState: TExampleState = {
  gridSize: {
    width: 10,
    height: 10,
  },
  currentGrid: null,
  currentGridFilled: null,
  words: [...wordList.map(word => ({
    label: word.toUpperCase(),
    id: generateRandomId(20)
  }))],



};

const crossSlice = createSlice({
  name: "crossword",
  initialState,
  reducers: {
    setGridSize: (state, action) => {
      state.gridSize = action.payload;
    },
    setGridWidth: (state, action) => {
      if (action.payload === state.gridSize.width) return;
      state.gridSize.width = action.payload;
    },
    setGridHeight: (state, action) => {
      if (action.payload === state.gridSize.height) return;
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

    addWordToList: (state, action: PayloadAction<string>) => {
      if (!action.payload || action.payload.trim() === "") return;
      state.words.push({
        label: action.payload.toUpperCase(),
        id: generateRandomId(20)
      });
    },
    removeWordFromList: (state, action) => {
      state.words = state.words.filter(word => word.id !== action.payload.id);
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

  addWordToList,
  removeWordFromList,
  resetExampleState
} = crossSlice.actions;
export default crossSlice.reducer;
