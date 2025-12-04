import * as React from "react";
import { Grid, Box, Typography } from "@mui/material";

/**
 * PageHeader - Generic page header with title and action buttons
 *
 * A reusable header component providing consistent layout:
 * - Left side: Page title
 * - Right side: Custom action buttons (passed as children)
 *
 * @param {Object} props
 * @param {string} props.title - Page title to display
 * @param {React.ReactNode} props.children - Action buttons or other elements for right side
 */
export default function PageHeader({ title, children }) {
  return (
    <Grid item sx={{ mt: 0 }}>
      <Box
        sx={{
          borderBottom: "1px solid #ccc",
          marginTop: "-15px",
          marginBottom: 2,
          paddingTop: 0,
          paddingLeft: 2,
          paddingRight: 2,
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: 0,
            marginTop: 0,
            lineHeight: 1,
            fontSize: { xs: "1.1rem", md: "2.0rem" },
          }}
        >
          {title}
        </Typography>

        {/* Right side actions - passed as children */}
        {children && <Box>{children}</Box>}
      </Box>
    </Grid>
  );
}
