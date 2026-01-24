import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import { PageHeader } from "@/components/Layout";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LogOutIcon from "@mui/icons-material/Logout";
import LandscapeIcon from "@mui/icons-material/Landscape";
import BiotechIcon from "@mui/icons-material/Biotech";
import axios from "axios";

export default function Home() {
  const { user, logoutUser } = useContext(AuthContext);
  useEffect(() => {
    user && axios.get("/user/isloggedin/").catch((err) => logoutUser());
  }, [user, logoutUser]);

  const [isolateCount, setIsolateCount] = useState(null);
  const [sourceCount, setSourceCount] = useState(null);

  useEffect(() => {
    axios.get("/source/isolate/count/").then((res) => {
      setIsolateCount(res.data);
    });
    axios.get("/source/count/").then((res) => {
      setSourceCount(res.data);
    });
  }, []);

  const navigate = useNavigate();
  const handleButtonClick = (buttonName) => {
    buttonName === "Dashboard"
      ? navigate("/")
      : navigate(`/${buttonName.toLowerCase()}`);
  };

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <OuterBox>
                <PageHeader
                  title={user ? `Welcome, ${user.username}!` : "Welcome!"}
                >
                  {user ? (
                    <Button
                      variant="outlined"
                      id="logout-button"
                      startIcon={<LogOutIcon />}
                      onClick={logoutUser}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      id="login-button"
                      startIcon={<LoginIcon />}
                      onClick={() => navigate("login")}
                    >
                      Login
                    </Button>
                  )}
                </PageHeader>

                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Box
                      sx={{
                        // height: { xs: "auto", md: "90%" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        padding: 4,
                        backgroundImage: `url(/images/homebackground.png)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: 4,
                        color: "white",
                        m: 2,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          textAlign: "left",
                        }}
                      >
                        IMCavesPH: Built for the Semantic Web
                      </Typography>
                      <Typography
                        variant="h8"
                        sx={{
                          color: "white",
                          fontWeight: 400,
                          textAlign: "left",
                          "& a": {
                            fontWeight: 700,
                            textDecoration: "underline",
                            color: "inherit",
                          },
                        }}
                      >
                        Free-form text is often ambiguous (e.g., 'cold' vs 'low
                        temp'). To ensure accuracy, this database uses the{" "}
                        <a
                          href="https://bioportal.bioontology.org/ontologies/ENVO"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Environment Ontology (ENVO)
                        </a>{" "}
                        — the controlled vocabulary used by the world's leading
                        microbial datasets.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box
                      sx={{
                        // height: { xs: "auto", md: "90%" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        padding: 4,
                        m: 2,
                        border: "1px solid #e1e1e1",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "fit-content",
                          backgroundColor: "#eaf0ec",
                          borderRadius: 2,
                          padding: 1.5,
                          mb: 2,
                        }}
                      >
                        <AccountTreeIcon
                          sx={{
                            color: "#2e7d32",
                            fontSize: 30,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "black",
                          fontWeight: 600,
                          textAlign: "left",
                        }}
                      >
                        Ontology Graph
                      </Typography>
                      <Typography
                        variant="h8"
                        sx={{
                          color: "black",
                          fontWeight: 400,
                          textAlign: "left",
                          "& a": {
                            fontWeight: 700,
                            textDecoration: "underline",
                            color: "inherit",
                          },
                        }}
                      >
                        Visualize relationships between ontological terms.
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleButtonClick("ontograph")}
                        aria-label="View Graph"
                        sx={{
                          alignSelf: "stretch",
                          mt: 2,
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        View Graph
                      </Button>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box
                      sx={{
                        // height: { xs: "auto", md: "90%" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        padding: 4,
                        m: 2,
                        border: "1px solid #e1e1e1",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "fit-content",
                          backgroundColor: "#eaf0ec",
                          borderRadius: 2,
                          padding: 1.5,
                          mb: 2,
                        }}
                      >
                        <SearchIcon
                          sx={{
                            color: "#2e7d32",
                            fontSize: 30,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "black",
                          fontWeight: 600,
                          textAlign: "left",
                        }}
                      >
                        Ontology Index
                      </Typography>
                      <Typography
                        variant="h8"
                        sx={{
                          color: "black",
                          fontWeight: 400,
                          textAlign: "left",
                          "& a": {
                            fontWeight: 700,
                            textDecoration: "underline",
                            color: "inherit",
                          },
                        }}
                      >
                        Browse ontological terms.
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleButtonClick("ontodex")}
                        aria-label="Search Terms"
                        sx={{
                          alignSelf: "stretch",
                          mt: 2,
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        Search Terms
                      </Button>
                    </Box>
                  </Grid>
                  <Grid size={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        px: 4,
                      }}
                    >
                      <Typography variant="h6" align="left">
                        Quick Stats
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={6} mb={4}>
                    <Box
                      sx={{
                        padding: 2,
                        mx: 2,
                        border: "1px solid #e1e1e1",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 3,
                      }}
                    >
                      <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              backgroundColor: "#eaf0ec",
                              borderRadius: 10,
                              padding: 1.5,
                            }}
                          >
                            <LandscapeIcon
                              sx={{
                                color: "#2e7d32",
                                fontSize: 30,
                              }}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Typography align="left" color="#6c6c6cff">
                            Total Sources
                          </Typography>
                          <Typography
                            variant="h4"
                            align="left"
                            fontWeight={600}
                          >
                            {sourceCount}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid size={6} mb={4}>
                    <Box
                      sx={{
                        padding: 2,
                        mx: 2,
                        border: "1px solid #e1e1e1",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 3,
                      }}
                    >
                      <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              backgroundColor: "#eaf0ec",
                              borderRadius: 10,
                              padding: 1.5,
                            }}
                          >
                            <BiotechIcon
                              sx={{
                                color: "#2e7d32",
                                fontSize: 30,
                              }}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Typography align="left" color="#6c6c6cff">
                            Total Isolates
                          </Typography>
                          <Typography
                            variant="h4"
                            align="left"
                            fontWeight={600}
                          >
                            {isolateCount}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
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
