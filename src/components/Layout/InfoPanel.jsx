import * as React from "react";
import { Grid, Box, Typography } from "@mui/material";

/**
 * InfoPanel - Generic sidebar information panel
 *
 * A reusable panel component providing consistent layout for sidebars.
 * The content is completely customizable via children prop.
 *
 * @param {Object} props
 * @param {string} props.title - Panel title (default: "Status")
 * @param {React.ReactNode} props.children - Panel content
 */
export default function InfoPanel({ title = "Status", children }) {
  return (
    <Grid
      item
      sx={{
        width: { xs: "100%", md: "30%" },
        maxWidth: { xs: "100%", md: "30%" },
        minWidth: 0,
        order: { xs: 2, md: 2 },
      }}
    >
      <Box
        sx={{
          border: "1px solid #ccc",
          padding: 2,
          // backgroundColor: "#F8F9F0",
          // backgroundColor: "#EEFCEE",
          backgroundColor: "#FFFFFF",
          borderRadius: 2,
          height: { xs: "auto", md: "90%" },
          minHeight: { xs: 200, md: "auto" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>

        {/* Panel content - completely customizable */}
        {children}
      </Box>
    </Grid>
  );
}
