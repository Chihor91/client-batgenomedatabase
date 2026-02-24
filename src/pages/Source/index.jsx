import * as React from "react";
import { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Grid, Button } from "@mui/material";
import AuthContext from "@/context/AuthContext";
import { useSnackbar, SnackbarProvider } from "notistack";
import { PageHeader } from "@/components/Layout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useSearchParams } from "react-router-dom";
import SourceTable from "./SourceTable";
import SourcePanel from "./SourcePanel";
import SourceDetails from "./SourceDetails";

function SourceContent() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [idFilter, setIdFilter] = useState("");
  const [hostSpeciesFilter, setHostSpeciesFilter] = useState("");

  // Fetch data on mount
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(axios.defaults.baseURL + "/source/view/all/")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sources:", error);
        enqueueSnackbar("Failed to fetch sources", { variant: "error" });
        setIsLoading(false);
      });
  }, []);

  // Build column filters for Material React Table
  const columnFilters = useMemo(() => {
    const filters = [];
    if (idFilter) {
      filters.push({ id: "human_readable_id", value: idFilter });
    }
    if (hostSpeciesFilter) {
      filters.push({ id: "host_species", value: hostSpeciesFilter });
    }
    return filters;
  }, [idFilter, hostSpeciesFilter]);

  const handleReset = () => {
    setIdFilter("");
    setHostSpeciesFilter("");
  };

  const handleAddSource = () => {
    navigate("/source/add");
  };

  // Render source detail view with ID parameter in the URL
  const sourceId = searchParams.get("id");

  if (sourceId) {
    return <SourceDetails id={sourceId} />;
  }

  // Otherwise, render the table view
  return (
    <OuterBox>
      <Grid container direction="column" sx={{ minHeight: "100vh" }}>
        <PageHeader title="Source">
          <Button
            variant="contained"
            size="small"
            onClick={handleAddSource}
            aria-label="Add Source"
            sx={{
              alignSelf: "center",
              mt: 0,
              display: "flex",
              gap: 1,
            }}
          >
            <AddIcon fontSize="small" />
            Add Source
          </Button>
        </PageHeader>

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
          }}
        >
          {/* Left: Source Table */}
          <SourceTable
            data={data}
            columnFilters={columnFilters}
            isLoading={isLoading}
          />

          {/* Right: Filter Panel */}
          <SourcePanel
            idFilter={idFilter}
            setIdFilter={setIdFilter}
            hostSpeciesFilter={hostSpeciesFilter}
            setHostSpeciesFilter={setHostSpeciesFilter}
            onReset={handleReset}
          />
        </Grid>
      </Grid>
    </OuterBox>
  );
}

export default function Source() {
  return <SourceContent />;
}
