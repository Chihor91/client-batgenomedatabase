import * as React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Link } from "@mui/material";
import { DataTable } from "@/components/Layout";

export default function IsolateTableTest({ data, columnFilters, isLoading }) {
  const navigate = useNavigate();

  // Define columns for DataTable
  const columns = useMemo(
    () => [
      {
        accessorKey: "human_readable_id",
        header: "ID",
        size: 150,
        Cell: ({ cell, row }) => (
          <Link
            component="button"
            variant="body2"
            underline="hover"
            onClick={() => navigate("/isolate?id=" + row.original.id)}
            sx={{ color: "#2e7d32", textAlign: "left" }}
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        accessorKey: "accession_no",
        header: "Accession Number",
        grow: true,
        Cell: ({ cell }) => (
          <span style={{ textAlign: "left" }}>{cell.getValue()}</span>
        ),
      },
    ],
    [navigate],
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
          data={data}
          columnFilters={columnFilters}
          isLoading={isLoading}
        />
      </Paper>
    </Grid>
  );
}
