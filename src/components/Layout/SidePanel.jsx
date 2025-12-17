import * as React from "react";
import { Grid, Box, Typography } from "@mui/material";

export default function SidePanel({ title, children, actions }) {
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
          border: "1px solid #e1e1e1",
          padding: 2,
          backgroundColor: "#FFFFFF",
          borderRadius: 3,
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "auto",
          minWidth: 0,
        }}
      >
        {title && (
          <Typography variant="h6" align="left" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        )}

        {/* Panel content */}
        <Box
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {children}
        </Box>

        {/* Optional Action Buttons */}
        {actions && <Box sx={{ mt: "auto", pt: 2 }}>{actions}</Box>}
      </Box>
    </Grid>
  );
}
