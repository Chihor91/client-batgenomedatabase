import * as React from "react";
import { TextField, Button } from "@mui/material";
import { SidePanel } from "@/components/Layout";

export default function IsolatePanelTest({
  idFilter,
  setIdFilter,
  accessionFilter,
  setAccessionFilter,
  onReset,
}) {
  const actions = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {onReset && (
        <Button variant="outlined" size="small" onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  );

  return (
    <SidePanel title="Filters" actions={actions}>
      {/* ID Filter */}
      <TextField
        fullWidth
        label="ID"
        placeholder="Filter by ID..."
        variant="outlined"
        size="small"
        value={idFilter}
        onChange={(e) => setIdFilter(e.target.value)}
        sx={{ backgroundColor: "white", mb: 2 }}
      />

      {/* Accession Number Filter */}
      <TextField
        fullWidth
        label="Accession Number"
        placeholder="Filter by Accession Number..."
        variant="outlined"
        size="small"
        value={accessionFilter}
        onChange={(e) => setAccessionFilter(e.target.value)}
        sx={{ backgroundColor: "white" }}
      />
    </SidePanel>
  );
}
