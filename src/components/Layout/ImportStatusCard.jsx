import * as React from "react";
import InfoCard from "@/components/Layout/InfoCard.jsx";
import { Typography } from "@mui/material";

// ImportStatusCard - Displays import status feedback
export default function ImportStatusCard({ uploadStatus, errorMessage }) {
  // Success state - MetadataCard handles this
  if (uploadStatus === "success") {
    return null;
  }

  // Error state - red-bordered card
  if (uploadStatus === "error") {
    return (
      <InfoCard variant="status" color="#d32f2f">
        <Typography variant="body2" color="error">
          {errorMessage || "An error occurred during import."}
        </Typography>
      </InfoCard>
    );
  }

  // Importing state
  if (uploadStatus === "importing") {
    return (
      <InfoCard sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Reading file...
        </Typography>
      </InfoCard>
    );
  }

  // Parsing state
  if (uploadStatus === "parsing") {
    return (
      <InfoCard sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Parsing ontology structure...
        </Typography>
      </InfoCard>
    );
  }

  // Default idle state - help text
  return (
    <InfoCard variant="help">
      <Typography
        variant="caption"
        sx={{
          color: "#757575",
          fontStyle: "italic",
          mt: "auto",
        }}
      >
        Click &ldquo;Import File&rdquo; to select an OWL, RDF, or XML file (max
        50MB)
      </Typography>
    </InfoCard>
  );
}
