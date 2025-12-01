import * as React from "react";
import { useState } from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Button, Grid, Typography } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import GraphView from "./GraphView.jsx";
import useOWLImport from "./useOWLImport.js";
import {
  PageHeader,
  InfoPanel,
  MetadataCard,
  SelectionCard,
  ImportStatusCard,
} from "@/components/Layout";
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

  // Manage selected node state
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeSelect = (nodeData) => {
    setSelectedNode(nodeData);
  };

  const handleNodeDeselect = () => {
    setSelectedNode(null);
  };

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
                      overflow: { xs: "auto", md: "hidden" },
                      padding: { xs: 1, md: 0 },
                    }}
                  >
                    <GraphView
                      parsedData={parsedData}
                      onNodeSelect={handleNodeSelect}
                      onNodeDeselect={handleNodeDeselect}
                    />
                    <InfoPanel
                      title={selectedNode ? "Node Details" : "Properties"}
                    >
                      {selectedNode && (
                        <SelectionCard
                          selectedElement={selectedNode}
                          onClose={handleNodeDeselect}
                        />
                      )}

                      {uploadStatus === "success" && (
                        <MetadataCard fileMetadata={fileMetadata} />
                      )}

                      <ImportStatusCard
                        uploadStatus={uploadStatus}
                        errorMessage={errorMessage}
                      />
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
