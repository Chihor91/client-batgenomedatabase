import * as React from "react";
import InfoCard from "@/components/Layout/InfoCard.jsx";
import { Box, Typography } from "@mui/material";

/**
 * MetadataCard - Displays file and ontology metadata
 */
export default function MetadataCard({ fileMetadata }) {
  if (!fileMetadata) return null;

  return (
    <InfoCard>
      {/* Ontology name */}
      {fileMetadata.ontologyName && (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          {fileMetadata.ontologyName}
        </Typography>
      )}

      {/* Ontology description */}
      {fileMetadata.ontologyDescription && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "block",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {fileMetadata.ontologyDescription}
        </Typography>
      )}

      {/* Node and Edge counts */}
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
    </InfoCard>
  );
}
