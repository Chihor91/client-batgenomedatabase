// web-app/src/components/GraphVisualization.jsx
// -------------------------------------------------------------------------------------------------
// This React component provides a complete, beginner-friendly workflow to:
// 1) Import an ontology file (OWL/RDF/Turtle/N3) via a button or drag-and-drop,
// 2) Parse it into nodes and edges using the app's existing parsing logic (N3.js under the hood),
// 3) Render the result as a graph using Cytoscape.js with a simple layout selector.
//
// The code is intentionally simple and very verbose in comments to explain each step clearly.
// -------------------------------------------------------------------------------------------------

import React, { useEffect, useMemo, useRef, useState } from 'react';

// Cytoscape core library for graph rendering
import cytoscape from 'cytoscape';
// Layout plugin to arrange nodes in a directed acyclic style (hierarchical)
import dagre from 'cytoscape-dagre';

// Register the dagre layout plugin with Cytoscape once at module load time.
// Without this, using layout: { name: 'dagre' } would fail.
cytoscape.use(dagre);

// The app already exposes a hook that handles file validation, reading, and parsing.
// Internally, it uses N3.js to turn RDF triples/quads into a simple JSON structure:
//   { nodes: [{ id, label, type, uri }], edges: [{ id, source, target, label, type }], ... }
// We rely on that output to feed Cytoscape.
import useFileProcessor from '../hooks/useFileProcessor.js';

// Small, inline styles to keep the component self-contained and easy to drop into any page.
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    height: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  leftHeader: { display: 'flex', alignItems: 'center', gap: 12 },
  controls: { display: 'flex', alignItems: 'center', gap: 8 },
  button: {
    padding: '6px 12px',
    border: '1px solid #0E639C',
    background: '#0E639C',
    color: 'white',
    borderRadius: 4,
    cursor: 'pointer',
  },
  select: {
    padding: '6px 8px',
    borderRadius: 4,
    border: '1px solid #ccc',
    background: 'white',
  },
  dropZone: (active) => ({
    border: `2px dashed ${active ? '#0E639C' : '#ccc'}`,
    borderRadius: 8,
    padding: 16,
    background: active ? '#F0FAFF' : '#fafafa',
    color: '#333',
    textAlign: 'center',
  }),
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    fontSize: 13,
    color: '#555',
  },
  cyWrapper: {
    height: 'calc(100vh - 200px)',
    minHeight: 360,
    width: '100%',
    maxWidth: '100%',
    border: '1px solid #e1e1e1',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#fff',
    boxSizing: 'border-box',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 13,
    color: '#555',
  },
  error: {
    color: '#b00020',
    background: '#ffeef0',
    border: '1px solid #ffd0d4',
    padding: '8px 12px',
    borderRadius: 6,
    fontSize: 13,
  },
  progress: {
    height: 6,
    background: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: (p) => ({
    width: `${p}%`,
    height: '100%',
    background: '#0E639C',
    transition: 'width 150ms ease',
  }),
  statPill: {
    background: '#f3f3f3',
    border: '1px solid #e1e1e1',
    borderRadius: 14,
    padding: '4px 10px',
  },
};

