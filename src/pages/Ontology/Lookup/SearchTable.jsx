import * as React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Link } from "@mui/material";
import { DataTable } from "@/components/Layout";

export default function SearchTable({
  results,
  searchTerm,
  ontologyFilter,
  isLoading,
}) {
  const navigate = useNavigate();

  // Define columns and some custom formatting for the DataTable
  const columns = useMemo(
    () => [
      {
        accessorKey: "prefLabel",
        header: "Label",
        size: 100,
        Cell: ({ cell, row }) => (
          <Link
            component="button"
            variant="body2"
            underline="hover"
            onClick={() =>
              // Pass full class data to the class details page
              navigate("/ontodex/class", {
                state: {
                  classData: row.original,
                  searchResults: results,
                  searchTerm,
                  ontologyFilter,
                },
              })
            }
            sx={{ color: "#2e7d32", textAlign: "left" }}
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        // Extract ontology name from the full API link
        accessorFn: (row) => row.links.ontology.split("/").pop(),
        header: "Ontology",
        size: 80,
      },
      {
        // Extract class type
        accessorFn: (row) => row["@type"]?.split("#").pop() || "Class",
        header: "Type",
        size: 60,
      },
      {
        accessorFn: (row) => row.definition?.[0] || "",
        header: "Definition",
        grow: true,
        Cell: ({ cell }) => (
          // Truncate definition to 2 lines
          <span
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {cell.getValue()}
          </span>
        ),
      },
    ],
    [],
  );

  // Use the global ontology filter(s) selected from the search panel
  const columnFilters = useMemo(
    () => (ontologyFilter ? [{ id: "ontology", value: ontologyFilter }] : []),
    [ontologyFilter],
  );

  return (
    <Grid
      item
      sx={{
        width: { xs: "100%", md: "70%" },
        minWidth: 0,
        order: { xs: 1, md: 1 },
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DataTable
          columns={columns}
          data={results}
          columnFilters={columnFilters}
          isLoading={isLoading}
        />
      </Paper>
    </Grid>
  );
}
