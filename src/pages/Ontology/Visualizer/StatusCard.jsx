import * as React from "react";
import InfoCard from "@/components/Layout/InfoCard.jsx";
import { Typography } from "@mui/material";

/**
 * OntologyStatusCard - Displays import status with colored border
 */
export default function StatusCard({
  uploadStatus,
  fileMetadata,
  errorMessage,
}) {
  const getStatusColor = () => {
    switch (uploadStatus) {
      case "success":
        return "#4caf50";
      case "error":
        return "#f44336";
      case "importing":
        return "#2196f3";
      default:
        return "#757575";
    }
  };

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

  return (
    <InfoCard variant="status" color={getStatusColor()}>
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
    </InfoCard>
  );
}
