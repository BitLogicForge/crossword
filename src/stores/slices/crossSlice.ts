import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SYMBOL } from "../../constants/Cgeneral";
import { wordList } from '../../data/initial';
import type { TWord } from "../../types/general";
import { generateRandomId } from "../../utils/utils";

type TCrossState = {

  gridSize: {
    width: number;
    height: number;
  }
  currentGrid: string[][];
  currentGridFilled: string[][];
  showFilled: boolean;
  words: TWord[];
  noPlace: TWord[];
};


const initialState: TCrossState = {
  gridSize: {
    width: 10,
    height: 10,
  },
  currentGrid: [],
  currentGridFilled: [],
  showFilled: false,
  words: [...wordList.map(word => ({
    label: word.toUpperCase(),
    id: generateRandomId(20)
  }))],
  noPlace: [],



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
      const cleaned = action.payload.split(SYMBOL.EMPTY).join("").trim();
      if (!action.payload || cleaned === "") return;
      state.words.push({
        label: cleaned.toUpperCase().trim(),
        id: generateRandomId(20)
      });
    },
    removeWordFromList: (state, action) => {
      state.words = state.words.filter(word => word.id !== action.payload.id);
    },
    setNoPlaceWords: (state, action: PayloadAction<TWord[]>) => {
      state.noPlace = action.payload;
    },
    toggleFilledGrid: (state) => {
      state.showFilled = !state.showFilled;
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
  setNoPlaceWords,
  addWordToList,
  removeWordFromList,
  toggleFilledGrid,
  resetExampleState
} = crossSlice.actions;
export default crossSlice.reducer;
