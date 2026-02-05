import * as React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Link, Chip, Box } from "@mui/material";
import { DataTable } from "@/components/Layout";
import { category_1 } from "@/constants/miso";

export default function SourceTableTest({ data, columnFilters, isLoading }) {
  const navigate = useNavigate();

  // Helper function to get MISO category color
  const getMisoColor = (categoryName) => {
    const category = category_1.find((item) => item.name === categoryName);
    return category?.color_code || "#e0e0e0";
  };

  // Define columns for DataTable
  const columns = useMemo(
    () => [
      {
        accessorKey: "human_readable_id",
        header: "ID",
        size: 100,
        Cell: ({ cell, row }) => (
          <Link
            component="button"
            variant="body2"
            underline="hover"
            onClick={() => navigate("/source?id=" + row.original.id)}
            sx={{ color: "#2e7d32", textAlign: "left" }}
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        accessorKey: "host_species",
        header: "Host Species",
        size: 120,
        Cell: ({ cell }) => (
          <span style={{ textAlign: "left" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "miso_categories_string",
        header: "MISO Categories",
        grow: true,
        Cell: ({ row }) => {
          const miso = row.original.miso_categories;

          const displayMISO = (categoryArray, index) => {
            if (!categoryArray || categoryArray.length === 0) return null;
            const color = getMisoColor(categoryArray[0]);

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 0.5,
                  flexWrap: "wrap",
                  mb: 0.5,
                }}
              >
                {categoryArray.map((cat, catIndex) => (
                  <Chip
                    key={catIndex}
                    label={cat}
                    size="small"
                    sx={{
                      backgroundColor: color,
                      color: "text.primary",
                      fontWeight: "normal",
                      fontSize: "0.75rem",
                    }}
                  />
                ))}
              </Box>
            );
          };

          return (
            <Box>
              {JSON.stringify(miso) !== "{}" && miso?.length !== 0
                ? miso?.length === 1
                  ? displayMISO(miso[0], 0)
                  : miso.map((item, index) => displayMISO(item, index))
                : null}
            </Box>
          );
        },
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
