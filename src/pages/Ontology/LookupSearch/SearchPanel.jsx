import * as React from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InfoPanel } from "@/components/Layout";

/**
 * SearchPanel - Search controls for OntoDex
 *
 * @param {Object} props
 * @param {string} props.searchTerm - Current search term
 * @param {function} props.setSearchTerm - Update search term
 * @param {string} props.ontologyFilter - Selected ontology filter
 * @param {function} props.setOntologyFilter - Update ontology filter
 * @param {Array} props.ontologyOptions - Available ontology options
 * @param {function} props.onSearch - Search callback
 * @param {function} props.onReset - Reset/clear callback
 */
export default function SearchPanel({
  searchTerm,
  setSearchTerm,
  ontologyFilter,
  setOntologyFilter,
  ontologyOptions,
  onSearch,
  onReset,
}) {
  return (
    <InfoPanel title="Search">
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

      {/* Action Buttons - Bottom */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          mt: 2,
        }}
      >
        <Button variant="outlined" size="small" onClick={onReset}>
          Clear
        </Button>
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
      </Box>
    </InfoPanel>
  );
}
