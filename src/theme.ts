

export const themeOptions = {

  palette: {
    primary: {
      main: '#2e7d32',   // Green
      light: '#60ad5e',
      dark: '#005005'
    },
    secondary: {
      main: '#f9a825',   // Amber/Yellowish
      light: '#ffd95b',
      dark: '#c17900'
    },
    error: {
      main: '#d32f2f',
      light: '#ef9a9a',
      dark: '#9a0007'
    },
    warning: {
      main: '#ffa000',
      light: '#ffe57f',
      dark: '#c66900'
    },
    info: {
      main: '#2196f3',
      light: '#90caf9',
      dark: '#0d47a1'
    },
    success: {
      main: '#4caf50',
      light: '#a5d6a7',
      dark: '#2e7d32'
    },

  },
  typography: {
    fontFamily: 'Roboto, sans-serif',

  },
  spacing: 8,
  shape: {
    borderRadius: 4
  },
  transitions: {
    duration: {
      standard: 300
    }
  }
}

export const lightOptions = {
  ...themeOptions,
  mode: "light",

  palette: {
    primary: {
      main: themeOptions.palette.primary.light,
    },
    secondary: {
      main: themeOptions.palette.secondary.light,
    },
    error: {
      main: themeOptions.palette.error.light,
    },
    warning: {
      main: themeOptions.palette.warning.light,
    },
    info: {
      main: themeOptions.palette.info.light,
    },
    success: {
      main: themeOptions.palette.success.light
    },



    background: { default: "#ffffff", paper: "#fff" },
    text: { primary: "#212121", secondary: "#757575" },
  }

};

export const darkOptions = {
  ...themeOptions,
  mode: "dark",
  palette: {
    primary: {
      main: themeOptions.palette.primary.dark,
    },
    secondary: {
      main: themeOptions.palette.secondary.dark,
    },
    error: {
      main: themeOptions.palette.error.dark,
    },
    warning: {
      main: themeOptions.palette.warning.dark,
    },
    info: {
      main: themeOptions.palette.info.dark,
    },
    success: {
      main: themeOptions.palette.success.dark,
    },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#fff", secondary: "#bdbdbd" },
  }
};