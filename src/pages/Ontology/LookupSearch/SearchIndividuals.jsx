import * as React from "react";
import { useState } from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import {
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  InputAdornment,
  Link,
  IconButton,
} from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  PageHeader,
  InfoPanel,
  MetadataCard,
  SelectionCard,
  ImportStatusCard,
} from "@/components/Layout";

// Sample data for demonstration
const sampleResults = [
  {
    label: "Simulation",
    ontology: "miso",
    type: "class",
    description: "A computational simulation process",
  },
  {
    label: "Simulation",
    ontology: "eo",
    type: "class",
    description: "A process that is a computational simulation process",
  },
  {
    label: "Simulation",
    ontology: "sio",
    type: "class",
    description: "a simulation is a process of using a model...",
  },
  {
    label: "Simulation",
    ontology: "obi",
    type: "class",
    description: "An objective specification that has a model as input...",
  },
  {
    label: "simulation experiment",
    ontology: "obi",
    type: "class",
    description: "A planned process that has some simulation as part.",
  },
];

export default function SearchIndividuals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ontologyFilter, setOntologyFilter] = useState("all");
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in ontology:", ontologyFilter);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <OuterBox>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "90vh",
                  }}
                >
                  {/* Page Header */}
                  <Box
                    sx={{
                      borderBottom: "1px solid #ccc",
                      marginTop: "-15px",
                      marginBottom: 2,
                      paddingTop: 0,
                      paddingLeft: 2,
                      paddingRight: 2,
                      height: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "left",
                        marginBottom: 0,
                        marginTop: 0,
                        lineHeight: 1,
                        fontSize: { xs: "1.5rem", md: "2.0rem" },
                      }}
                    >
                      OntoDex
                    </Typography>
                  </Box>

                  {/* Content Area - Takes remaining space */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      width: "100%",
                      p: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 4,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Search Bar Section */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          mb: 2,
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          placeholder="Find the term you need..."
                          variant="outlined"
                          size="small"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          sx={{ flex: 1 }}
                        />
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                          <Select
                            value={ontologyFilter}
                            onChange={(e) => setOntologyFilter(e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="all">All ontologies</MenuItem>
                            <MenuItem value="miso">miso</MenuItem>
                            <MenuItem value="eo">eo</MenuItem>
                            <MenuItem value="sio">sio</MenuItem>
                            <MenuItem value="obi">obi</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                          variant="contained"
                          startIcon={<SearchIcon />}
                          onClick={handleSearch}
                        >
                          Search
                        </Button>
                      </Box>

                      {/* Results Info Row */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          1-10 of 257 results for "Simulation"
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Link
                            href="#"
                            underline="hover"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.875rem",
                            }}
                          >
                            Advanced search
                          </Link>
                          <IconButton size="small">
                            <SettingsIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Results Table */}
                      <TableContainer sx={{ flexGrow: 1 }}>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                Label
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                Ontology
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                Type
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                Description
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {sampleResults.map((row, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>
                                  <Link
                                    href="#"
                                    underline="hover"
                                    sx={{ color: "success.main" }}
                                  >
                                    {row.label}
                                  </Link>
                                </TableCell>
                                <TableCell>{row.ontology}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Pagination */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          pt: 2,
                          borderTop: 1,
                          borderColor: "divider",
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          disabled={page === 1}
                          onClick={() => setPage(page - 1)}
                        >
                          Previous
                        </Button>
                        <Pagination
                          count={26}
                          page={page}
                          onChange={handlePageChange}
                          color="success"
                          siblingCount={1}
                          boundaryCount={1}
                          hidePrevButton
                          hideNextButton
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setPage(page + 1)}
                        >
                          Next
                        </Button>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </OuterBox>
            </AuthProvider>
          </ThemeProvider>
        </MUIThemeProvider>
      </SnackbarProvider>
    </>
  );
}
