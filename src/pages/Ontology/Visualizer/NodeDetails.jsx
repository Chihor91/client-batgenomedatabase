import { Box, Typography } from "@mui/material";

export default function NodeDetails({ node }) {
  if (!node) return null;

  return (
    <Box>
      <Typography variant="subtitle1">{node.label}</Typography>
      <Typography variant="body2">Type: {node.type}</Typography>
      <Typography variant="body2">URI: {node.uri}</Typography>
    </Box>
  );
}
