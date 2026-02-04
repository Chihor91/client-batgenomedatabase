import React from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#454f02",
          },
          "& label.Mui-focused": {
            color: "#454f02",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#454f02",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#454f02",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#454f02",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#454f02",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#454f0214",
          },
          "&.Mui-selected": {
            backgroundColor: "#454f0214",
            "&:hover": {
              backgroundColor: "#454f0214",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#454f02",
          borderWidth: 1.5,
          color: "#454f02",
          "&:hover": {
            backgroundColor: "#454f0214",
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
          fontSize: "16px",
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: "#454f02",
          borderWidth: 1.5,
          color: "#454f02",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#454f0214",
          },
          "&:active": {
            color: "#5a6603",
            transform: "scale(0.95)",
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          "&:before": {
            display: "none",
          },
          borderBottom: "1px solid",
          borderColor: "#cfcfcf",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "#757575",
          fontSize: 15,
        },
      },
    },
  },
});

const MUIThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={customTheme}>{children}</MuiThemeProvider>;
};

export default MUIThemeProvider;
