import * as React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Link } from "@mui/material";
import { DataTable } from "@/components/Layout";
import { useSnackbar } from "notistack";
import axios from "axios";

export default function IsolateTable({ data, columnFilters, isLoading }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    axios.delete("/source/isolate/delete/" + id + "/").then((res) => {
      enqueueSnackbar("Isolate deleted successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    });
  };

  // Define columns for DataTable
  const columns = useMemo(
    () => [
      {
        accessorKey: "human_readable_id",
        header: "ID",
        size: 250,
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
      {
        id: "actions",
        header: "",
        size: 80,
        enableSorting: false,
        Cell: ({ row }) => (
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={(e) => handleDeleteClick(e, row.original.id)}
            aria-label="Delete entry"
            sx={{
              borderColor: "transparent",
              "&:hover": {
                borderColor: "#454f02",
              },
            }}
          >
            Delete
          </Button>
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
