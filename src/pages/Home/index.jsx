import { Box, Button, Grid, Typography } from "@mui/material";
import Statistics from "./Statistics";
import { Separator } from "@/components/ui/separator";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import { PageHeader } from "@/components/Layout";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <OuterBox>
                <PageHeader title="Welcome, User!">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={console.log("Click")}
                    aria-label="Import file"
                    sx={{
                      alignSelf: "center",
                      mt: 0,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <UploadFileIcon fontSize="small" />
                    Import File
                  </Button>
                </PageHeader>

                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Box
                      sx={{
                        height: { xs: "auto", md: "90%" },
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
                        height: { xs: "auto", md: "90%" },
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
                          backgroundColor: "success.main",
                          borderRadius: 2,
                          padding: 1.5,
                          mb: 2,
                        }}
                      >
                        <AccountTreeIcon
                          sx={{
                            color: "white",
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
                        onClick={console.log("Click")}
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
                        height: { xs: "auto", md: "90%" },
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
                          backgroundColor: "success.main",
                          borderRadius: 2,
                          padding: 1.5,
                          mb: 2,
                        }}
                      >
                        <SearchIcon
                          sx={{
                            color: "white",
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
                        onClick={console.log("Click")}
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
                </Grid>
              </OuterBox>
            </AuthProvider>
          </ThemeProvider>
        </MUIThemeProvider>
      </SnackbarProvider>
    </>
  );
}
