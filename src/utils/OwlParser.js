import { Parser, Store } from "n3";

/**
 * JavaScript port of the TypeScript OWL Parser
 * Parses OWL/TTL ontology files and extracts semantic nodes and relationships
 *
 * @fileoverview This module provides functionality to parse OWL ontologies in Turtle format
 * and extract structured data for visualization purposes.
 */

/**
 * OWL Parser Class - Main entry point for parsing OWL/TTL content
 *
 * Purpose: Converts OWL ontology files into structured data for visualization
 * Dependencies: n3 library for RDF parsing
 *
 * @class OWLParser
 */
export class OWLParser {
  /**
   * Constructor - Initialize parser with RDF store and common prefixes
   *
   * Purpose: Set up the parser with necessary data structures
   * Output: Configured parser instance ready for parsing
   */
  constructor() {
    console.log("OWLParser: Initializing new parser instance");

    // Initialize RDF store for holding parsed triples
    this.store = new Store();

    // Map to store namespace prefixes for URI resolution
    this.prefixes = new Map();

    // Common OWL/RDF prefixes - these are standard namespace URIs
    // used in most OWL ontologies for basic vocabulary
    this.prefixes.set("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    this.prefixes.set("rdfs", "http://www.w3.org/2000/01/rdf-schema#");
    this.prefixes.set("owl", "http://www.w3.org/2002/07/owl#");
    this.prefixes.set("xsd", "http://www.w3.org/2001/XMLSchema#");

    console.log(
      "OWLParser: Initialized with prefixes:",
      Array.from(this.prefixes.keys())
    );
  }

  /**
   * Main parsing method - Parse OWL/TTL content and extract ontology data
   *
   * Purpose: Convert raw OWL content into structured nodes and edges
   * Input: owlContent (string) - Raw OWL/TTL content to parse
   * Output: Promise<OntologyData> - Structured ontology data with nodes, edges, and metadata
   * Logic:
   *   1. Validate input format (reject RDF/XML)
   *   2. Parse content using N3 parser
   *   3. Store parsed quads in RDF store
   *   4. Extract structured data using extractOntologyData()
   * Dependencies: N3 Parser, extractOntologyData method
   *
   * @param {string} owlContent - The OWL/TTL content to parse
   * @returns {Promise<Object>} Parsed ontology data with nodes, edges, and metadata
   */
  async parse(owlContent) {
    try {
      console.log("=== OWL PARSER: STARTING PARSE OPERATION ===");
      console.log(
        "OWL Parser: Raw input TTL content length:",
        owlContent.length
      );
      console.log("OWL Parser: First 200 characters of input:");
      console.log(owlContent.substring(0, 200));
      console.log("OWL Parser: Last 200 characters of input:");
      console.log(owlContent.substring(Math.max(0, owlContent.length - 200)));

      // Runtime validation: Check for unsupported RDF/XML format
      // Purpose: Provide helpful error message for unsupported formats
      if (
        owlContent.trim().startsWith("<?xml") ||
        owlContent.includes("<rdf:RDF")
      ) {
        const errorMsg =
          "RDF/XML format detected. Please convert your OWL file to Turtle format (.ttl) for better compatibility. You can use online converters or tools like Protégé to export as Turtle.";
        console.error("OWL Parser: Format validation failed -", errorMsg);
        throw new Error(errorMsg);
      }

      // Parse using N3 library (supports Turtle, N-Triples, N-Quads)
      // Purpose: Convert text-based RDF into structured quads (subject-predicate-object-graph)
      const parser = new Parser();
      console.log(
        "OWL Parser: Created N3 parser instance, attempting to parse content..."
      );

      const quads = parser.parse(owlContent);
      console.log(
        "OWL Parser: Successfully parsed",
        quads.length,
        "RDF quads from input"
      );

      // Log sample of parsed quads for debugging
      if (quads.length > 0) {
        console.log("OWL Parser: Sample parsed quads:");
        quads.slice(0, Math.min(3, quads.length)).forEach((quad, i) => {
          console.log(
            `  Sample ${i + 1}: ${quad.subject.value} -> ${
              quad.predicate.value
            } -> ${quad.object.value}`
          );
        });
      }

      // Clear existing store and add new quads
      // Purpose: Ensure clean state for each parse operation
      this.store = new Store();
      this.store.addQuads(quads);
      console.log(
        "OWL Parser: Added quads to RDF store, total quads in store:",
        this.store.size
      );

      // Extract structured ontology data from the RDF store
      // Purpose: Convert raw RDF triples into meaningful nodes and relationships
      console.log("OWL Parser: Starting ontology data extraction...");
      const result = this.extractOntologyData();

      console.log("=== OWL PARSER: EXTRACTION COMPLETE ===");
      console.log("OWL Parser: Final results summary:");
      console.log("  - Total nodes found:", result.nodes.length);
      console.log("  - Total edges found:", result.edges.length);
      console.log("  - Ontology metadata:", result.metadata);

      return result;
    } catch (error) {
      console.error("=== OWL PARSER: ERROR OCCURRED ===");
      console.error("OWL Parser: Parsing failed with error:", error);
      console.error("OWL Parser: Error details:", {
        message: error.message,
        stack: error.stack,
      });
      throw new Error(
        `Failed to parse OWL file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Extract ontology data from RDF store - Core logic for semantic extraction
   *
   * Purpose: Convert RDF triples into structured nodes (entities) and edges (relationships)
   * Input: Uses internal RDF store populated by parse() method
   * Output: OntologyData object with nodes array, edges array, and metadata
   * Logic:
   *   1. Initialize data structures (nodes Map, edges array, metadata object)
   *   2. Extract ontology metadata (title, description, URI)
   *   3. Extract classes (owl:Class, rdfs:Class, inferred from subClassOf)
   *   4. Extract properties (ObjectProperty, DatatypeProperty, etc.)
   *   5. Extract individuals (NamedIndividual)
   *   6. Extract relationships (subClassOf, subPropertyOf, domain, range)
   *   7. Ensure all referenced entities have corresponding nodes
   * Dependencies: RDF store, helper methods (getLocalName, getLabel, ensureNode)
   *
   * @returns {Object} Structured ontology data
   */
  extractOntologyData() {
    console.log("=== ONTOLOGY DATA EXTRACTION STARTING ===");
    console.log(
      "OWL Parser: Beginning extraction from RDF store with",
      this.store.size,
      "total quads"
    );

    // Initialize data structures for extracted information
    // Purpose: Store unique nodes and collect all relationships
    const nodes = new Map(); // Map ensures node uniqueness by ID
    const edges = []; // Array to store all relationships
    const metadata = {}; // Object to store ontology-level information

    // Debug logging: Show sample of what we're working with
    // Purpose: Help diagnose parsing issues by showing raw RDF data
    const allQuads = this.store.getQuads(null, null, null, null);
    console.log("OWL Parser: Sample RDF quads from store:");
    allQuads.slice(0, Math.min(5, allQuads.length)).forEach((quad, i) => {
      console.log(
        `  Quad ${i + 1}: ${quad.subject.value} --[${
          quad.predicate.value
        }]--> ${quad.object.value}`
      );
    });

    // === METADATA EXTRACTION BLOCK ===
    // Purpose: Extract ontology-level information like title, description, URI
    // Input: RDF quads with owl:Ontology type declarations
    // Output: Populated metadata object
    // Logic: Find ontology declarations, then look for associated metadata properties
    console.log("--- EXTRACTING ONTOLOGY METADATA ---");
    const ontologyQuads = this.store.getQuads(
      null,
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
      "http://www.w3.org/2002/07/owl#Ontology",
      null
    );
    console.log(
      "OWL Parser: Found",
      ontologyQuads.length,
      "ontology declarations"
    );

    if (ontologyQuads.length > 0) {
      const ontologyURI = ontologyQuads[0].subject.value;
      metadata.ontologyURI = ontologyURI;
      console.log("OWL Parser: Ontology URI identified:", ontologyURI);

      // Extract title using Dublin Core elements
      const titleQuads = this.store.getQuads(
        ontologyQuads[0].subject,
        "http://purl.org/dc/elements/1.1/title",
        null,
        null
      );
      if (titleQuads.length > 0) {
        metadata.title = titleQuads[0].object.value;
        console.log("OWL Parser: Ontology title found:", metadata.title);
      }

      // Extract description using Dublin Core elements
      const descQuads = this.store.getQuads(
        ontologyQuads[0].subject,
        "http://purl.org/dc/elements/1.1/description",
        null,
        null
      );
      if (descQuads.length > 0) {
        metadata.description = descQuads[0].object.value;
        console.log(
          "OWL Parser: Ontology description found:",
          metadata.description
        );
      }

      // Extract ontology name using rdfs:label
      const labelQuads = this.store.getQuads(
        ontologyQuads[0].subject,
        "http://www.w3.org/2000/01/rdf-schema#label",
        null,
        null
      );
      if (labelQuads.length > 0) {
        metadata.name = labelQuads[0].object.value;
        console.log(
          "OWL Parser: Ontology name (rdfs:label) found:",
          metadata.name
        );
      }

      // Extract ontology description using rdfs:comment
      const commentQuads = this.store.getQuads(
        ontologyQuads[0].subject,
        "http://www.w3.org/2000/01/rdf-schema#comment",
        null,
        null
      );
      if (commentQuads.length > 0) {
        metadata.comment = commentQuads[0].object.value;
        console.log(
          "OWL Parser: Ontology comment (rdfs:comment) found:",
          metadata.comment
        );
      }
    }

    // === CLASS EXTRACTION BLOCK ===
    // Purpose: Identify all classes in the ontology (concepts/categories)
    // Input: RDF quads with class type declarations and subclass relationships
    // Output: Class nodes added to nodes Map
    // Logic:
    //   1. Find explicit owl:Class and rdfs:Class declarations
    //   2. Infer classes from subClassOf relationships (both subject and object)
    //   3. Create node entries with labels and URIs
    console.log("--- EXTRACTING CLASSES ---");

    // Find explicit OWL class declarations
    let classQuads = this.store.getQuads(
      null,
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
      "http://www.w3.org/2002/07/owl#Class",
      null
    );
    console.log(
      "OWL Parser: Found",
      classQuads.length,
      "explicit owl:Class declarations"
    );

    // Also find RDFS class declarations (broader RDF vocabulary)
    const rdfsClassQuads = this.store.getQuads(
      null,
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
      "http://www.w3.org/2000/01/rdf-schema#Class",
      null
    );
    console.log(
      "OWL Parser: Found",
      rdfsClassQuads.length,
      "explicit rdfs:Class declarations"
    );

    // Combine both types of explicit class declarations
    classQuads = [...classQuads, ...rdfsClassQuads];

    // Infer classes from subClassOf relationships
    // Purpose: Many ontologies don't explicitly declare classes but use them in relationships
    const subClassQuads = this.store.getQuads(
      null,
      "http://www.w3.org/2000/01/rdf-schema#subClassOf",
      null,
      null
    );
    console.log(
      "OWL Parser: Found",
      subClassQuads.length,
      "subClassOf relationships for class inference"
    );

    // Process subClassOf relationships to infer classes
    // Logic: If X subClassOf Y, then both X and Y are classes
    subClassQuads.forEach((quad) => {
      // Process subject (subclass) as a class
      if (quad.subject.termType === "NamedNode") {
        const uri = quad.subject.value;
        const id = this.getLocalName(uri);
        if (!nodes.has(id)) {
          const label = this.getLabel(quad.subject) || id;
          nodes.set(id, {
            id,
            label,
            type: "class",
            uri,
          });
          console.log(
            "OWL Parser: Inferred class from subClassOf subject:",
            id,
            "(",
            label,
            ")"
          );
        }
      }

      // Process object (superclass) as a class
      if (quad.object.termType === "NamedNode") {
        const uri = quad.object.value;
        const id = this.getLocalName(uri);
        if (!nodes.has(id)) {
          const label = this.getLabel(quad.object) || id;
          nodes.set(id, {
            id,
            label,
            type: "class",
            uri,
          });
          console.log(
            "OWL Parser: Inferred class from subClassOf object:",
            id,
            "(",
            label,
            ")"
          );
        }
      }
    });

    // Process explicit class declarations
    // Purpose: Add explicitly declared classes to ensure completeness
    classQuads.forEach((quad) => {
      // Skip blank nodes as they're typically not meaningful for visualization
      if (quad.subject.termType !== "NamedNode") {
        return;
      }

      const uri = quad.subject.value;
      const id = this.getLocalName(uri);
      if (!nodes.has(id)) {
        const label = this.getLabel(quad.subject) || id;
        nodes.set(id, {
          id,
          label,
          type: "class",
          uri,
        });
        console.log("OWL Parser: Added explicit class:", id, "(", label, ")");
      }
    });

    const classCount = Array.from(nodes.values()).filter(
      (n) => n.type === "class"
    ).length;
    console.log(
      "OWL Parser: Class extraction complete. Total classes found:",
      classCount
    );

    // === PROPERTY EXTRACTION BLOCK ===
    // Purpose: Identify all properties in the ontology (relationships/attributes)
    // Input: RDF quads with property type declarations and domain/range relationships
    // Output: Property nodes added to nodes Map
    // Logic:
    //   1. Find explicit property declarations of various types
    //   2. Infer properties from domain/range declarations
    //   3. Create node entries with appropriate labels
    console.log("--- EXTRACTING PROPERTIES ---");

    // Define different types of properties to look for
    // Purpose: OWL has different property categories with different semantics
    const propertyTypes = [
      "http://www.w3.org/2002/07/owl#ObjectProperty", // Links between individuals
      "http://www.w3.org/2002/07/owl#DatatypeProperty", // Links to literal values
      "http://www.w3.org/2002/07/owl#AnnotationProperty", // Metadata properties
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property", // Generic RDF property
    ];

    // Process each property type
    propertyTypes.forEach((propertyType) => {
      const propQuads = this.store.getQuads(
        null,
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        propertyType,
        null
      );
      console.log(
        "OWL Parser: Found",
        propQuads.length,
        "properties of type",
        this.getLocalName(propertyType)
      );

      propQuads.forEach((quad) => {
        // Skip blank nodes for properties
        if (quad.subject.termType !== "NamedNode") {
          return;
        }

        const uri = quad.subject.value;
        const id = this.getLocalName(uri);
        if (!nodes.has(id)) {
          const label = this.getLabel(quad.subject) || id;
          nodes.set(id, {
            id,
            label,
            type: "property",
            uri,
          });
          console.log(
            "OWL Parser: Added explicit property:",
            id,
            "(",
            label,
            ")"
          );
        }
      });
    });

    // Infer properties from domain and range declarations
    // Purpose: Properties are often not explicitly typed but have domain/range constraints
    const domainQuads = this.store.getQuads(
      null,
      "http://www.w3.org/2000/01/rdf-schema#domain",
      null,
      null
    );
    const rangeQuads = this.store.getQuads(
      null,
      "http://www.w3.org/2000/01/rdf-schema#range",
      null,
      null
    );
    console.log(
      "OWL Parser: Found",
      domainQuads.length,
      "domain declarations and",
      rangeQuads.length,
      "range declarations for property inference"
    );

    // Process domain and range declarations to infer properties
    [...domainQuads, ...rangeQuads].forEach((quad) => {
      if (quad.subject.termType === "NamedNode") {
        const uri = quad.subject.value;
        const id = this.getLocalName(uri);
        if (!nodes.has(id)) {
          const label = this.getLabel(quad.subject) || id;
          nodes.set(id, {
            id,
            label,
            type: "property",
            uri,
          });
          console.log(
            "OWL Parser: Inferred property from domain/range:",
            id,
            "(",
            label,
            ")"
          );
        }
      }
    });

    const propertyCount = Array.from(nodes.values()).filter(
      (n) => n.type === "property"
    ).length;
    console.log(
      "OWL Parser: Property extraction complete. Total properties found:",
      propertyCount
    );

    // === INDIVIDUAL EXTRACTION BLOCK ===
    // Purpose: Identify named individuals (instances) in the ontology
    // Input: RDF quads with NamedIndividual type declarations
    // Output: Individual nodes added to nodes Map
    // Logic: Find explicit individual declarations and create node entries
    console.log("--- EXTRACTING INDIVIDUALS ---");

    const individualQuads = this.store.getQuads(
      null,
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
      "http://www.w3.org/2002/07/owl#NamedIndividual",
      null
    );
    console.log(
      "OWL Parser: Found",
      individualQuads.length,
      "named individual declarations"
    );

    individualQuads.forEach((quad) => {
      // Skip blank nodes for individuals
      if (quad.subject.termType !== "NamedNode") {
        return;
      }

      const uri = quad.subject.value;
      const id = this.getLocalName(uri);
      if (!nodes.has(id)) {
        const label = this.getLabel(quad.subject) || id;
        nodes.set(id, {
          id,
          label,
          type: "individual",
          uri,
        });
        console.log("OWL Parser: Added individual:", id, "(", label, ")");
      }
    });

    const individualCount = Array.from(nodes.values()).filter(
      (n) => n.type === "individual"
    ).length;
    console.log(
      "OWL Parser: Individual extraction complete. Total individuals found:",
      individualCount
    );

    // === RELATIONSHIP EXTRACTION BLOCK ===
    // Purpose: Extract semantic relationships between entities
    // Input: RDF quads representing various relationship types
    // Output: Edge objects added to edges array
    // Logic: Process different relationship types and create directed edges
    console.log("--- EXTRACTING RELATIONSHIPS ---");

    let edgeCounter = 0; // Counter for generating unique edge IDs

    // SubClass relationships (class hierarchy)
    // Purpose: Represent "is-a" relationships between classes
    console.log("Processing subClassOf relationships...");
    subClassQuads.forEach((quad) => {
      if (
        quad.subject.termType !== "NamedNode" ||
        quad.object.termType !== "NamedNode"
      ) {
        return;
      }

      const sourceId = this.getLocalName(quad.subject.value);
      const targetId = this.getLocalName(quad.object.value);

      // Ensure both nodes exist (they should from class extraction)
      this.ensureNode(nodes, sourceId, quad.subject.value, "class");
      this.ensureNode(nodes, targetId, quad.object.value, "class");

      const edge = {
        id: `edge_${edgeCounter++}`,
        source: sourceId,
        target: targetId,
        label: "subClassOf",
        type: "subClassOf",
      };
      edges.push(edge);
      console.log(
        "OWL Parser: Added subClassOf edge:",
        sourceId,
        "->",
        targetId
      );
    });

    // SubProperty relationships (property hierarchy)
    // Purpose: Represent specialization relationships between properties
    console.log("Processing subPropertyOf relationships...");
    const subPropertyQuads = this.store.getQuads(
      null,
      "http://www.w3.org/2000/01/rdf-schema#subPropertyOf",
      null,
      null
    );
    subPropertyQuads.forEach((quad) => {
      if (
        quad.subject.termType !== "NamedNode" ||
        quad.object.termType !== "NamedNode"
      ) {
        return;
      }

      const sourceId = this.getLocalName(quad.subject.value);
      const targetId = this.getLocalName(quad.object.value);

      this.ensureNode(nodes, sourceId, quad.subject.value, "property");
      this.ensureNode(nodes, targetId, quad.object.value, "property");

      const edge = {
        id: `edge_${edgeCounter++}`,
        source: sourceId,
        target: targetId,
        label: "subPropertyOf",
        type: "subPropertyOf",
      };
      edges.push(edge);
      console.log(
        "OWL Parser: Added subPropertyOf edge:",
        sourceId,
        "->",
        targetId
      );
    });

    // Domain relationships (property constraints)
    // Purpose: Show which classes can be subjects of a property
    console.log("Processing domain relationships...");
    domainQuads.forEach((quad) => {
      if (
        quad.subject.termType !== "NamedNode" ||
        quad.object.termType !== "NamedNode"
      ) {
        return;
      }

      const sourceId = this.getLocalName(quad.subject.value);
      const targetId = this.getLocalName(quad.object.value);

      this.ensureNode(nodes, sourceId, quad.subject.value, "property");
      this.ensureNode(nodes, targetId, quad.object.value, "class");

      const edge = {
        id: `edge_${edgeCounter++}`,
        source: sourceId,
        target: targetId,
        label: "domain",
        type: "domain",
      };
      edges.push(edge);
      console.log("OWL Parser: Added domain edge:", sourceId, "->", targetId);
    });

    // Range relationships (property constraints)
    // Purpose: Show which classes can be objects of a property
    console.log("Processing range relationships...");
    rangeQuads.forEach((quad) => {
      if (
        quad.subject.termType !== "NamedNode" ||
        quad.object.termType !== "NamedNode"
      ) {
        return;
      }

      const sourceId = this.getLocalName(quad.subject.value);
      const targetId = this.getLocalName(quad.object.value);

      this.ensureNode(nodes, sourceId, quad.subject.value, "property");
      this.ensureNode(nodes, targetId, quad.object.value, "class");

      const edge = {
        id: `edge_${edgeCounter++}`,
        source: sourceId,
        target: targetId,
        label: "range",
        type: "range",
      };
      edges.push(edge);
      console.log("OWL Parser: Added range edge:", sourceId, "->", targetId);
    });

    // Final summary and validation
    console.log("=== ONTOLOGY DATA EXTRACTION COMPLETE ===");
    console.log("OWL Parser: Final extraction results:");
    console.log("  - Total nodes:", nodes.size);
    console.log("  - Total edges:", edges.length);

    const nodeBreakdown = {
      classes: Array.from(nodes.values()).filter((n) => n.type === "class")
        .length,
      properties: Array.from(nodes.values()).filter(
        (n) => n.type === "property"
      ).length,
      individuals: Array.from(nodes.values()).filter(
        (n) => n.type === "individual"
      ).length,
    };
    console.log("  - Node breakdown:", nodeBreakdown);

    // Log final nodes array for debugging
    console.log("OWL Parser: Final parsed nodes:");
    Array.from(nodes.values()).forEach((node) => {
      console.log(
        `  Node: ${node.id} (${node.type}) - "${node.label}" [${node.uri}]`
      );
    });

    // Log final edges array for debugging
    console.log("OWL Parser: Final parsed edges:");
    edges.forEach((edge) => {
      console.log(`  Edge: ${edge.source} --[${edge.label}]--> ${edge.target}`);
    });

    return {
      nodes: Array.from(nodes.values()),
      edges,
      metadata,
    };
  }

  /**
   * Ensure node exists - Helper method for node creation and deduplication
   *
   * Purpose: Create a node if it doesn't exist, preventing duplicates
   * Input:
   *   - nodes (Map): Current nodes collection
   *   - id (string): Unique identifier for the node
   *   - uri (string): Full URI of the entity
   *   - type (string): Node type ('class', 'property', 'individual', 'ontology')
   * Output: Node added to nodes Map if not already present
   * Logic: Check if node exists by ID, create if missing with basic properties
   * Dependencies: getLocalName method for generating labels
   *
   * @param {Map} nodes - Map of existing nodes
   * @param {string} id - Node identifier
   * @param {string} uri - Full URI of the entity
   * @param {string} type - Type of the node
   */
  ensureNode(nodes, id, uri, type) {
    // Runtime validation: Ensure required parameters
    if (!nodes || !id || !uri || !type) {
      console.warn("OWL Parser: ensureNode called with missing parameters:", {
        id,
        uri,
        type,
      });
      return;
    }

    if (!nodes.has(id)) {
      const node = {
        id,
        label: this.getLocalName(uri), // Use local name as fallback label
        type,
        uri,
      };
      nodes.set(id, node);
      console.log("OWL Parser: Ensured node exists:", id, "(", type, ")");
    }
  }

  /**
   * Get local name from URI - Helper method for extracting readable names
   *
   * Purpose: Extract the local part of a URI for use as identifier/label
   * Input: uri (string) - Full URI to process
   * Output: string - Local name portion of the URI
   * Logic:
   *   1. Handle blank nodes (return as-is)
   *   2. Find last occurrence of '#' or '/' separator
   *   3. Return substring after separator, or full URI if no separator
   * Dependencies: None
   *
   * @param {string} uri - The URI to extract local name from
   * @returns {string} The local name portion
   */
  getLocalName(uri) {
    // Runtime validation: Handle null/undefined input
    if (!uri || typeof uri !== "string") {
      console.warn("OWL Parser: getLocalName called with invalid URI:", uri);
      return uri || "unknown";
    }

    // Handle blank nodes - return identifier as-is
    // Purpose: Blank nodes use special _: prefix and should be preserved
    if (uri.startsWith("_:")) {
      return uri;
    }

    // Find the last occurrence of common URI separators
    // Purpose: URIs typically use # or / to separate namespace from local name
    const hashIndex = uri.lastIndexOf("#");
    const slashIndex = uri.lastIndexOf("/");
    const lastIndex = Math.max(hashIndex, slashIndex);

    // Extract local name if separator found and not at end
    if (lastIndex >= 0 && lastIndex < uri.length - 1) {
      const localName = uri.substring(lastIndex + 1);
      console.log(
        'OWL Parser: Extracted local name "' + localName + '" from URI:',
        uri
      );
      return localName;
    }

    // Return full URI if no separator found
    console.log(
      "OWL Parser: No separator found, using full URI as local name:",
      uri
    );
    return uri;
  }

  /**
   * Get human-readable label - Helper method for extracting display labels
   *
   * Purpose: Find human-readable labels for entities using rdfs:label
   * Input: subject (Term) - RDF term to find label for
   * Output: string|null - Human-readable label or null if not found
   * Logic:
   *   1. Validate input is a NamedNode (not BlankNode)
   *   2. Query store for rdfs:label triples
   *   3. Return first label found, or null if none
   * Dependencies: RDF store with label data
   *
   * @param {Object} subject - RDF term to get label for
   * @returns {string|null} Human-readable label or null
   */
  getLabel(subject) {
    // Runtime validation: Only process NamedNodes
    // Purpose: BlankNodes don't have meaningful labels in RDF
    if (!subject || subject.termType !== "NamedNode") {
      return null;
    }

    // Query for rdfs:label properties
    // Purpose: rdfs:label is the standard property for human-readable names
    const labelQuads = this.store.getQuads(
      subject,
      "http://www.w3.org/2000/01/rdf-schema#label",
      null,
      null
    );

    if (labelQuads.length > 0) {
      const label = labelQuads[0].object.value;
      console.log(
        'OWL Parser: Found label "' + label + '" for:',
        subject.value
      );
      return label;
    }

    return null;
  }
}

// === TEST HARNESS SECTION ===
// Purpose: Provide built-in testing capability with comprehensive sample data
// This section includes a hardcoded TTL sample and test execution function

/**
 * Test TTL Sample Data
 *
 * Purpose: Comprehensive test data that satisfies all requirements:
 * - At least 3 different entity types (classes): Person, Organization, Document
 * - At least 5 relationship triples: subClassOf, domain, range relationships
 * - Mixed URI formats: Full URIs and prefixed notation
 * - Unicode characters in labels: "Persönlichkeit" (German), "組織" (Japanese)
 *
 * The sample represents a simple knowledge organization system with:
 * - Person and Organization as subclasses of Agent
 * - Properties linking these classes with domain/range constraints
 * - Multilingual labels demonstrating Unicode support
 */
const TEST_TTL_SAMPLE = `
@prefix ex: <http://example.org/ontology#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix dc: <http://purl.org/dc/elements/1.1/> .

# Ontology declaration with metadata
<http://example.org/ontology> rdf:type owl:Ontology ;
    dc:title "Test Knowledge Organization Ontology" ;
    dc:description "A sample ontology for testing the OWL parser with various entity types and relationships" .

# Class declarations with multilingual labels
ex:Agent rdf:type owl:Class ;
    rdfs:label "Agent"@en ;
    rdfs:label "Akteur"@de .

ex:Person rdf:type owl:Class ;
    rdfs:subClassOf ex:Agent ;
    rdfs:label "Person"@en ;
    rdfs:label "Persönlichkeit"@de .

ex:Organization rdf:type owl:Class ;
    rdfs:subClassOf ex:Agent ;
    rdfs:label "Organization"@en ;
    rdfs:label "組織"@ja .

ex:Document rdf:type owl:Class ;
    rdfs:label "Document"@en ;
    rdfs:label "Dokument"@de .

# Property declarations with domain and range
ex:hasName rdf:type owl:DatatypeProperty ;
    rdfs:domain ex:Agent ;
    rdfs:range rdfs:Literal ;
    rdfs:label "has name"@en .

ex:worksFor rdf:type owl:ObjectProperty ;
    rdfs:domain ex:Person ;
    rdfs:range ex:Organization ;
    rdfs:label "works for"@en .

ex:creates rdf:type owl:ObjectProperty ;
    rdfs:domain ex:Agent ;
    rdfs:range ex:Document ;
    rdfs:label "creates"@en .

ex:manages rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf ex:worksFor ;
    rdfs:domain ex:Person ;
    rdfs:range ex:Organization ;
    rdfs:label "manages"@en .

# Individual declarations
ex:JohnDoe rdf:type owl:NamedIndividual ;
    rdf:type ex:Person ;
    rdfs:label "John Doe" .

ex:AcmeCorp rdf:type owl:NamedIndividual ;
    rdf:type ex:Organization ;
    rdfs:label "ACME Corporation" .
`;

/**
 * Test Harness Function - Execute parser test with sample data
 *
 * Purpose: Demonstrate parser functionality and validate correct operation
 * Input: None (uses hardcoded test data)
 * Output: Console logs showing parsing progress and results
 * Logic:
 *   1. Create parser instance
 *   2. Parse test TTL sample
 *   3. Log detailed results
 *   4. Validate expected outcomes
 * Dependencies: OWLParser class, TEST_TTL_SAMPLE data
 */
export async function runParserTest() {
  console.log("=== OWL PARSER TEST HARNESS STARTING ===");
  console.log(
    "Test Purpose: Validate parser functionality with comprehensive sample data"
  );
  console.log("Expected Results:");
  console.log("  - At least 4 classes (Agent, Person, Organization, Document)");
  console.log(
    "  - At least 4 properties (hasName, worksFor, creates, manages)"
  );
  console.log("  - At least 2 individuals (JohnDoe, AcmeCorp)");
  console.log(
    "  - Multiple relationship types (subClassOf, domain, range, subPropertyOf)"
  );
  console.log("  - Unicode labels in German and Japanese");

  try {
    // Create parser instance
    const parser = new OWLParser();
    console.log("Test: Created parser instance");

    // Parse the test sample
    console.log("Test: Starting parse of sample TTL data...");
    console.log("Test: Sample TTL content:");
    console.log(TEST_TTL_SAMPLE);

    const result = await parser.parse(TEST_TTL_SAMPLE);

    // Validate and report results
    console.log("=== TEST RESULTS VALIDATION ===");
    console.log("✓ Parsing completed successfully");
    console.log("✓ Total nodes found:", result.nodes.length);
    console.log("✓ Total edges found:", result.edges.length);
    console.log("✓ Metadata extracted:", result.metadata);

    // Detailed breakdown
    const nodesByType = {
      classes: result.nodes.filter((n) => n.type === "class"),
      properties: result.nodes.filter((n) => n.type === "property"),
      individuals: result.nodes.filter((n) => n.type === "individual"),
    };

    console.log("✓ Node breakdown:");
    console.log("  - Classes:", nodesByType.classes.length);
    console.log("  - Properties:", nodesByType.properties.length);
    console.log("  - Individuals:", nodesByType.individuals.length);

    // Validate requirements
    const validationResults = {
      hasMultipleClasses: nodesByType.classes.length >= 3,
      hasMultipleRelationships: result.edges.length >= 5,
      hasUnicodeLabels: result.nodes.some(
        (n) => n.label.includes("ö") || n.label.includes("組")
      ),
      hasMetadata: result.metadata.title && result.metadata.description,
    };

    console.log("✓ Requirement validation:");
    Object.entries(validationResults).forEach(([requirement, passed]) => {
      console.log(`  - ${requirement}: ${passed ? "✓ PASS" : "✗ FAIL"}`);
    });

    // Success message
    const allPassed = Object.values(validationResults).every((v) => v);
    console.log("=== TEST HARNESS COMPLETE ===");
    console.log(allPassed ? "✓ ALL TESTS PASSED" : "✗ SOME TESTS FAILED");

    return result;
  } catch (error) {
    console.error("=== TEST HARNESS FAILED ===");
    console.error("✗ Test failed with error:", error);
    console.error("✗ Error details:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

// Auto-run test harness when module loads (for immediate validation)
console.log("OWL Parser module loaded - running test harness...");
runParserTest().catch((error) => {
  console.error("Auto-test failed:", error);
});
