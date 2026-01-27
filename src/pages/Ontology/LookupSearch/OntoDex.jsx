import * as React from "react";
import { useState, useEffect } from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Grid } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { useSnackbar, SnackbarProvider } from "notistack";
import { PageHeader } from "@/components/Layout";
import SearchPanel from "./SearchPanel.jsx";
import SearchTable from "./SearchTable.jsx";

// Available ontologies for filtering
const ontologyOptions = [
  { id: "envo", label: "ENVO" },
  { id: "ncit", label: "NCIT" },
  { id: "ncbitaxon", label: "NCBITAXON" },
  { id: "aro", label: "ARO" },
];

export default function OntoDex() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ontologyFilter, setOntologyFilter] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Restore search state from sessionStorage on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem("ontodex_search_state");
    if (savedState) {
      try {
        const { results, searchTerm, ontologyFilter } = JSON.parse(savedState);
        setResults(results || []);
        setSearchTerm(searchTerm || "");
        setOntologyFilter(ontologyFilter || "");
      } catch (error) {
        console.error("Failed to restore search state:", error);
      }
    }
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) {
      enqueueSnackbar("Please enter a search term", { variant: "error" });
      return;
    }

    try {
      setIsLoading(true);

      // Define query parameters
      const params = new URLSearchParams({
        q: searchTerm,
        apikey: "fa2cbf3a-fbfc-45b5-bb1f-76ee601a0fe3",
      });

      // Use all ontology filters if none are selected
      const ontologies =
        ontologyFilter || ontologyOptions.map((opt) => opt.id).join(",");
      params.append("ontologies", ontologies.toUpperCase());

      // Make the API call
      const response = await fetch(
        `https://data.bioontology.org/search?${params}`,
      );

      if (!response.ok) {
        enqueueSnackbar(`API request failed: ${response.status}`, {
          variant: "error",
        });
        return;
      }

      // Update results state with the API data
      const data = await response.json();
      setResults(data.collection);

      // Save search state to sessionStorage
      sessionStorage.setItem(
        "ontodex_search_state",
        JSON.stringify({
          results: data.collection,
          searchTerm,
          ontologyFilter,
        }),
      );

      console.log("Search results:", data);
    } catch (error) {
      console.error("Error searching:", error);
      enqueueSnackbar("Failed to fetch data", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setOntologyFilter("");
    setResults([]);
    sessionStorage.removeItem("ontodex_search_state");
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
                    {/* Left: Search Table */}
                    <SearchTable
                      results={results}
                      searchTerm={searchTerm}
                      ontologyFilter={ontologyFilter}
                      isLoading={isLoading}
                    />

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
