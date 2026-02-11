import axios from "axios";
import * as React from "react";
import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { DataTable } from "@/components/Layout";
import DetailSection from "@/components/Layout/DetailSection";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import AuthContext from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PlaceIcon from "@mui/icons-material/Place";
import ScienceIcon from "@mui/icons-material/Science";
import BiotechIcon from "@mui/icons-material/Biotech";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

function jsonEmpty(data) {
  var empty = true;
  try {
    Object.keys(data).forEach(function (property) {
      if (data[property] !== "") {
        empty = false;
        return;
      }
    });
  } catch {
    empty = true;
  }
  return empty;
}

export default function SourceInfo({ id }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [host, setHost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibility, setVisibility] = useState(null);

  useEffect(() => {
    axios
      .get("/source/isolate/view/id/" + id + "/")
      .then((res) => {
        setData(res.data);
        setVisibility(res.data.visibility);

        // Fetch host/source data after isolate data
        return axios.get(
          axios.defaults.baseURL + "/source/view/id/" + res.data.source + "/",
        );
      })
      .then((res) => {
        setHost(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const updateVisibility = (id, visibility) => {
    let data = { visibility: visibility };
    axios
      .put("/source/isolate/visibility/" + id + "/", data)
      .then((res) => {
        enqueueSnackbar(res.data.message, {
          variant: "success",
          autoHideDuration: 2000,
          onClose: () => location.reload(),
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.error, {
          variant: "error",
          autoHideDuration: 2000,
          onClose: () => location.reload(),
        });
      });
  };

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
                    onClick={() => navigate("/isolatetest")}
                  >
                    Isolate
                  </Typography>
                  <NavigateNextIcon
                    sx={{ fontSize: 32, color: "text.secondary" }}
                  />
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    Isolate Details
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
                  {/* Isolate Details Area */}
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
                          {data.accession_no && (
                            <Typography variant="body2" color="text.secondary">
                              Accession No: {data.accession_no}
                            </Typography>
                          )}
                          {data.type && (
                            <Typography variant="body2" color="text.secondary">
                              Type: {data.type === 1 && " Bacteria"}
                              {data.type === 2 && " Yeast"}
                              {data.type === 3 && " Mold"}
                            </Typography>
                          )}
                        </Box>

                        <Box sx={{ textAlign: "left" }}>
                          {!jsonEmpty(data.taxonomy) && (
                            <DetailSection
                              icon={<AccountTreeIcon />}
                              title="Taxonomic Classification"
                              rows={[
                                data.taxonomy?.domain && {
                                  label: "Domain",
                                  value: data.taxonomy.domain,
                                },
                                data.taxonomy?.phylum && {
                                  label: "Phylum",
                                  value: data.taxonomy.phylum,
                                },
                                data.taxonomy?.class && {
                                  label: "Class",
                                  value: data.taxonomy.class,
                                },
                                data.taxonomy?.order && {
                                  label: "Order",
                                  value: data.taxonomy.order,
                                },
                                data.taxonomy?.family && {
                                  label: "Family",
                                  value: data.taxonomy.family,
                                },
                                data.taxonomy?.genus && {
                                  label: "Genus",
                                  value: data.taxonomy.genus,
                                },
                                data.taxonomy?.species && {
                                  label: "Species",
                                  value: data.taxonomy.species,
                                },
                              ].filter(Boolean)}
                            />
                          )}
                          {!jsonEmpty(data.morphology) && (
                            <DetailSection
                              icon={<ScienceIcon />}
                              title="Morphology"
                              rows={[
                                data.morphology?.gram_stain !== undefined && {
                                  label: "Gram Reaction",
                                  value: data.morphology.gram_stain
                                    ? "Gram-positive"
                                    : "Gram-negative",
                                },
                                data.morphology?.cell_shape && {
                                  label: "Cell Shape",
                                  value: data.morphology.cell_shape,
                                },
                                data.morphology?.motility !== undefined && {
                                  label: "Motility",
                                  value: data.morphology.motility
                                    ? "Yes"
                                    : "No",
                                },
                              ].filter(Boolean)}
                            />
                          )}
                          {!jsonEmpty(data.culture_growth) && (
                            <DetailSection
                              icon={<BiotechIcon />}
                              title="Culture and Growth Conditions"
                              rows={[
                                data.culture_growth?.medium && {
                                  label: "Culture Medium",
                                  value: data.culture_growth.medium,
                                },
                                data.culture_growth?.growth !== undefined && {
                                  label: "Culture Medium Growth",
                                  value: data.culture_growth.growth
                                    ? "Positive"
                                    : "Negative",
                                },
                                data.culture_growth?.medium_composition && {
                                  label: "Culture Medium Composition",
                                  value: data.culture_growth.medium_composition,
                                },
                                data.culture_growth?.culture_temp && {
                                  label: "Culture Growth Temperature",
                                  value: `${data.culture_growth.culture_temp} °C`,
                                },
                              ].filter(Boolean)}
                            />
                          )}
                          {!jsonEmpty(data.physiology_metabolism) && (
                            <DetailSection
                              icon={<LocalPharmacyIcon />}
                              title="Physiology and Metabolism"
                              rows={[
                                data.physiology_metabolism
                                  ?.oxygen_tolerance && {
                                  label: "Oxygen Requirement",
                                  value:
                                    data.physiology_metabolism.oxygen_tolerance,
                                },
                                data.physiology_metabolism
                                  ?.cytochrome_oxidase !== undefined && {
                                  label: "Presence of Cytochrome c Oxidase",
                                  value: data.physiology_metabolism
                                    .cytochrome_oxidase
                                    ? "Oxidase-positive"
                                    : "Oxidase-negative",
                                },
                                data.physiology_metabolism
                                  ?.endospore_forming !== undefined && {
                                  label: "Endospore-forming Capability",
                                  value: data.physiology_metabolism
                                    .endospore_forming
                                    ? "Endospore-forming"
                                    : "Non-endospore-forming",
                                },
                                data.physiology_metabolism
                                  ?.antibiotic_resistance_profile && {
                                  label: "Antibiotic Resistance Profile",
                                  value:
                                    data.physiology_metabolism
                                      .antibiotic_resistance_profile,
                                },
                              ].filter(Boolean)}
                            />
                          )}
                          {!jsonEmpty(data.safety_information) && (
                            <DetailSection
                              icon={<HealthAndSafetyIcon />}
                              title="Safety Information"
                              rows={[
                                data.safety_information?.pathogenicity_human !==
                                  undefined && {
                                  label: "Pathogenicity (Human)",
                                  value:
                                    data.safety_information
                                      .pathogenicity_human || "no",
                                },
                                data.safety_information
                                  ?.pathogenicity_animal !== undefined && {
                                  label: "Pathogenicity (Animal)",
                                  value:
                                    data.safety_information
                                      .pathogenicity_animal || "no",
                                },
                                data.safety_information?.biosafety_level && {
                                  label: "Biosafety Level",
                                  value:
                                    data.safety_information.biosafety_level,
                                },
                              ].filter(Boolean)}
                            />
                          )}
                        </Box>
                      </Paper>
                    )}
                  </Grid>

                  {/* Source Details Panel */}
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
                      <Box sx={{ px: 2, pb: 2 }}>
                        <DetailSection
                          icon={<ManageSearchIcon />}
                          title="Sample Source"
                          rows={[
                            {
                              label: "Source ID",
                              value: host?.human_readable_id,
                            },
                            { label: "Source Type", value: host?.host_type },
                            {
                              label: "Source Species",
                              value: host?.host_species,
                            },
                            {
                              label: "Sample Type",
                              value: host?.sample_type,
                            },
                          ]}
                        />
                      </Box>
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
