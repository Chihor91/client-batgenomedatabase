import * as React from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Grid } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import Header from "./header.jsx";
import GraphView from "./graphView.jsx";
import InfoBar from "./infoBar.jsx";
import useOWLImport from "./useOWLImport.js";

export default function OntoGraph() {
  const {
    parsedData,
    uploadStatus,
    fileMetadata,
    errorMessage,
    progressPercentage,
    startFileSelect,
    fileInputRef,
    handleInputChange,
    resetImport,
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
                  <Header
                    startFileSelect={startFileSelect}
                    fileInputRef={fileInputRef}
                    handleInputChange={handleInputChange}
                  />
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
                    <InfoBar
                      uploadStatus={uploadStatus}
                      progressPercentage={progressPercentage}
                      fileMetadata={fileMetadata}
                      errorMessage={errorMessage}
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
