// MODIFIED
import * as React from "react";
import { Grid, Box, Typography, LinearProgress } from "@mui/material";

/**
 * InfoBar Component
 *
 * Displays import status, progress, and file metadata for OWL file imports.
 * Shows different messages based on the current upload status.
 *
 * @param {Object} props
 * @param {string} props.uploadStatus - Current status: 'idle' | 'reading' | 'parsing' | 'success' | 'error'
 * @param {number} props.progressPercentage - Progress from 0-100
 * @param {Object} props.fileMetadata - File information (filename, size, lastModified, nodeCount, edgeCount)
 * @param {string} props.errorMessage - Error message if status is 'error'
 */
export default function InfoBar({
  uploadStatus = "idle",
  fileMetadata = null,
  errorMessage = null,
}) {
  /**
   * Get status message based on current upload status
   */
  const getStatusMessage = () => {
    switch (uploadStatus) {
      case "idle":
        return "Ready to import OWL files";

      case "importing":
        return fileMetadata?.filename
          ? `Importing: ${fileMetadata.filename}...`
          : "Importing file...";

      case "success":
        return "Successfully imported ontology";

      case "error":
        return `Import failed: ${errorMessage || "Unknown error occurred"}`;

      default:
        return "Ready to import OWL files";
    }
  };

  /**
   * Get status color based on current state
   */
  const getStatusColor = () => {
    switch (uploadStatus) {
      case "success":
        return "#4caf50"; // Green
      case "error":
        return "#f44336"; // Red
      case "reading":
      case "parsing":
        return "#2196f3"; // Blue
      default:
        return "#757575"; // Gray
    }
  };

  return (
    <Grid
      item
      sx={{
        width: { xs: "100%", md: "30%" },
        order: { xs: 1, md: 2 },
      }}
    >
      <Box
        sx={{
          border: "1px solid #ccc",
          padding: 2,
          backgroundColor: "#f0f0f0",
          borderRadius: 2,
          height: "90%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Properties
        </Typography>

        {uploadStatus === "idle" && (
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#ffffff",
              borderRadius: 1,
              borderLeft: `4px solid ${getStatusColor()}`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: getStatusColor(),
                fontWeight: 500,
                wordBreak: "break-word",
              }}
            >
              {getStatusMessage()}
            </Typography>
          </Box>
        )}

        {uploadStatus === "importing" && (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Importing and parsing ontology...
            </Typography>
          </Box>
        )}

        {/* Show file metadata only on successful import */}
        {uploadStatus === "success" && fileMetadata && (
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: 1,
              padding: 2,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              {fileMetadata.filename}
            </Typography>

            {/* Show ontology name if available */}
            {fileMetadata.ontologyName && (
              <Typography variant="body2" sx={{ mb: 1, fontStyle: "italic" }}>
                {fileMetadata.ontologyName}
              </Typography>
            )}

            {/* Show ontology description if available */}
            {fileMetadata.ontologyDescription && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 2, display: "block" }}
              >
                {fileMetadata.ontologyDescription}
              </Typography>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {fileMetadata.nodeCount !== undefined && (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Nodes:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {fileMetadata.nodeCount}
                  </Typography>
                </Box>
              )}

              {fileMetadata.edgeCount !== undefined && (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Edges:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {fileMetadata.edgeCount}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {uploadStatus === "idle" && (
          <Typography
            variant="caption"
            sx={{
              color: "#757575",
              fontStyle: "italic",
              mt: "auto",
            }}
          >
            Click &ldquo;Import File&rdquo; to select an OWL, RDF, or XML file
            (max 50MB)
          </Typography>
        )}
      </Box>
    </Grid>
  );
}
