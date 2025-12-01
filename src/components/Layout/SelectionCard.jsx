import * as React from "react";
import InfoCard from "@/components/Layout/InfoCard.jsx";
import { Box, Typography, Link } from "@mui/material";

/**
 * SelectionCard - Displays details of the selected element
 */
export default function SelectionCard({ selectedElement }) {
  if (!selectedElement) return null;

  return (
    <InfoCard>
      {selectedElement.label && (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          {selectedElement.label}
        </Typography>
      )}

      {selectedElement.type && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 2, display: "block" }}
        >
          Type: {selectedElement.type}
        </Typography>
      )}

      {selectedElement.uri && (
        <Link
          href={selectedElement.uri}
          target="_blank"
          rel="noopener noreferrer"
          variant="caption"
          color="primary"
          sx={{
            mb: 2,
            display: "block",
            wordBreak: "break-all",
            overflowWrap: "anywhere",
          }}
        >
          URI: {selectedElement.uri}
        </Link>
      )}
    </InfoCard>
  );
}
