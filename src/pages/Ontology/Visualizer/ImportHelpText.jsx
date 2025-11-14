import * as React from "react";
import InfoCard from "@/components/Layout/InfoCard.jsx";
import { Typography } from "@mui/material";

/**
 * ImportHelpText - Help text shown when idle
 */
export default function ImportHelpText() {
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
