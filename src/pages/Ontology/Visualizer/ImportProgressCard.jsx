import * as React from "react";
import InfoCard from "@/components/Layout/InfoCard.jsx";
import { Typography } from "@mui/material";

/**
 * ImportProgressCard - Shows progress during import
 */
export default function ImportProgressCard() {
  return (
    <InfoCard sx={{ textAlign: "center", py: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Importing and parsing ontology...
      </Typography>
    </InfoCard>
  );
}
