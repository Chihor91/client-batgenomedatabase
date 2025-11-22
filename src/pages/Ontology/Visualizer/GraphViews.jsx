import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import cytoscape from "cytoscape";
import cytoscapeDagre from "cytoscape-dagre";

cytoscape.use(cytoscapeDagre);

// Map parsed ontology data into Cytoscape-readable format
function buildElements(ontologyData) {
  if (
    !ontologyData ||
    !Array.isArray(ontologyData.nodes) ||
    !Array.isArray(ontologyData.edges)
  ) {
    return [];
  }

  // Convert node objects into Cytoscape node elements.
  const nodeElements = ontologyData.nodes.map((n) => ({
    data: {
      id: n.id, // unique id per node
      label: n.label || n.id, // visible text on the node
      type: n.type || "default", // used for styling rules
      uri: n.uri || "", // optional metadata
    },
  }));

  // Convert edge objects into Cytoscape edge elements.
  const edgeElements = ontologyData.edges.map((e) => ({
    data: {
      id: e.id, // unique id per edge
      source: e.source, // source node id
      target: e.target, // target node id
      label: e.label || "", // optional edge label
      type: e.type || "relation", // used for styling rules (if desired)
    },
  }));

  // Cytoscape consumes a flat array of all elements.
  return [...nodeElements, ...edgeElements];
}
