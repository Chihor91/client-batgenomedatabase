import * as React from "react";
import { useState, useEffect } from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { PageHeader } from "@/components/Layout";
import SearchPanel from "./SearchPanel.jsx";
import SearchTable from "./SearchTable.jsx";

// Available ontologies for filtering
const ontologyOptions = [
  { id: "aro", label: "Antibiotic Resistance Ontology (ARO)" },
  { id: "envo", label: "Environmental Ontology (ENVO)" },
  { id: "gmo", label: "Growth Medium Ontology (GMO)" },
  {
    id: "ncbitaxon",
    label: "NCBI Organismal Classification (NCBITAXON)",
  },
  { id: "ncit", label: "National Cancer Institute Thesaurus (NCIT)" },
  { id: "mpo", label: "Microbial Phenotype Ontology (MPO)" },
  {
    id: "phipo",
    label: "Pathogen Host Interaction Phenotype Ontology (PHIPO)",
  },
  {
    id: "snomedct",
    label: "Systematized Nomenclature of Medicine - Clinical Terms (SNOMED CT)",
  },
];

// Ontology Lookup Page
export default function Lookup() {
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
      const params = new URLSearchParams({
        q: searchTerm,
        apikey: "fa2cbf3a-fbfc-45b5-bb1f-76ee601a0fe3",
      });

      // Only filter by ontology if the user selected one
      if (ontologyFilter) {
        params.append("ontologies", ontologyFilter.toUpperCase());
      }

      const response = await fetch(
        `https://data.bioontology.org/search?${params}`,
      );

      if (!response.ok) {
        enqueueSnackbar(`API request failed: ${response.status}`, {
          variant: "error",
        });
        return;
      }

      // Update search results state with the API data
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
    <OuterBox>
      <Grid container direction="column" sx={{ minHeight: "100vh" }}>
        <PageHeader title="Lookup" />
        <Grid
          item
          container
          sx={{
            flexGrow: 1,
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            flexWrap: "nowrap",
            overflow: "hidden",
            px: { xs: 1, md: 2 },
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
  );
}
