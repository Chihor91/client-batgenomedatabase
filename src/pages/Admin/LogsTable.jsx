import * as React from "react";
import { useMemo } from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { DataTable } from "@/components/Layout";

export default function LogsTable({ data, isLoading }) {
  // Define columns for Activity Log
  const columns = useMemo(
    () => [
      {
        accessorKey: "datetime",
        header: "Date/Time",
        size: 180,
        Cell: ({ cell }) => (
          <span>{new Date(cell.getValue()).toLocaleString()}</span>
        ),
      },
      {
        accessorKey: "user",
        header: "User",
        size: 120,
      },
      {
        accessorKey: "detail",
        header: "Action",
        grow: true,
      },
    ],
    [],
  );

  return (
    <Grid
      item
      sx={{
        width: { xs: "100%", md: "60%" },
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
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            p: 2,
            color: "#2e7d32",
          }}
        >
          Activity Log
        </Typography>
        <Divider />
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          initialState={{
            sorting: [{ id: "datetime", desc: true }],
          }}
        />
      </Paper>
    </Grid>
  );
}
