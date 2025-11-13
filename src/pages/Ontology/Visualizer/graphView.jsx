import * as React from "react";
import { Grid, Box, Typography } from "@mui/material";

export default function MainContent() {
  return (
    <Grid
      item
      sx={{
        width: { xs: "100%", md: "70%" },
        order: { xs: 2, md: 1 },
      }}
    >
      <Box
        sx={{
          border: "1px solid #ccc",
          padding: 2,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          height: "90%",
        }}
      >
        <Typography variant="h6">
          Main Content Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>
    </Grid>
  );
}
