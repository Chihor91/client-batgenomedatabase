import React from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#2e7d32",
          },
          "& label.Mui-focused": {
            color: "#2e7d32",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2e7d32",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2e7d32",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e7d32",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e7d32",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(46, 125, 50, 0.1)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(46, 125, 50, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(46, 125, 50, 0.2)",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#2e7d32",
          color: "#2e7d32",
          "&:hover": {
            borderColor: "#1b5e20",
            backgroundColor: "rgba(46, 125, 50, 0.08)",
          },
        },
        contained: {
          backgroundColor: "#2e7d32",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1b5e20",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: "#2e7d32",
        },
        h2: {
          color: "#2e7d32",
        },
        h3: {
          color: "#2e7d32",
        },
        h4: {
          color: "#2e7d32",
        },
        h5: {
          color: "#2e7d32",
        },
        h6: {
          color: "#2e7d32",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: "#454f02",
          color: "#454f02",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "rgba(69, 79, 2, 0.08)",
          },
        },
        filled: {
          backgroundColor: "#454f02",
          color: "#fff",
          borderColor: "#454f02",
          "&:hover": {
            backgroundColor: "#5a6603",
          },
        },
        outlined: {
          borderColor: "#454f02",
          color: "#454f02",
          "&:hover": {
            backgroundColor: "rgba(69, 79, 2, 0.08)",
          },
        },
        deleteIcon: {
          color: "#454f02",
          "&:hover": {
            color: "#5a6603",
          },
        },
      },
    },
  },
});

const MUIThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={customTheme}>{children}</MuiThemeProvider>;
};

export default MUIThemeProvider;
