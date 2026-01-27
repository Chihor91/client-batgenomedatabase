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

  // Define columns for DataTable
  const columns = useMemo(
    () => [
      {
        accessorKey: "prefLabel",
        header: "Label",
        size: 100,
        Cell: ({ cell }) => (
          <Link
            component="button"
            variant="body2"
            underline="hover"
            onClick={() =>
              navigate("/ontodex/class", {
                state: {
                  searchResults: results,
                  searchTerm,
                  ontologyFilter,
                },
              })
            }
            sx={{ color: "success.main", textAlign: "left" }}
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        accessorFn: (row) => row.links.ontology.split("/").pop(),
        header: "Ontology",
        size: 80,
      },
      {
        accessorFn: (row) => row["@type"]?.split("#").pop() || "Class",
        header: "Type",
        size: 60,
      },
      {
        accessorFn: (row) => row.definition?.[0] || "",
        header: "Definition",
        grow: true,
        Cell: ({ cell }) => (
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
          p: 3,
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
