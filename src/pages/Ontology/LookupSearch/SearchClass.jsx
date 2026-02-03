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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import { PageHeader } from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArticleIcon from "@mui/icons-material/Article";
import SellIcon from "@mui/icons-material/Sell";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
                      <OpenInNewIcon fontSize="small" />
                      View in BioPortal
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
                            variant="h5"
                            fontWeight={700}
                            gutterBottom
                            align="left"
                          >
                            Rhinolophus affinis
                          </Typography>
                        </Box>

                        <Box sx={{ textAlign: "left" }}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              color: "#454f02",
                            }}
                          >
                            <ArticleIcon />
                            <Typography variant="h6">Definition(s)</Typography>
                          </Box>

                          <List sx={{ listStyleType: "disc", pl: 4 }}>
                            <ListItem sx={{ display: "list-item", p: 0 }}>
                              <ListItemText primary="Rhinolophus affinis, commonly known as the Intermediate Horseshoe Bat, is a species of bag in the family Rhinolophidae. It is found in South Asia, Southern China, and Southeast Asia." />
                            </ListItem>
                            <ListItem sx={{ display: "list-item", p: 0 }}>
                              <ListItemText primary="This species plays a crucial role in the ecosystem as an insect regulator. Recent studies have also highlighted its significance in viral ecology, particularly relating to coronaviruses." />
                            </ListItem>
                          </List>
                        </Box>

                        <Box sx={{ textAlign: "left" }}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              color: "#454f02",
                            }}
                          >
                            <ManageSearchIcon />
                            <Typography variant="h6">Identifier(s)</Typography>
                          </Box>

                          <Stack spacing={1} sx={{ mt: 2, width: "100%" }}>
                            {[
                              {
                                label: "IRI",
                                value:
                                  "http://purl.obolibrary.org/obo/ENV0_01000281",
                              },
                              { label: "CUI", value: "C0000000" },
                            ].map((item) => (
                              <Box
                                key={item.label}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  bgcolor: "#5a660312",
                                  p: 2,
                                  borderRadius: 2,
                                  width: "100%",
                                }}
                              >
                                <Typography
                                  color="text.secondary"
                                  fontSize={15}
                                >
                                  {item.label}
                                </Typography>
                                <Typography
                                  sx={{ fontFamily: "monospace" }}
                                  fontSize={15}
                                >
                                  {item.value}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
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
                        <Box
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Accordion disableGutters elevation={0}>
                            <AccordionSummary
                              expandIcon={<ArrowDropDownIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <SellIcon
                                  fontSize="small"
                                  sx={{ color: "#454f02" }}
                                />
                                <Typography variant="h6">Synonyms</Typography>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Stack
                                direction="row"
                                flexWrap="wrap"
                                useFlexGap
                                spacing={1}
                                sx={{ mt: 1 }}
                              >
                                <Chip label="Chiroptera" variant="outlined" />
                                <Chip
                                  label="Rhinolophidae"
                                  variant="outlined"
                                />
                                <Chip label="Extant" variant="outlined" />
                                <Chip label="Extinct" variant="outlined" />
                              </Stack>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion disableGutters elevation={0}>
                            <AccordionSummary
                              expandIcon={<ArrowDropDownIcon />}
                              aria-controls="panel2-content"
                              id="panel2-header"
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <AccountTreeIcon
                                  fontSize="small"
                                  sx={{ color: "#454f02" }}
                                />
                                <Typography variant="h6">Hierarchy</Typography>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails align="left">
                              <Typography color="text.secondary">
                                Parent
                              </Typography>
                              <Stack
                                direction="row"
                                flexWrap="wrap"
                                useFlexGap
                                spacing={1}
                                sx={{ m: 1 }}
                              >
                                <Chip label="Chiroptera" variant="outlined" />
                              </Stack>
                              <Typography color="text.secondary">
                                Children
                              </Typography>
                              <Stack
                                direction="row"
                                flexWrap="wrap"
                                useFlexGap
                                spacing={1}
                                sx={{ mt: 1 }}
                              >
                                <Chip label="Chiroptera" variant="outlined" />
                                <Chip
                                  label="Rhinolophidae"
                                  variant="outlined"
                                />
                                <Chip label="Extant" variant="outlined" />
                                <Chip label="Extinct" variant="outlined" />
                              </Stack>
                            </AccordionDetails>
                          </Accordion>
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