// Helper: map parsed ontology data (nodes/edges) into Cytoscape element format.
// Cytoscape expects an array combining node and edge entries, each with a `data` object.
function buildElements(ontologyData) {
  // If no data yet (before parsing completes), return an empty array safely.
  if (!ontologyData || !Array.isArray(ontologyData.nodes) || !Array.isArray(ontologyData.edges)) {
    return [];
  }

  // Convert node objects into Cytoscape node elements.
  const nodeElements = ontologyData.nodes.map((n) => ({
    data: {
      id: n.id,                   // unique id per node
      label: n.label || n.id,     // visible text on the node
      type: n.type || 'default',  // used for styling rules
      uri: n.uri || '',           // optional metadata
    },
  }));

  // Convert edge objects into Cytoscape edge elements.
  const edgeElements = ontologyData.edges.map((e) => ({
    data: {
      id: e.id,                    // unique id per edge
      source: e.source,            // source node id
      target: e.target,            // target node id
      label: e.label || '',        // optional edge label
      type: e.type || 'relation',  // used for styling rules (if desired)
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
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(label)',
        'color': '#111',
        'font-size': 12,
        'text-wrap': 'wrap',
        'text-max-width': 120,
        'text-valign': 'center',
        'text-halign': 'center',
        'text-background-color': '#ffffff',
        'text-background-opacity': 0.9,
        'text-background-padding': 2,
        'border-width': 1,
        'border-color': '#999',
        'width': 28,
        'height': 28,
      },
    },
    // Classes: green nodes
    { selector: 'node[type = "class"]', style: { 'background-color': '#22CC22' } },
    // Properties: blue, with a different shape to hint semantics
    { selector: 'node[type = "property"]', style: { 'background-color': '#3399FF', 'shape': 'round-rectangle' } },
    // Individuals: orange
    { selector: 'node[type = "individual"]', style: { 'background-color': '#FF9933' } },

    // Base edge style: thin, curved, with a triangle arrow and optional label.
    {
      selector: 'edge',
      style: {
        'width': 1.5,
        'curve-style': 'bezier',
        'line-color': '#aaa',
        'target-arrow-color': '#aaa',
        'target-arrow-shape': 'triangle',
        'label': 'data(label)',
        'color': '#333',
        'font-size': 10,
        'text-rotation': 'autorotate',
        'text-background-color': '#ffffff',
        'text-background-opacity': 0.8,
        'text-background-padding': 2,
      },
    },
  ];
}

// Helper: produce layout options for different layout names.
// Dagre provides a clear "top-to-bottom" hierarchical organization that often suits ontologies.
function getLayoutOptions(name, nodeCount) {
  switch (name) {
    case 'dagre':
      return { name: 'dagre', directed: true, padding: 30, spacingFactor: 1.1, rankDir: 'TB' };
    case 'circle':
      return { name: 'circle', padding: 30, radius: 200 };
    case 'grid': {
      const rows = Math.max(1, Math.ceil(Math.sqrt(Math.max(1, nodeCount))));
      return { name: 'grid', padding: 30, rows };
    }
    case 'cose':
      return { name: 'cose', padding: 30, nodeRepulsion: 400000, idealEdgeLength: 100, edgeElasticity: 100 };
    case 'breadthfirst':
      return { name: 'breadthfirst', padding: 30, directed: true, spacingFactor: 1.4 };
    default:
      return { name: 'dagre', directed: true, padding: 30, spacingFactor: 1.1, rankDir: 'TB' };
  }
}

// Main functional component using JSX (not TSX).
export default function GraphVisualization() {
  // Ref to the DOM element where Cytoscape will mount the canvas-based graph.
  const cyContainerRef = useRef(null);

  // Keep a persistent Cytoscape instance between renders.
  const cyRef = useRef(null);

  // Keep track of which layout the user wants to use.
  const [layoutName, setLayoutName] = useState('dagre');

  // Bring in the file processing hook that owns:
  // - ontologyData: parsed nodes/edges + metadata + isLoading/error flags
  // - handleFile(file): reads and parses a File object
  // - validateFile(file): basic validations before parsing
  // - clearData(): reset state
  // - progress: a 0-100 indicator while reading/parsing
  const { ontologyData, handleFile, validateFile, clearData, progress } = useFileProcessor();

  // Convenience: compute Cytoscape elements whenever parsed data changes.
  const elements = useMemo(() => buildElements(ontologyData), [ontologyData]);

  // Convenience: counts for a tiny stats readout; fall back safely if data not ready.
  const nodeCount = Array.isArray(ontologyData?.nodes) ? ontologyData.nodes.length : 0;
  const edgeCount = Array.isArray(ontologyData?.edges) ? ontologyData.edges.length : 0;

  // Initialize Cytoscape once, and then update it when elements or layout change.
  useEffect(() => {
    // If the container is not ready, exit early.
    if (!cyContainerRef.current) return;

    // Create the Cytoscape instance once on first mount.
    if (!cyRef.current) {
      cyRef.current = cytoscape({
        // Tell Cytoscape which DOM node it should draw into.
        container: cyContainerRef.current,

        // Start with no elements; we will set them below when elements are ready.
        elements: [],

        // Provide our style rules that map data fields (label, type) to visuals.
        style: getCytoscapeStyle(),

        // Default layout to something pleasant; can be changed via the select control.
        layout: getLayoutOptions(layoutName, nodeCount),
        // Optional configuration: improve interactivity/feel for beginners.
        wheelSensitivity: 0.2,
      });

      // Keep the graph responsive when the window resizes.
      const handleResize = () => {
        try {
          cyRef.current?.resize();
        } catch {
          // no-op
        }
      };
      window.addEventListener('resize', handleResize);

      // Cleanup: destroy the Cytoscape instance and listeners on component unmount.
      return () => {
        window.removeEventListener('resize', handleResize);
        try {
          cyRef.current?.destroy();
        } catch {
          // no-op
        }
        cyRef.current = null;
      };
    }
  }, [layoutName, nodeCount]);

  // Whenever the parsed elements or the chosen layout change, update the graph contents.
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    // Remove any existing elements and add the new ones.
    cy.elements().remove();
    if (elements.length > 0) {
      cy.add(elements);
    }

    // Run the selected layout to arrange nodes in a readable way.
    const layout = cy.layout(getLayoutOptions(layoutName, nodeCount));
    layout.run();

    // Fit the graph into view after layout for a beginner-friendly experience.
    layout.on('layoutstop', () => {
      setTimeout(() => {
        try {
          cy.fit();
        } catch {
          // no-op
        }
      }, 80);
    });
  }, [elements, layoutName, nodeCount]);

  // Handle selection from the file input (click-to-upload).
  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate before parsing to give early feedback.
    const check = validateFile(file);
    if (!check.valid) {
      // The hook also sets user-friendly messages; we just clear previous data for clarity.
      clearData();
      return;
    }
    // Clear previous graph and parse the new file.
    clearData();
    await handleFile(file);
  };

  // Simple helpers to control the viewport.
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

  // Derive lightweight stats by node "type" for a friendly summary.
  const typeCounts = useMemo(() => {
    const acc = { class: 0, property: 0, individual: 0 };
    if (Array.isArray(ontologyData?.nodes)) {
      for (const n of ontologyData.nodes) {
        if (acc[n.type] !== undefined) acc[n.type] += 1;
      }
    }
    return acc;
  }, [ontologyData]);

  return (
    <div style={styles.container}>
      {/* Header row: title on the left, basic controls on the right */}
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <h3 style={{ margin: 0 }}>OWL Ontology Graph</h3>
          <div style={styles.metaRow}>
            <span style={styles.statPill}>Nodes: {nodeCount}</span>
            <span style={styles.statPill}>Edges: {edgeCount}</span>
            <span style={styles.statPill}>Classes: {typeCounts.class}</span>
            <span style={styles.statPill}>Properties: {typeCounts.property}</span>
            <span style={styles.statPill}>Individuals: {typeCounts.individual}</span>
          </div>
        </div>

        {/* Layout and view controls to help beginners manipulate the diagram */}
        <div style={styles.controls}>
          <select
            style={styles.select}
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
            aria-label="Select graph layout"
          >
            <option value="dagre">Hierarchical (Dagre)</option>
            <option value="circle">Circle</option>
            <option value="grid">Grid</option>
            <option value="cose">Force-directed (CoSE)</option>
            <option value="breadthfirst">Breadth-first</option>
          </select>

          <button style={styles.button} onClick={onFit}>Fit</button>
          <button style={styles.button} onClick={onResetZoom}>Reset</button>
        </div>
      </div>

      {/* File input row: offers both click-to-upload and a drag-and-drop area */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', maxWidth: '100%' }}>
        <label style={{ ...styles.button, display: 'inline-block', cursor: 'pointer' }}>
          Select File
          <input
            type="file"
            accept=".ttl,.n3,.nt,.owl,.rdf"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Progress and error feedback sourced from the hook.
          - progress: % indicator during FileReader and parsing
          - ontologyData.isLoading: convenient boolean to show an indicator
          - ontologyData.error: user-friendly message if parsing/validation fails */}
      <div style={{ ...styles.statusRow, maxWidth: '100%' }}>
        {ontologyData?.isLoading ? (
          <>
            <span>Parsing...</span>
            <div style={{ ...styles.progress, width: 180 }}>
              <div style={styles.progressBar(progress || 0)} />
            </div>
            <span>{Math.round(progress || 0)}%</span>
          </>
        ) : (
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {ontologyData?.metadata?.fileName ? `Loaded: ${ontologyData.metadata.fileName}` : 'No file loaded'}
          </span>
        )}
      </div>

      {ontologyData?.error ? (
        <div style={{ ...styles.error, maxWidth: '100%', wordBreak: 'break-word' }} role="alert">
          {ontologyData.error}
        </div>
      ) : null}

      {/* The Cytoscape canvas will fill this box.
          React holds a ref to this div and gives it to Cytoscape during initialization. */}
      <div style={styles.cyWrapper} ref={cyContainerRef} />

      {/* EXPLANATION (for learners):
         - N3 parsing step (conceptual):
           The hook reads the uploaded file text and feeds it to the project's OWL/RDF parser,
           which internally uses N3.js. N3.js interprets triples/quads and helps construct a
           simplified graph model (nodes and edges). That model is what we pass to Cytoscape.

         - Cytoscape usage:
           We initialize Cytoscape with:
             container: a DOM node ref where the graph is drawn,
             style: visual rules (node colors, edge arrows, labels),
             layout: an algorithm to position the nodes.
           We then convert the parsed model into Cytoscape elements (data-driven).
           Finally, we run a layout and fit the view so the whole graph is visible. */}
    </div>
  );
}