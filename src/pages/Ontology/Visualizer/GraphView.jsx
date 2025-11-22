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

// Register the dagre layout plugin with Cytoscape
cytoscape.use(cytoscapeDagre);

// Helper: map parsed ontology data (nodes/edges) into Cytoscape element format.
// Cytoscape expects an array combining node and edge entries, each with a `data` object.
function buildElements(ontologyData) {
  // If no data yet (before parsing completes), return an empty array safely.
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

// Helper: define the Cytoscape style rules.
// These rules color nodes by their semantic "type" from parsing, and draw labeled, arrowed edges.
function getCytoscapeStyle() {
  return [
    // Base node style: label inside, with readable text.
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(label)",
        color: "#111",
        "font-size": 12,
        "text-wrap": "wrap",
        "text-max-width": 120,
        "text-valign": "center",
        "text-halign": "center",
        "text-background-color": "#ffffff",
        "text-background-opacity": 0.9,
        "text-background-padding": 2,
        "border-width": 1,
        "border-color": "#999",
        width: 28,
        height: 28,
      },
    },
    // Classes: green nodes
    {
      selector: 'node[type = "class"]',
      style: { "background-color": "#22CC22" },
    },
    // Properties: blue, with a different shape to hint semantics
    {
      selector: 'node[type = "property"]',
      style: { "background-color": "#3399FF", shape: "round-rectangle" },
    },
    // Individuals: orange
    {
      selector: 'node[type = "individual"]',
      style: { "background-color": "#FF9933" },
    },

    // Base edge style: thin, curved, with a triangle arrow and optional label.
    {
      selector: "edge",
      style: {
        width: 1.5,
        "curve-style": "bezier",
        "line-color": "#aaa",
        "target-arrow-color": "#aaa",
        "target-arrow-shape": "triangle",
        label: "data(label)",
        color: "#333",
        "font-size": 10,
        "text-rotation": "autorotate",
        "text-background-color": "#ffffff",
        "text-background-opacity": 0.8,
        "text-background-padding": 2,
      },
    },
  ];
}

// Helper: produce layout options for different layout names.
// Dagre provides a clear "top-to-bottom" hierarchical organization that often suits ontologies.
function getLayoutOptions(name, nodeCount) {
  switch (name) {
    case "dagre":
      return {
        name: "dagre",
        directed: true,
        padding: 30,
        spacingFactor: 1.1,
        rankDir: "TB",
      };
    case "circle":
      return { name: "circle", padding: 30, radius: 200 };
    case "grid": {
      const rows = Math.max(1, Math.ceil(Math.sqrt(Math.max(1, nodeCount))));
      return { name: "grid", padding: 30, rows };
    }
    case "cose":
      return {
        name: "cose",
        padding: 30,
        nodeRepulsion: 400000,
        idealEdgeLength: 100,
        edgeElasticity: 100,
      };
    case "breadthfirst":
      return {
        name: "breadthfirst",
        padding: 30,
        directed: true,
        spacingFactor: 1.4,
      };
    default:
      return {
        name: "dagre",
        directed: true,
        padding: 30,
        spacingFactor: 1.1,
        rankDir: "TB",
      };
  }
}

export default function GraphView({ parsedData }) {
  // Ref to the DOM element where Cytoscape will mount
  const cyContainerRef = useRef(null);

  // Keep a persistent Cytoscape instance between renders
  const cyRef = useRef(null);

  // Keep track of which layout the user wants to use
  const [layoutName, setLayoutName] = useState("dagre");

  // Derive elements from parsedData
  const elements = React.useMemo(() => buildElements(parsedData), [parsedData]);
  const nodeCount = Array.isArray(parsedData?.nodes)
    ? parsedData.nodes.length
    : 0;

  // Initialize Cytoscape once when container is ready
  useEffect(() => {
    if (!cyContainerRef.current) return;

    if (!cyRef.current) {
      cyRef.current = cytoscape({
        container: cyContainerRef.current,
        elements: [],
        style: getCytoscapeStyle(),
        layout: getLayoutOptions(layoutName, nodeCount),
        wheelSensitivity: 0.2,
      });

      const handleResize = () => {
        try {
          cyRef.current?.resize();
        } catch {
          // no-op
        }
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        try {
          cyRef.current?.destroy();
        } catch {
          // no-op
        }
        cyRef.current = null;
      };
    }
  }, [layoutName, nodeCount]);

  // Update Cytoscape when elements or layout changes
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.elements().remove();
    if (elements.length > 0) {
      cy.add(elements);
    }

    const layout = cy.layout(getLayoutOptions(layoutName, nodeCount));
    layout.run();

    layout.on("layoutstop", () => {
      setTimeout(() => {
        try {
          cy.fit();
        } catch {
          // no-op
        }
      }, 80);
    });
  }, [elements, layoutName, nodeCount]);

  // Viewport control handlers
  const onFit = () => {
    try {
      cyRef.current?.fit();
    } catch {
      // no-op
    }
  };

  const onResetZoom = () => {
    try {
      const cy = cyRef.current;
      if (!cy) return;
      cy.zoom(1);
      cy.center();
    } catch {
      // no-op
    }
  };

  return (
    <Grid
      item
      sx={{
        width: { xs: "100%", md: "70%" },
        order: { xs: 2, md: 1 },
      }}
    >
      <Box
        sx={{
          border: "1px solid #e1e1e1",
          padding: 2,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          height: "90%",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {/* Toolbar with layout controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {/* Layout selector */}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="layout-select-label" color="success">
              Layout
            </InputLabel>
            <Select
              labelId="layout-select-label"
              id="layout-select"
              value={layoutName}
              label="Layout"
              color="success"
              onChange={(e) => setLayoutName(e.target.value)}
            >
              <MenuItem value="dagre">Hierarchical (Dagre)</MenuItem>
              <MenuItem value="circle">Circle</MenuItem>
              <MenuItem value="grid">Grid</MenuItem>
              <MenuItem value="cose">Force-directed (CoSE)</MenuItem>
              <MenuItem value="breadthfirst">Breadth-first</MenuItem>
            </Select>
          </FormControl>

          {/* View control buttons */}
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={onFit}
          >
            Fit
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={onResetZoom}
          >
            Reset
          </Button>
        </Box>

        {/* Cytoscape container - fills remaining height */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            border: "1px solid #e1e1e1",
            borderRadius: 1,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <div ref={cyContainerRef} style={{ width: "100%", height: "100%" }} />
        </Box>
      </Box>
    </Grid>
  );
}
