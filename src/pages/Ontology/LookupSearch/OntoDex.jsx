import * as React from "react";
import { useState } from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SearchIndividuals from "./SearchIndividuals";

export default function OntoDex() {
  const navigate = useNavigate();
  const handleChipClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleSearchClick = () => {
    console.info("You clicked the Search Button.");
    navigate("/ontodex/search");
  };

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <OuterBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                }}
              >
                <Stack
                  direction="column"
                  spacing={1}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    OntoDex
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                  >
                    Discover and explore ontology terms supported by the NCBO
                    BioPortal repository.
                  </Typography>
                  <form style={{ display: "flex", alignItems: "center" }}>
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 400,
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Find the term you need..."
                        inputProps={{ "aria-label": "search for terms" }}
                      />
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                        onClick={handleSearchClick}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </form>
                  <Stack direction="row" spacing={1}>
                    <Typography
                      variant="body1"
                      sx={{ alignSelf: "center", color: "text.secondary" }}
                    >
                      Search within specific ontologies:
                    </Typography>
                    <Chip
                      label="MISO"
                      sx={{ backgroundColor: "#454F02", color: "#ffffff" }}
                      onClick={handleChipClick}
                    />
                    <Chip
                      label="ENVO"
                      variant="outlined"
                      onClick={handleChipClick}
                    />
                  </Stack>
                </Stack>
              </OuterBox>
            </AuthProvider>
          </ThemeProvider>
        </MUIThemeProvider>
      </SnackbarProvider>
    </>
  );
}
