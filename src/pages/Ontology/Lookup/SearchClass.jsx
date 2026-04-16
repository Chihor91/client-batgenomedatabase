import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  NavigateNext as NavigateNextIcon,
  OpenInNew as OpenInNewIcon,
  Article as ArticleIcon,
  Sell as SellIcon,
  ManageSearch as ManageSearchIcon,
} from "@mui/icons-material";
import OuterBox from "@/components/Custom/OuterBox.jsx";

export default function Individual() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the class data from navigation state (if it exists)
  const classData = location.state?.classData || {};

  // Destructure classData fields
  const {
    prefLabel = "Unknown Class",
    definition = [],
    "@id": iri = "",
    synonym = [],
    cui = [],
    semanticType = [],
    links = {},
  } = classData;

  // Get ontology name from the links
  const ontologyName = links?.ontology?.split("/").pop() || "Unknown";
  const bioPortalUrl = links?.ui || "#";

  return (
    <OuterBox>
      <Grid container direction="column" sx={{ minHeight: "100vh" }}>
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
            onClick={() => navigate("/ontodex")}
          >
            OntoDex
          </Typography>
          <NavigateNextIcon sx={{ fontSize: 32, color: "text.secondary" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            Class Details
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            size="small"
            aria-label="View in BioPortal"
            href={bioPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<OpenInNewIcon />}
            sx={{ alignSelf: "center" }}
          >
            View in BioPortal
          </Button>
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
          {/* Left: Class Details */}
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
                gap: 3,
              }}
            >
              {/* Label and Definition(s) */}
              <Box
                sx={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                  align="left"
                >
                  {prefLabel}
                </Typography>
                <Chip color="success" label={ontologyName} />
              </Box>

              <Box sx={{ textAlign: "left" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    color: "#454f02",
                  }}
                >
                  <ArticleIcon />
                  <Typography variant="h6">Definition(s)</Typography>
                </Box>
                <List sx={{ listStyleType: "disc", pl: 4 }}>
                  {definition.length > 0 ? (
                    definition.map((def, index) => (
                      <ListItem key={index} sx={{ display: "list-item", p: 0 }}>
                        <ListItemText primary={def} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem sx={{ display: "list-item", p: 0 }}>
                      <ListItemText primary="No definition available." />
                    </ListItem>
                  )}
                </List>
              </Box>

              {/* Identifiers */}
              <Box sx={{ textAlign: "left" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    color: "#454f02",
                  }}
                >
                  <ManageSearchIcon />
                  <Typography variant="h6">Identifier(s)</Typography>
                </Box>

                <Stack spacing={1} sx={{ mt: 2, width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#5a660312",
                      p: 2,
                      borderRadius: 2,
                      width: "100%",
                    }}
                  >
                    <Typography color="text.secondary" fontSize={15}>
                      IRI
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace" }} fontSize={15}>
                      {iri}
                    </Typography>
                  </Box>

                  {cui.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "#5a660312",
                        p: 2,
                        borderRadius: 2,
                        width: "100%",
                      }}
                    >
                      <Typography color="text.secondary" fontSize={15}>
                        CUI
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "monospace" }}
                        fontSize={15}
                      >
                        {cui.join(", ")}
                      </Typography>
                    </Box>
                  )}

                  {semanticType.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "#5a660312",
                        p: 2,
                        borderRadius: 2,
                        width: "100%",
                      }}
                    >
                      <Typography color="text.secondary" fontSize={15}>
                        Semantic Type
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "monospace" }}
                        fontSize={15}
                      >
                        {semanticType.join(", ")}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Right: Related Terms */}
          <Grid
            item
            sx={{
              width: { xs: "100%", md: "30%" },
              maxWidth: { xs: "100%", md: "30%" },
              minWidth: 0,
              order: { xs: 2, md: 2 },
            }}
          >
            <Box
              sx={{
                border: "1px solid #e1e1e1",
                padding: 2,
                backgroundColor: "#FFFFFF",
                borderRadius: 3,
                height: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                overflow: "auto",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <SellIcon fontSize="small" />
                  <Typography variant="h6">Synonyms</Typography>
                </Box>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  useFlexGap
                  spacing={1}
                  sx={{ mt: 1 }}
                >
                  {synonym.length > 0 ? (
                    synonym.map((syn, index) => (
                      <Chip key={index} label={syn} variant="outlined" />
                    ))
                  ) : (
                    <Typography
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      No synonyms available.
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </OuterBox>
  );
}
