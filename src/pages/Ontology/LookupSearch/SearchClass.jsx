import * as React from "react";
import { useState } from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import { PageHeader } from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Individual() {
  const navigate = useNavigate();
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <OuterBox>
                <Grid container direction="column" sx={{ minHeight: "100vh" }}>
                  {/* Custom Page Header */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      mt: "-15px",
                      mb: 2,
                      px: 2,
                      height: "44px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => navigate("/ontodex")}
                    >
                      OntoDex
                    </Typography>
                    <NavigateNextIcon
                      sx={{ fontSize: 32, color: "text.secondary" }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                      Class Details
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      aria-label="add to isolate"
                      sx={{
                        alignSelf: "center",
                        mt: 0,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <AddCircleOutlineIcon fontSize="small" />
                      Add to Isolate
                    </Button>
                  </Stack>

                  <Grid
                    item
                    container
                    sx={{
                      flexGrow: 1,
                      flexDirection: { xs: "column", md: "row" },
                      gap: 2,
                      flexWrap: "nowrap",
                      overflow: "visible",
                      px: { xs: 1, md: 2 },
                      pb: 2,
                    }}
                  >
                    {/* Main Content Area */}
                    <Grid
                      item
                      sx={{
                        width: { xs: "100%", md: "70%" },
                        minWidth: 0,
                        order: { xs: 1, md: 1 },
                      }}
                    >
                      <Paper
                        variant="outlined"
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 3,
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            variant="h4"
                            fontWeight={700}
                            gutterBottom
                            align="left"
                          >
                            Rhinolophus affinis
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            gutterBottom
                            align="left"
                          >
                            Intermediate Horseshoe Bat
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Chip
                              label="Chiroptera"
                              color="primary"
                              size="small"
                            />
                            <Chip
                              label="Rhinolophidae"
                              color="primary"
                              variant="outlined"
                              size="small"
                            />
                            <Chip label="Extant" color="success" size="small" />
                          </Stack>
                        </Box>

                        <Divider />

                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            gutterBottom
                            align="left"
                          >
                            Description
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            paragraph
                            align="left"
                          >
                            Rhinolophus affinis, commonly known as the
                            Intermediate Horseshoe Bat, is a species of bag in
                            the family Rhinolophidae. It is found in South Asia,
                            Southern China, and Southeast Asia. The species is
                            known for its wide distribution and adaptability to
                            various habitats, ranging from forests to caves.
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            align="left"
                          >
                            This species plays a crucial role in the ecosystem
                            as an insect regulator. Recent studies have also
                            highlighted its significance in viral ecology,
                            particularly relating to coronaviruses.
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Side Panel */}
                    <Grid
                      item
                      sx={{
                        width: { xs: "100%", md: "30%" },
                        maxWidth: { xs: "100%", md: "30%" },
                        minWidth: 0,
                        order: { xs: 2, md: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          border: "1px solid #e1e1e1",
                          padding: 2,
                          backgroundColor: "#FFFFFF",
                          borderRadius: 3,
                          height: "auto",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          overflow: "auto",
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          variant="h6"
                          align="left"
                          sx={{ fontWeight: 600 }}
                        >
                          Metadata
                        </Typography>

                        <Box
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Box sx={{ textAlign: "left" }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontWeight={700}
                              sx={{
                                textTransform: "uppercase",
                                display: "block",
                                mb: 0.5,
                              }}
                              align="left"
                            >
                              Source
                            </Typography>
                            <Typography variant="body2" align="left">
                              Bat Genome Database (BGD)
                            </Typography>
                          </Box>

                          <Box sx={{ textAlign: "left" }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontWeight={700}
                              sx={{
                                textTransform: "uppercase",
                                display: "block",
                                mb: 0.5,
                              }}
                              align="left"
                            >
                              Last Updated
                            </Typography>
                            <Typography variant="body2" align="left">
                              2024-03-15
                            </Typography>
                          </Box>

                          <Box sx={{ textAlign: "left" }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontWeight={700}
                              sx={{
                                textTransform: "uppercase",
                                display: "block",
                                mb: 0.5,
                              }}
                              align="left"
                            >
                              Contributor
                            </Typography>
                            <Typography variant="body2" align="left">
                              Dr. Wayne Enterprises
                            </Typography>
                          </Box>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Box sx={{ mt: "auto", pt: 1, textAlign: "left" }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontStyle: "italic" }}
                            align="left"
                          >
                            ID: rhinolophus_affinis_001
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </OuterBox>
            </AuthProvider>
          </ThemeProvider>
        </MUIThemeProvider>
      </SnackbarProvider>
    </>
  );
}
