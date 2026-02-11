import * as React from "react";
import { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Grid, Button } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import AuthContext from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { useSnackbar, SnackbarProvider } from "notistack";
import { PageHeader } from "@/components/Layout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useSearchParams } from "react-router-dom";
import IsolateTableTest from "./IsolateTableTest";
import IsolatePanelTest from "./IsolatePanelTest";
import { Stack } from "@mui/system";
import { FormatListBulletedAdd } from "@mui/icons-material";
import IsolateDetails from "./IsolateDetails";

function IsolateTestContent() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [idFilter, setIdFilter] = useState("");
  const [accessionFilter, setAccessionFilter] = useState("");

  // Fetch data on mount
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/source/isolate/view/all/")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching isolates:", error);
        enqueueSnackbar("Failed to fetch isolates", { variant: "error" });
        setIsLoading(false);
      });
  }, []);

  // Build column filters for Material React Table
  const columnFilters = useMemo(() => {
    const filters = [];
    if (idFilter) {
      filters.push({ id: "human_readable_id", value: idFilter });
    }
    if (accessionFilter) {
      filters.push({ id: "accession_no", value: accessionFilter });
    }
    return filters;
  }, [idFilter, accessionFilter]);

  const handleReset = () => {
    setIdFilter("");
    setAccessionFilter("");
  };

  const handleAddIsolate = () => {
    navigate("/isolate/add");
  };

  const handleAddMultipleIsolates = () => {
    navigate("/isolate/add/multiple");
  };

  // Render isolate detail view with ID parameter in the URL
  const isolateId = searchParams.get("id");

  if (isolateId) {
    return <IsolateDetails id={isolateId} />;
  }

  // Otherwise, render the table view
  return (
    <OuterBox>
      <Grid container direction="column" sx={{ minHeight: "100vh" }}>
        <PageHeader title="Isolate">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              size="small"
              onClick={handleAddIsolate}
              aria-label="Add Isolate"
              sx={{
                alignSelf: "center",
                mt: 0,
                mr: 1,
                display: "flex",
                gap: 1,
              }}
            >
              <AddIcon fontSize="small" />
              Add Isolate
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleAddMultipleIsolates}
              aria-label="Add Multiple Isolates"
              // color="secondary"
              sx={{
                alignSelf: "center",
                mt: 0,
                display: "flex",
                gap: 1,
              }}
            >
              <FormatListBulletedAdd fontSize="small" />
              Add Multiple
            </Button>
          </Stack>
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
          {/* Left: Isolate Table */}
          <IsolateTableTest
            data={data}
            columnFilters={columnFilters}
            isLoading={isLoading}
          />

          {/* Right: Filter Panel */}
          <IsolatePanelTest
            idFilter={idFilter}
            setIdFilter={setIdFilter}
            accessionFilter={accessionFilter}
            setAccessionFilter={setAccessionFilter}
            onReset={handleReset}
          />
        </Grid>
      </Grid>
    </OuterBox>
  );
}

export default function IsolateTest() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MUIThemeProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AuthProvider>
            <IsolateTestContent />
          </AuthProvider>
        </ThemeProvider>
      </MUIThemeProvider>
    </SnackbarProvider>
  );
}
