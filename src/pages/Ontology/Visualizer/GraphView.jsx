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

// Convert parsed ontology data into Cytoscape elements
function buildElements(ontologyData) {
  if (
    !ontologyData ||
    !Array.isArray(ontologyData.nodes) ||
    !Array.isArray(ontologyData.edges)
  ) {
    return [];
  }

  const nodeElements = ontologyData.nodes.map((n) => ({
    data: {
      id: n.id,
      label: n.label || n.id,
      type: n.type || "default",
      uri: n.uri || "",
    },
  }));

  const edgeElements = ontologyData.edges.map((e) => ({
    data: {
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label || "",
      type: e.type || "relation",
    },
  }));

  // Combine node and edge elements into a single array
  return [...nodeElements, ...edgeElements];
}

// Set styles for different node types and edges
function getCytoscapeStyle() {
  return [
    // Base node style
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
    // Properties: blue nodes, rounded rectangle shape
    {
      selector: 'node[type = "property"]',
      style: { "background-color": "#3399FF", shape: "round-rectangle" },
    },
    // Individuals: orange nodes
    {
      selector: 'node[type = "individual"]',
      style: { "background-color": "#FF9933" },
    },
    // Selected node
    {
      selector: "node:selected",
      style: {
        "border-width": 3,
        "border-color": "#FF5722",
        "background-color": "#FFE0B2",
      },
    },
    // Base edge style
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

// Set layout options and configurations
function getLayoutOptions(name, nodeCount) {
  switch (name) {
    // Dagre layout: hierarchical layout
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

    // Cose layout: force-directed layout
    case "cose":
      return {
        name: "cose",
        padding: 30,
        nodeRepulsion: 400000,
        idealEdgeLength: 100,
        edgeElasticity: 100,
      };

    // Breadthfirst layout: hierarchical layout expanding from roots
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

export default function GraphView({
  parsedData,
  onNodeSelect,
  onNodeDeselect,
}) {
  // Set current layout
  const [layoutName, setLayoutName] = useState("dagre");

  // Derive Cytoscape elements from parsed ontology data
  const elements = React.useMemo(() => buildElements(parsedData), [parsedData]);
  const nodeCount = Array.isArray(parsedData?.nodes)
    ? parsedData.nodes.length
    : 0;

  const cyContainerRef = useRef(null);
  const cyRef = useRef(null);
  useEffect(() => {
    if (!cyContainerRef.current) return;

    // Initialize cytoscape instance
    if (!cyRef.current) {
      cyRef.current = cytoscape({
        container: cyContainerRef.current,
        elements: [],
        style: getCytoscapeStyle(),
        layout: getLayoutOptions(layoutName, nodeCount),
        wheelSensitivity: 10.0,
      });

      const handleResize = () => {
        try {
          cyRef.current?.resize();
        } catch {
          console.log("Error occurred in graph resizing.");
        }
      };
      window.addEventListener("resize", handleResize);

      // Cleanup on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
        try {
          cyRef.current?.destroy();
        } catch {
          console.log("Error occurred in graph cleanup");
        }
        cyRef.current = null;
      };
    }
  }, [layoutName, nodeCount]);

  // Update Cytoscape when elements or layout changes
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    // Clear existing elements then add new ones
    cy.elements().remove();
    if (elements.length > 0) {
      cy.add(elements);
    }

    const layout = cy.layout(getLayoutOptions(layoutName, nodeCount));
    layout.run();

    // Fit graph to viewport after layout completes
    layout.on("layoutstop", () => {
      setTimeout(() => {
        try {
          cy.fit();
        } catch {
          console.log("Error occurred in graph fitting.");
        }
      }, 80);
    });
  }, [elements, layoutName, nodeCount]);

  // Show node details on selection
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    // Handle node selection
    cy.on("tap", "node", (event) => {
      const node = event.target;
      const nodeData = node.data();
      onNodeSelect?.(nodeData);
    });

    // Handle deselection
    cy.on("tap", (event) => {
      if (event.target === cy) {
        onNodeDeselect?.();
      }
    });
  }, [onNodeSelect, onNodeDeselect]);

  // Fit all nodes into view
  const onFit = () => {
    try {
      cyRef.current?.fit();
    } catch {
      console.log("Error occurred in fitting all nodes into view.");
    }
  };

  const onResetZoom = () => {
    try {
      const cy = cyRef.current;
      if (!cy) return;
      cy.zoom(1);
      cy.center();
    } catch {
      console.log("Error occurred in zoom reset.");
    }
  };

  return (
    <Grid
      item
      sx={{
        width: { xs: "100%", md: "70%" },
        maxWidth: { xs: "100%", md: "70%" },
        minWidth: 0,
        order: { xs: 1, md: 1 },
      }}
    >
      <Box
        sx={{
          border: "1px solid #e1e1e1",
          padding: 2,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          height: { xs: "auto", md: "90%" },
          minHeight: { xs: 400, md: "auto" },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          overflow: "hidden",
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

        {/* Cytoscape container */}
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
