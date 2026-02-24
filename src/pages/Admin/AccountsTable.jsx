import * as React from "react";
import { useMemo, useContext, useState } from "react";
import { Grid, Paper, Typography, Button, Divider } from "@mui/material";
import { DataTable } from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import { useSnackbar } from "notistack";
import axios from "axios";

export default function AccountsTable({ data, isLoading, onAccountDeleted }) {
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    axios.delete("/user/accounts/delete/" + id + "/").then((res) => {
      if (onAccountDeleted) {
        onAccountDeleted();
        enqueueSnackbar("Account successfully deleted.", {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
    });
  };

  // Define columns for Accounts
  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "Username",
        size: 120,
      },
      {
        accessorKey: "email",
        header: "Email",
        grow: true,
      },
      {
        accessorKey: "actions",
        header: "",
        size: 80,
        enableSorting: false,
        Cell: ({ row }) => {
          // Don't show delete button for current user
          if (row.original.username === user?.username) {
            return null;
          }
          return (
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={(e) => handleDeleteClick(e, row.original.id)}
              aria-label="Delete account"
              sx={{
                borderColor: "transparent",
                "&:hover": {
                  borderColor: "#454f02",
                },
              }}
            >
              Delete
            </Button>
          );
        },
      },
    ],
    [user],
  );

  return (
    <Grid
      item
      sx={{
        width: { xs: "100%", md: "40%" },
        minWidth: 0,
        order: { xs: 2, md: 2 },
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
          Accounts
        </Typography>
        <Divider />
        <DataTable
          columns={columns}
          data={data || []}
          isLoading={isLoading}
          enablePagination={false}
        />
      </Paper>
    </Grid>
  );
}
