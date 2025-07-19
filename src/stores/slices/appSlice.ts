import { createSlice } from "@reduxjs/toolkit";
import { themeOptions } from './../../theme';

type TState = {
  isDarkTheme: boolean;
  themeOptions?: typeof themeOptions;
};

const prefersDark =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;


const initialState: TState = {
  isDarkTheme: prefersDark,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setDarkTheme: (state, action) => {
      console.log("setDarkTheme action payload:", action.payload);
      state.isDarkTheme = action.payload;
    },
    setThemeOptions: (state, action) => {
      state.themeOptions = action.payload;
    },
  },
});

export const { toggleTheme, setDarkTheme, setThemeOptions } = appSlice.actions;
export default appSlice.reducer;
