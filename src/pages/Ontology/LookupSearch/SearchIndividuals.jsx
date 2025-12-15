import * as React from "react";
import { useState } from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Grid } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import { PageHeader } from "@/components/Layout";
import SearchPanel from "./SearchPanel.jsx";
import ResultsTable from "./ResultsTable.jsx";

// Sample data for demonstration
const sampleResults = [
  {
    label: "Simulation",
    ontology: "miso",
    type: "class",
    description: "A computational simulation process that models a system",
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
    description:
      "a simulation is a process of using a model to predict the behavior of a systems",
  },
  {
    label: "assocation",
    ontology: "sio",
    type: "class",
    description: "an association is a relationship between two entities",
  },
  {
    label: "emulation",
    ontology: "sio",
    type: "class",
    description:
      "an emulation is a process of imitating the behavior of a system",
  },
  {
    label: "emotion",
    ontology: "sio",
    type: "class",
    description:
      "an emotion is a state of mind characterized by a complex of physiological, psychological, and behavioral responses to a stimulus or situation",
  },
  {
    label: "Dedicated",
    ontology: "sio",
    type: "class",
    description:
      "a dedicated is a process that is designed to perform a specific task",
  },
  {
    label: "Hawaii",
    ontology: "sio",
    type: "class",
    description: "Hawaii is a state of the United States of America",
  },
  {
    label: "Iphone",
    ontology: "sio",
    type: "class",
    description: "Iphone is a mobile phone",
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
  {
    label: "earth",
    ontology: "envo",
    type: "class",
    description:
      "The Earth is the third planet from the Sun and the only known planet to support life.",
  },
];

// Available ontologies for filtering
const ontologyOptions = [
  { id: "miso", label: "MISO" },
  { id: "eo", label: "EO" },
  { id: "sio", label: "SIO" },
  { id: "obi", label: "OBI" },
];

export default function SearchIndividuals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ontologyFilter, setOntologyFilter] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in ontology:", ontologyFilter);
  };

  const handleReset = () => {
    setSearchTerm("");
    setOntologyFilter("");
  };

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <OuterBox>
                <Grid container direction="column" sx={{ minHeight: "100vh" }}>
                  <PageHeader title="OntoDex" />

                  {/* Main Content Area */}
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
                    {/* Left: Results Table */}
                    <ResultsTable results={sampleResults} />

                    {/* Right: Search Panel */}
                    <SearchPanel
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      ontologyFilter={ontologyFilter}
                      setOntologyFilter={setOntologyFilter}
                      ontologyOptions={ontologyOptions}
                      onSearch={handleSearch}
                      onReset={handleReset}
                    />
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
