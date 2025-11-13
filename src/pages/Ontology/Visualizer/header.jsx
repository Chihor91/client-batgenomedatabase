import * as React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function Header({
  // Props for OWL file import
  startFileSelect,
  fileInputRef,
  handleInputChange,
}) {
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
            fontSize: { xs: "1.1rem", md: "1.5rem" },
          }}
        >
          OntoGraph
        </Typography>

        <Box>
          <input
            ref={fileInputRef}
            type="file"
            accept=".ttl,.owl,.rdf,.xml"
            onChange={handleInputChange}
            style={{ display: "none" }}
            aria-label="Upload OWL file"
          />

          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={startFileSelect}
            aria-label="Import file"
            sx={{
              alignSelf: "center",
              mt: 0,
              display: "flex",
              gap: 1,
            }}
          >
            <UploadFileIcon fontSize="small" />
            Import File
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
