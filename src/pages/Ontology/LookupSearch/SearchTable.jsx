import * as React from "react";
import { useMemo } from "react";
import { Grid, Paper, Link } from "@mui/material";
import { DataTable } from "@/components/Layout";

export default function SearchTable({ results, searchTerm, ontologyFilter }) {
  // Define columns for DataTable
  const columns = useMemo(
    () => [
      {
        accessorKey: "label",
        header: "Label",
        size: 100,
        Cell: ({ cell }) => (
          <Link href="#" underline="hover" sx={{ color: "success.main" }}>
            {cell.getValue()}
          </Link>
        ),
      },
      {
        accessorKey: "ontology",
        header: "Ontology",
        size: 80,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 60,
      },
      {
        accessorKey: "description",
        header: "Description",
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
    []
  );

  const columnFilters = useMemo(
    () => (ontologyFilter ? [{ id: "ontology", value: ontologyFilter }] : []),
    [ontologyFilter]
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
          globalFilter={searchTerm}
          columnFilters={columnFilters}
        />
      </Paper>
    </Grid>
  );
}
