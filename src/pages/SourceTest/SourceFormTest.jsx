import axios from "axios";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { DataTable } from "@/components/Layout";
import DetailSection from "@/components/Layout/DetailSection";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Stack,
  Divider,
  TextField,
  MenuItem,
} from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PetsIcon from "@mui/icons-material/Pets";
import PlaceIcon from "@mui/icons-material/Place";
import { caves } from "@/constants/caves";
import { projects } from "@/constants/projects";
import { Controller, useForm } from "react-hook-form";

function BasicInfo({ form }) {
  const project_name = form.watch("project_name");

  useEffect(() => {
    let project = projects.find(
      (project) => project.project_name === project_name,
    );
    if (project) {
      form.setValue("project_abbr", project.project_abbr);
      form.setValue("institution_name", project.institution_name);
      form.setValue("institution", project.institution_abbr);
      form.setValue("collection_name", project.collection_name);
      form.setValue("collection", project.collection_abbr);
    }
  }, [form, project_name]);

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700} align="left">
        Basic Information
      </Typography>
      <Controller
        control={form.control}
        name="project_name"
        render={({ field }) => (
          <TextField
            select
            fullWidth
            label="Project"
            error={!!form.formState.errors.project_name}
            helperText={form.formState.errors.project_name?.message}
            {...field}
          >
            {projects.map((project, key) => (
              <MenuItem key={key} value={project.project_name}>
                {project.project_name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          label="Collection"
          value={form.watch("collection_name") ?? ""}
          disabled
          placeholder="e.g. Microbial Culture Collection"
        />
        <TextField
          fullWidth
          label="Institution"
          value={form.watch("institution_name") ?? ""}
          disabled
          placeholder="e.g. UPLB Museum of Natural History"
        />
      </Box>
    </Stack>
  );
}

function HostInfo({ form }) {
  const hostSampleTypes = {
    "": [{ name: "Water", value: "WATER" }],
    BAT: [
      { name: "Bat Gut", value: "GUT" },
      { name: "Bat Rinse", value: "RINSE" },
      { name: "Guano", value: "GUANO" },
      { name: "Fresh Guano", value: "FRESH_GUANO" },
      { name: "Bat Fecal Pellet", value: "FECAL_PELLET" },
    ],
  };

  const hostTypes = [
    { name: "None", value: "" },
    { name: "Bat", value: "BAT" },
  ];

  const host_type = form.watch("host_type");

  useEffect(() => {
    form.setValue("host_species", undefined);
    form.setValue("sample_type", "");
  }, [form, host_type]);

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700} align="left">
        Host Information
      </Typography>
      <Controller
        control={form.control}
        name="host_type"
        render={({ field }) => (
          <TextField
            select
            fullWidth
            label="Host Type"
            error={!!form.formState.errors.host_type}
            helperText={form.formState.errors.host_type?.message}
            {...field}
          >
            {hostTypes.map((hostType, key) => (
              <MenuItem key={key} value={hostType.value}>
                {hostType.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          label="Host Species"
          {...form.register("host_species", {
            maxLength: {
              value: 50,
              message: "Please input below 50 characters.",
            },
          })}
          disabled={!host_type}
          placeholder="Host Species"
          error={!!form.formState.errors.host_species}
          helperText={form.formState.errors.host_species?.message}
          inputProps={{ style: { fontStyle: "italic" } }}
        />
        <Controller
          control={form.control}
          name="sample_type"
          rules={{ required: "Please select a sample type" }}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              key={host_type}
              label="Sample Type"
              error={!!form.formState.errors.sample_type}
              helperText={form.formState.errors.sample_type?.message}
              {...field}
            >
              <MenuItem disabled value="">
                Select a sample type
              </MenuItem>
              {(hostSampleTypes[host_type] ?? []).map((sampleType, key) => (
                <MenuItem key={key} value={sampleType.value}>
                  {sampleType.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
    </Stack>
  );
}

export default function SourceFormTest() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      host_type: "",
    },
  });

  const onSubmit = (data) => {
    axios
      .post("/source/add/", data)
      .then((res) => {
        alert(
          "Source " + res.data.human_readable_id + " successfully created.",
        );
        navigate("/source");
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data.message));
        navigate("/source");
      });
  };

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              <OuterBox>
                {/* Custom Page Header */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    mt: "-15px",
                    mb: 2,
                    px: 2,
                    height: "44px",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={() => navigate("/sourcetest")}
                  >
                    Source
                  </Typography>
                  <NavigateNextIcon
                    sx={{ fontSize: 32, color: "text.secondary" }}
                  />
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    Add Source
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                </Stack>

                <Grid
                  item
                  container
                  sx={{
                    flexGrow: 1,
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    flexWrap: "nowrap",
                    overflow: "visible",
                    px: { xs: 1, md: 2 },
                    pb: 2,
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
                      gap: 2,
                    }}
                  >
                    <BasicInfo form={form} />
                    <Divider />
                    <HostInfo form={form} />
                  </Paper>
                </Grid>
              </OuterBox>
            </AuthProvider>
          </ThemeProvider>
        </MUIThemeProvider>
      </SnackbarProvider>
    </>
  );
}
