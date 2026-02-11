import axios from "axios";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { DataTable } from "@/components/Layout";
import DetailSection from "@/components/Layout/DetailSection";
import { Grid, Paper, Box, Typography, Stack, Divider } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PetsIcon from "@mui/icons-material/Pets";
import PlaceIcon from "@mui/icons-material/Place";

export default function SourceInfo({ id }) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isolates, setIsolates] = useState([]);

  useEffect(() => {
    axios
      .get(axios.defaults.baseURL + "/source/view/id/" + id + "/")
      .then((res) => {
        setData(res.data);

        // Fetch isolates under the source
        return axios.get("/source/isolate/source/" + res.data.id + "/");
      })
      .then((res) => {
        setIsolates(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "human_readable_id",
        header: "ID",
        size: 100,
      },
      {
        accessorKey: "accession_no",
        header: "Accession Number",
        size: 120,
      },
    ],
    [navigate],
  );

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <OuterBox>
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
                    onClick={() => navigate("/sourcetest")}
                  >
                    Source
                  </Typography>
                  <NavigateNextIcon
                    sx={{ fontSize: 32, color: "text.secondary" }}
                  />
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    Source Details
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
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
                  {/* Source Details Area */}
                  <Grid
                    item
                    sx={{
                      width: { xs: "100%", md: "60%" },
                      minWidth: 0,
                      order: { xs: 1, md: 1 },
                    }}
                  >
                    {data && (
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
                        <Typography variant="h5" fontWeight={700} align="left">
                          {data.human_readable_id}
                        </Typography>

                        <Box sx={{ textAlign: "left" }}>
                          <DetailSection
                            icon={<ManageSearchIcon />}
                            title="Basic Information"
                            rows={[
                              {
                                label: "Collection",
                                value: `${data.collection_name} (${data.collection})`,
                              },
                              {
                                label: "Institution",
                                value: `${data.institution_name} (${data.institution})`,
                              },
                              {
                                label: "Project",
                                value: `${data.project_name} (${data.project_abbr})`,
                              },
                            ]}
                          />
                          <DetailSection
                            icon={<PetsIcon />}
                            title="Host Information"
                            rows={[
                              { label: "Host Type", value: data.host_type },
                              {
                                label: "Host Species",
                                value: data.host_species,
                              },
                              { label: "Sample Type", value: data.sample_type },
                            ]}
                          />
                          <DetailSection
                            icon={<PlaceIcon />}
                            title="Sampling Information"
                            rows={[
                              {
                                label: "Location",
                                value:
                                  data.loc_city && data.loc_province
                                    ? `${data.loc_city}, ${data.loc_province} (${data.loc_abbr})`
                                    : null,
                              },
                              {
                                label: "Sampling Site",
                                value: data.loc_sampling_site
                                  ? `${data.loc_sampling_site} (${data.loc_site_abbr})`
                                  : null,
                              },
                              {
                                label: "Sampling Point",
                                value: data.loc_sampling_point,
                              },
                            ]}
                          />
                        </Box>
                      </Paper>
                    )}
                  </Grid>

                  {/* Isolates Panel */}
                  <Grid
                    item
                    sx={{
                      width: { xs: "100%", md: "40%" },
                      maxWidth: { xs: "100%", md: "40%" },
                      minWidth: 0,
                      order: { xs: 2, md: 2 },
                    }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 3,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          p: 2,
                          color: "#2e7d32",
                        }}
                      >
                        <ManageSearchIcon fontSize="small" />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          Isolates
                        </Typography>
                      </Box>

                      <Divider />
                      <DataTable
                        columns={columns}
                        data={isolates || []}
                        enablePagination={false}
                      />
                    </Paper>
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
