import * as React from "react";
import { SidePanel } from "@/components/Layout";
import { Typography, Divider, Box, Link } from "@mui/material";

export default function InfoPanel({
  selectedNode,
  onDeselect,
  fileMetadata,
  uploadStatus,
  errorMessage,
}) {
  const isImporting =
    uploadStatus === "importing" || uploadStatus === "parsing";
  const hasError = uploadStatus === "error";
  const hasSuccess = uploadStatus === "success";

  // Determine Title based on state
  let title = "Properties";
  if (isImporting) title = "Importing...";
  else if (hasError) title = "Error";
  else if (hasSuccess && fileMetadata?.ontologyName)
    title = fileMetadata.ontologyName;

  return (
    <SidePanel title={title}>
      {/* Import Status / Instructions */}
      {!hasSuccess && !isImporting && !hasError && (
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontStyle: "italic",
            textAlign: "left",
          }}
        >
          Click "Import File" to select an OWL, RDF, or XML file.
        </Typography>
      )}

      {isImporting && (
        <Typography variant="body2" color="text.secondary" textAlign="left">
          {uploadStatus === "importing"
            ? "Reading file..."
            : "Parsing ontology structure..."}
        </Typography>
      )}

      {hasError && (
        <Typography variant="body2" color="error" textAlign="left">
          {errorMessage || "An error occurred during import."}
        </Typography>
      )}

      {/* Metadata (Ontology Details) */}
      {hasSuccess && fileMetadata && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {fileMetadata.ontologyDescription && (
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="left"
                sx={{ wordBreak: "break-word" }}
              >
                {fileMetadata.ontologyDescription}
              </Typography>
            </Box>
          )}

          {!selectedNode &&
            (fileMetadata.nodeCount !== undefined ||
              fileMetadata.edgeCount !== undefined) && (
              <>
                <Divider />
                <Box sx={{ display: "flex", gap: 3 }}>
                  {fileMetadata.nodeCount !== undefined && (
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        Nodes
                      </Typography>
                      <Typography variant="h6">
                        {fileMetadata.nodeCount}
                      </Typography>
                    </Box>
                  )}
                  {fileMetadata.edgeCount !== undefined && (
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        Edges
                      </Typography>
                      <Typography variant="h6">
                        {fileMetadata.edgeCount}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            )}
        </Box>
      )}

      {/* Selected Node Details */}
      {selectedNode && (
        <>
          <Divider sx={{ my: 1 }} />

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="left"
              sx={{
                textTransform: "uppercase",
                fontWeight: 700,
                mb: 0.5,
                display: "block",
              }}
            >
              Label
            </Typography>
            <Typography variant="body1" textAlign="left" fontWeight={500}>
              {selectedNode.label || "No Label"}
            </Typography>
          </Box>

          {selectedNode.type && (
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="left"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 700,
                  mb: 0.5,
                  display: "block",
                }}
              >
                Type
              </Typography>
              <Typography variant="body2" textAlign="left">
                {selectedNode.type}
              </Typography>
            </Box>
          )}

          {selectedNode.uri && (
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="left"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 700,
                  mb: 0.5,
                  display: "block",
                }}
              >
                URI
              </Typography>
              <Link
                href={selectedNode.uri}
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
                sx={{
                  wordBreak: "break-all",
                  textAlign: "left",
                  display: "block",
                }}
              >
                {selectedNode.uri}
              </Link>
            </Box>
          )}
        </>
      )}
    </SidePanel>
  );
}
