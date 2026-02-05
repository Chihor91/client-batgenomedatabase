import * as React from "react";
import { TextField, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SidePanel } from "@/components/Layout";

export default function SourcePanelTest({
  idFilter,
  setIdFilter,
  hostSpeciesFilter,
  setHostSpeciesFilter,
  misoFilter,
  setMisoFilter,
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

      {/* Host Species Filter */}
      <TextField
        fullWidth
        label="Host Species"
        placeholder="Filter by Host Species..."
        variant="outlined"
        size="small"
        value={hostSpeciesFilter}
        onChange={(e) => setHostSpeciesFilter(e.target.value)}
        sx={{ backgroundColor: "white", mb: 2 }}
      />

      {/* MISO Categories Filter */}
      <TextField
        fullWidth
        label="MISO Categories"
        placeholder="Filter by MISO Categories..."
        variant="outlined"
        size="small"
        value={misoFilter}
        onChange={(e) => setMisoFilter(e.target.value)}
        sx={{ backgroundColor: "white" }}
      />
    </SidePanel>
  );
}
