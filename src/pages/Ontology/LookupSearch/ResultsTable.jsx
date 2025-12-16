import * as React from "react";
import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Grid, Paper, Typography, Link } from "@mui/material";

/**
 * ResultsTable - Results display for OntoDex using Material React Table
 *
 * @param {Object} props
 * @param {Array} props.results - Array of result objects
 */
export default function ResultsTable({ results, searchTerm, ontologyFilter }) {
  // Define columns for Material React Table
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
        {/* Material React Table */}
        <MaterialReactTable
          columns={columns}
          data={results}
          enableColumnActions={false}
          enableColumnFilters={false}
          enableTopToolbar={false}
          enableBottomToolbar={true}
          enableSorting={true}
          enablePagination={true}
          layoutMode="fixed"
          state={{
            globalFilter: searchTerm || undefined,
            columnFilters,
          }}
          initialState={{
            pagination: { pageSize: 10, pageIndex: 0 },
            density: "comfortable",
          }}
          muiTablePaperProps={{
            elevation: 0,
            sx: { boxShadow: "none", width: "100%" },
          }}
        />
      </Paper>
    </Grid>
  );
}
