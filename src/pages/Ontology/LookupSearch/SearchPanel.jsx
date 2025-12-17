import * as React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SidePanel } from "@/components/Layout";

export default function SearchPanel({
  searchTerm,
  setSearchTerm,
  ontologyFilter,
  setOntologyFilter,
  ontologyOptions,
  onSearch,
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
          Clear
        </Button>
      )}
      {onSearch && (
        <IconButton
          onClick={onSearch}
          aria-label="search"
          sx={{
            backgroundColor: "#2e7d32",
            color: "white",
            "&:hover": {
              backgroundColor: "#1b5e20",
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      )}
    </div>
  );

  return (
    <SidePanel title="Search" actions={actions}>
      <TextField
        fullWidth
        placeholder="Find the term you need..."
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") onSearch();
        }}
        sx={{ backgroundColor: "white", mb: 2 }}
      />

      <FormControl fullWidth size="small">
        <InputLabel
          id="ontology-filter-label"
          sx={{
            color: "#9e9e9e",
            "&.Mui-focused": {
              color: "#2e7d32",
            },
          }}
        >
          Filter by Ontology
        </InputLabel>
        <Select
          labelId="ontology-filter-label"
          value={ontologyFilter}
          label="Filter by Ontology"
          onChange={(e) => setOntologyFilter(e.target.value)}
          sx={{
            backgroundColor: "white",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2e7d32",
            },
          }}
        >
          <MenuItem value="">All ontologies</MenuItem>
          {ontologyOptions.map((ontology) => (
            <MenuItem key={ontology.id} value={ontology.id}>
              {ontology.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SidePanel>
  );
}
