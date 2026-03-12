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
  Switch,
  Collapse,
  FormControlLabel,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { caves } from "@/constants/caves";
import { projects } from "@/constants/projects";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Autocomplete from "@mui/material/Autocomplete";

// Custom component with switch alongside field title and value label
function SwitchField({ control, name, label, trueLabel, falseLabel }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 1.5 }}
        >
          <Typography>{label}</Typography>
          <FormControlLabel
            label={field.value ? trueLabel : falseLabel}
            labelPlacement="start"
            control={
              <Switch
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
          />
        </Stack>
      )}
    />
  );
}

// Custom component with collapsible form fields based on switch value
function Collapsible({ title, expanded, onToggle, children }) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>
        <Switch checked={expanded} onChange={onToggle} />
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}

function BasicInfo({ form, navigate }) {
  const [sources, setSources] = useState([]);

  // Fetch list of sources defined in the database
  async function fetchData() {
    try {
      const response = await axios.get(
        axios.defaults.baseURL + "/source/view/all/",
      );
      if (response.status === 200) {
        setSources(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700} align="left">
        Source Information
      </Typography>
      <Controller
        control={form.control}
        name="source"
        rules={{ required: "Please select a source" }}
        render={({ field, fieldState: { error } }) => {
          // Find the selected source object
          const selectedSource =
            sources.find((s) => s.id === field.value) || null;

          return (
            <Autocomplete
              value={selectedSource}
              onChange={(event, newValue) => {
                field.onChange(newValue ? newValue.id : "");
              }} // Update react-hook-form field with the id of the selected option
              options={sources}
              getOptionLabel={(option) => {
                const index = sources.findIndex((s) => s.id === option.id);
                return `${index + 1} ${option.human_readable_id}`;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Source"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          );
        }}
      />
      <Controller
        control={form.control}
        name="type"
        rules={{ required: "Please select an isolate type" }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            select
            label="Select an isolate type"
            {...field}
            error={!!error}
            helperText={error?.message}
            fullWidth
          >
            <MenuItem value="1">Bacteria</MenuItem>
            <MenuItem value="2">Yeast</MenuItem>
            <MenuItem value="3">Mold</MenuItem>
          </TextField>
        )}
      />
    </Stack>
  );
}

function Taxonomy({ form }) {
  return (
    <Stack spacing={2}>
      <TextField
        {...form.register("taxonomy.domain")}
        label="Domain"
        fullWidth
      />
      <TextField
        {...form.register("taxonomy.phylum")}
        label="Phylum"
        fullWidth
      />
      <TextField {...form.register("taxonomy.class")} label="Class" fullWidth />
      <TextField {...form.register("taxonomy.order")} label="Order" fullWidth />
      <TextField
        {...form.register("taxonomy.family")}
        label="Family"
        fullWidth
      />
      <TextField
        {...form.register("taxonomy.genus")}
        label="Genus"
        fullWidth
        sx={{ "& input": { fontStyle: "italic" } }}
      />
      <TextField
        {...form.register("taxonomy.species")}
        label="Species"
        fullWidth
        sx={{ "& input": { fontStyle: "italic" } }}
      />
    </Stack>
  );
}

function Morphology({ form }) {
  return (
    <Stack spacing={2}>
      <SwitchField
        control={form.control}
        label="Gram Reaction"
        name="morphology.gram_stain"
        trueLabel="Gram-positive"
        falseLabel="Gram-negative"
      />
      <Controller
        control={form.control}
        name="morphology.cell_shape"
        render={({ field }) => (
          <TextField select label="Cell Shape" {...field} fullWidth>
            <MenuItem value="coccus-shaped">Coccus-shaped</MenuItem>
            <MenuItem value="rod-shaped">Rod-shaped</MenuItem>
          </TextField>
        )}
      />
      <SwitchField
        control={form.control}
        label="Motility"
        name="morphology.motility"
        trueLabel="Yes"
        falseLabel="No"
      />
    </Stack>
  );
}

function CultureGrowth({ form }) {
  return (
    <Stack spacing={2}>
      <TextField
        {...form.register("culture_growth.medium")}
        label="Culture Medium"
        fullWidth
      />
      <SwitchField
        control={form.control}
        label="Growth"
        name="culture_growth.growth"
        trueLabel="Yes"
        falseLabel="No"
      />
      <TextField
        {...form.register("culture_growth.medium_composition")}
        label="Culture Medium Composition"
        fullWidth
      />
      <TextField
        {...form.register("culture_growth.culture_temp")}
        type="number"
        label="Growth Temperature"
        fullWidth
      />
      <TextField
        {...form.register("culture_growth.temp_range")}
        label="Temperature Range"
        fullWidth
      />
    </Stack>
  );
}
function Physiology({ form }) {
  return (
    <Stack spacing={2}>
      <TextField
        {...form.register("physiology_metabolism.oxygen_tolerance")}
        label="Oxygen Requirement"
        fullWidth
      />
      <SwitchField
        control={form.control}
        label="Presence of cytochrome c oxidase"
        name="physiology_metabolism.cytochrome_oxidase"
        trueLabel="Oxidase-positive"
        falseLabel="Oxidase-negative"
      />
      <SwitchField
        control={form.control}
        label="Endospore-forming Capability"
        name="physiology_metabolism.endospore_forming"
        trueLabel="Endospore-forming"
        falseLabel="Non-endospore-forming"
      />
      <TextField
        {...form.register(
          "physiology_metabolism.antibiotic_resistance_profile",
        )}
        label="Antibiotic Resistance Profile"
        fullWidth
      />
    </Stack>
  );
}
function Safety({ form }) {
  return (
    <Stack spacing={2}>
      <TextField
        {...form.register("safety_information.pathogenicity_human")}
        label="Pathogenicity (Human)"
        fullWidth
      />
      <TextField
        {...form.register("safety_information.pathogenicity_animal")}
        label="Pathogenicity (Animal)"
        fullWidth
      />
      <TextField
        {...form.register("safety_information.biosafety_level")}
        type="number"
        label="Biosafety Level"
        fullWidth
      />
    </Stack>
  );
}

function Visibility({ form }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700} align="left">
        Visibility
      </Typography>
      <Controller
        control={form.control}
        name="visibility"
        defaultValue="Public"
        render={({ field }) => (
          <TextField select label="Visibility" {...field} fullWidth>
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Researchers Only">Researchers Only</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </TextField>
        )}
      />
    </Stack>
  );
}

export default function IsolateFormTest() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      visibility: "Public",
    },
  });

  const [taxonomy, setTaxonomy] = useState(false);
  const [morphology, setMorphology] = useState(false);
  const [culture, setCulture] = useState(false);
  const [physiology, setPhysiology] = useState(false);
  const [safety, setSafety] = useState(false);

  const toggleSection = (value, setter, field) => {
    setter(value);
    // Remove field data from form if collapsed
    if (!value) form.unregister(field);
  };

  const onSubmit = (data) => {
    axios
      .post("source/isolate/add/", data)
      .then((res) => {
        enqueueSnackbar(
          "Isolate " + res.data.human_readable_id + " successfully created.",
          {
            variant: "success",
            autoHideDuration: 2000,
          },
        );
        setTimeout(() => {
          navigate("/isolatetest");
        }, 1000);
      })
      .catch((err) => {
        enqueueSnackbar(JSON.stringify(err.response.data.message), {
          variant: "error",
          autoHideDuration: 2000,
        });
        setTimeout(() => {
          navigate("/isolatetest");
        }, 1000);
      });
  };

  return (
    <>
      <OuterBox>
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
            onClick={() => navigate("/isolatetest")}
          >
            Isolate
          </Typography>
          <NavigateNextIcon sx={{ fontSize: 32, color: "text.secondary" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            Add Isolate
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

            <Collapsible
              title="Taxonomic Classification"
              expanded={taxonomy}
              onToggle={() => toggleSection(!taxonomy, setTaxonomy, "taxonomy")}
            >
              <Taxonomy form={form} />
            </Collapsible>
            <Divider />

            <Collapsible
              title="Morphology"
              expanded={morphology}
              onToggle={() =>
                toggleSection(!morphology, setMorphology, "morphology")
              }
            >
              <Morphology form={form} />
            </Collapsible>
            <Divider />

            <Collapsible
              title="Culture and Growth Conditions"
              expanded={culture}
              onToggle={() => toggleSection(!culture, setCulture, "culture")}
            >
              <CultureGrowth form={form} />
            </Collapsible>
            <Divider />

            <Collapsible
              title="Physiology and Metabolism"
              expanded={physiology}
              onToggle={() =>
                toggleSection(!physiology, setPhysiology, "physiology")
              }
            >
              <Physiology form={form} />
            </Collapsible>
            <Divider />

            <Collapsible
              title="Safety Information"
              expanded={safety}
              onToggle={() => toggleSection(!safety, setSafety, "safety")}
            >
              <Safety form={form} />
            </Collapsible>
            <Divider />

            <Visibility form={form} />
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/isolatetest")}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={form.handleSubmit(onSubmit)}>
                Add Isolate
              </Button>
            </Box>
          </Paper>
        </Grid>
      </OuterBox>
    </>
  );
}
