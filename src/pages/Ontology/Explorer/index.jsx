import * as React from "react";
import { useState } from "react";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Button, Grid } from "@mui/material";
import GraphView from "./GraphView.jsx";
import useOWLImport from "./useOWLImport.js";
import { PageHeader } from "@/components/Layout";
import InfoPanel from "./InfoPanel.jsx";
import UploadFileIcon from "@mui/icons-material/UploadFile";

// Graph Explorer Page
export default function Explorer() {
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

  return (
    <>
      <OuterBox>
        <Grid container direction="column" sx={{ height: "100vh" }}>
          <PageHeader title="Explorer">
            <input
              ref={fileInputRef}
              type="file"
              accept=".ttl,.owl,.rdf,.xml"
              onChange={handleInputChange}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
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
              px: { xs: 1, md: 2 },
            }}
          >
            <GraphView
              parsedData={parsedData}
              onNodeSelect={handleNodeSelect}
              onNodeDeselect={handleNodeDeselect}
            />
            <InfoPanel
              selectedNode={selectedNode}
              onDeselect={handleNodeDeselect}
              fileMetadata={fileMetadata}
              uploadStatus={uploadStatus}
              errorMessage={errorMessage}
            />
          </Grid>
        </Grid>
      </OuterBox>
    </>
  );
}
