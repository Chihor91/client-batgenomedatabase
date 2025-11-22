import * as React from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Button, Grid, Typography } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import GraphView from "./GraphView.jsx";
import StatusCard from "./StatusCard.jsx";
import ImportProgressCard from "./ImportProgressCard.jsx";
import ImportHelpText from "./ImportHelpText.jsx";
import useOWLImport from "./useOWLImport.js";
import { PageHeader, InfoPanel, MetadataCard } from "@/components/Layout";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function OntoGraph() {
  const {
    parsedData,
    uploadStatus,
    fileMetadata,
    errorMessage,
    startFileSelect,
    fileInputRef,
    handleInputChange,
  } = useOWLImport();

  // MODIFIED - Store parsed data in component state for use throughout the app
  // parsedData shape: { nodes: Array, edges: Array, metadata: Object }
  // Example:
  // {
  //   nodes: [
  //     { id: "Person", label: "Person", type: "class", uri: "http://example.org/ontology#Person" },
  //     { id: "Organization", label: "Organization", type: "class", uri: "http://example.org/ontology#Organization" }
  //   ],
  //   edges: [
  //     { id: "edge_0", source: "Person", target: "Agent", label: "subClassOf", type: "subClassOf" }
  //   ],
  //   metadata: { ontologyURI: "http://example.org/ontology", title: "...", description: "..." }
  // }

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <OuterBox>
                <Grid container direction="column" sx={{ height: "100vh" }}>
                  <PageHeader title="OntoGraph">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".ttl,.owl,.rdf,.xml"
                      onChange={handleInputChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={startFileSelect}
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

                  <Grid
                    item
                    container
                    sx={{
                      flexGrow: 1,
                      flexDirection: { xs: "column", md: "row" },
                      gap: 2,
                      flexWrap: "nowrap",
                    }}
                  >
                    <GraphView parsedData={parsedData} />
                    <InfoPanel title="Properties">
                      {uploadStatus === "idle" && (
                        <StatusCard
                          uploadStatus={uploadStatus}
                          fileMetadata={fileMetadata}
                          errorMessage={errorMessage}
                        />
                      )}

                      {uploadStatus === "importing" && <ImportProgressCard />}

                      {uploadStatus === "success" && (
                        <MetadataCard fileMetadata={fileMetadata} />
                      )}

                      {uploadStatus === "idle" && <ImportHelpText />}
                    </InfoPanel>
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
