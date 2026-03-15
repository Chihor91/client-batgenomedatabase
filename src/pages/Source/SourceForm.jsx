import axios from "axios";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import {
  Button,
  Grid,
  Paper,
  Box,
  Typography,
  Stack,
  Divider,
  TextField,
  MenuItem,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { caves } from "@/constants/caves";
import { projects } from "@/constants/projects";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

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
        rules={{ required: "Please select a project" }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            select
            required
            fullWidth
            label="Project"
            error={!!error}
            helperText={error?.message}
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
        render={({ field, fieldState: { error } }) => (
          <TextField
            select
            fullWidth
            label="Host Type"
            error={!!error}
            helperText={error?.message}
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
          render={({ field, fieldState: { error } }) => (
            <TextField
              select
              required
              fullWidth
              key={host_type}
              label="Sample Type"
              error={!!error}
              helperText={error?.message}
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

function LocationInfo({ form }) {
  const sample_site = form.watch("loc_sampling_site");

  useEffect(() => {
    let site = caves.find((cave) => cave.name === sample_site);

    if (site) {
      form.setValue("loc_city", site.municity);
      form.setValue("loc_province", site.province);
      form.setValue("loc_abbr", site.loc_abbr);
      form.setValue("loc_site_abbr", site.loc_site_abbr);
      form.setValue("loc_longitude", site.coordinates[1]);
      form.setValue("loc_latitude", site.coordinates[0]);
    }
  }, [form, sample_site]);

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700} align="left">
        Sampling Site
      </Typography>
      <Controller
        control={form.control}
        name="loc_sampling_site"
        render={({ field, fieldState: { error } }) => (
          <TextField
            select
            fullWidth
            label="Site/Cave"
            error={!!error}
            helperText={error?.message}
            {...field}
          >
            {caves.map((cave, key) => (
              <MenuItem key={key} value={cave.name}>
                {cave.name}
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
          required
          label="Sampling Point"
          {...form.register("loc_sampling_point", {
            required: "Please fill out this field",
          })}
          error={!!form.formState.errors.loc_sampling_point}
          helperText={form.formState.errors.loc_sampling_point?.message}
          placeholder="e.g. 0"
          type="number"
          min="0"
        />
        <TextField
          fullWidth
          label="City/Municipality"
          value={form.watch("loc_city") ?? ""}
          disabled
          error={!!form.formState.errors.loc_city}
          helperText={form.formState.errors.loc_city?.message}
          placeholder="e.g. Cavinti"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          label="Province"
          value={form.watch("loc_province") ?? ""}
          disabled
          error={!!form.formState.errors.loc_province}
          helperText={form.formState.errors.loc_province?.message}
          placeholder="e.g. Laguna"
        />
        <TextField
          fullWidth
          label="Coordinates"
          value={
            form.watch("loc_latitude") && form.watch("loc_longitude")
              ? `${form.watch("loc_latitude")}, ${form.watch("loc_longitude")}`
              : ""
          }
          disabled
          placeholder="e.g. 14.1667, 121.25"
        />
      </Box>
    </Stack>
  );
}

export default function SourceForm() {
  const { enqueueSnackbar } = useSnackbar();
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
        enqueueSnackbar("Source added successfully!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setTimeout(() => {
          navigate("/source");
        }, 1000);
      })
      .catch((err) => {
        enqueueSnackbar(
          "There was an error adding the source. Please try again.",
          {
            variant: "error",
            autoHideDuration: 2000,
          },
        );
        setTimeout(() => {
          navigate("/source");
        }, 1000);
      });
  };

  return (
    <>
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
            onClick={() => navigate("/source")}
          >
            Source
          </Typography>
          <NavigateNextIcon sx={{ fontSize: 32, color: "text.secondary" }} />
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
            <Divider />
            <LocationInfo form={form} />
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <Button variant="outlined" onClick={() => navigate("/source")}>
                Cancel
              </Button>
              <Button variant="contained" onClick={form.handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>
      </OuterBox>
    </>
  );
}
