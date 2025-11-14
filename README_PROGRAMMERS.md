# Ontology Visualization Platform - Programmer's Guide

## Overview

This document provides a comprehensive guide to the ontology visualization system, focusing on the core components in `src/pages/Ontology/Visualizer`. The system is built with React and uses Material-UI for the interface, with a focus on simplicity and readability for beginner programmers.

## Core Architecture

### Main Components Structure

```
src/
├── pages/
│   └── Ontology/
│       └── Visualizer/
│           ├── OntoGraph.jsx          # Main visualization page component
│           ├── useOWLImport.js        # Hook for OWL file import logic
│           ├── OWLFileUpload.jsx      # File upload button component
│           ├── components/            # Reusable visualization components
│           │   ├── index.js           # Barrel export for all components
│           │   ├── OntologyStatusCard.jsx
│           │   ├── OntologyMetadataCard.jsx
│           │   ├── ImportProgressCard.jsx
│           │   └── ImportHelpText.jsx
│           ├── graphView.jsx          # Graph visualization component
│           ├── header.jsx             # Page header with import button
│           └── infoBar.jsx            # Status information panel
├── utils/
│   └── OwlParser.js                   # OWL parsing and metadata extraction
└── components/
    └── Layout/                        # Reusable layout components
        ├── PageHeader.jsx
        ├── InfoPanel.jsx
        └── InfoCard.jsx
```

## Core Components

### 1. `useOWLImport.js` - Simplified Import Hook

#### Purpose

Handles the complete OWL file import workflow with simplified functionality for better readability.

#### Key Features

- **No File Validation**: Relies on HTML5 file picker's `accept` attribute instead of manual validation
- **No Progress Simulation**: Removes complex progress tracking for simpler code
- **Direct Error Handling**: Displays errors immediately without intermediate states
- **Metadata Extraction**: Extracts ontology name and description from RDF properties

#### State Management

- `parsedData`: Contains nodes, edges, and metadata after successful parsing
- `uploadStatus`: Tracks current state (`'idle'`, `'importing'`, `'success'`, `'error'`)
- `fileMetadata`: Stores file information and extracted ontology metadata
- `errorMessage`: Contains user-friendly error messages when import fails

#### Key Functions

- `startFileSelect()`: Triggers the hidden file input
- `handleFileSelection(file)`: Processes the selected file and parses it
- `resetImport()`: Resets all state to initial values

#### Extracted Metadata

- `ontologyName`: From `rdfs:label` property in the ontology
- `ontologyDescription`: From `rdfs:comment` property in the ontology
- `nodeCount`: Number of nodes extracted from the ontology
- `edgeCount`: Number of relationships extracted from the ontology

### 2. `OWLFileUpload.jsx` - File Upload Component

#### Purpose

Provides a button interface for file selection that works with the `useOWLImport` hook.

#### Features

- **File Type Restriction**: Uses HTML5 `accept` attribute to limit to `.ttl,.owl,.rdf,.xml` files
- **Status Feedback**: Shows "Importing..." when import is in progress
- **Callback Integration**: Provides callbacks for parent components to handle import events

#### Props

- `onImportComplete`: Called when import succeeds
- `onImportError`: Called when import fails
- `onStatusChange`: Called when import status changes

### 3. `OntoGraph.jsx` - Main Visualization Page

#### Purpose

Composes all visualization components into a complete page with proper layout and state management.

#### Layout Structure

- **Header**: Contains page title and import button
- **Graph View**: Displays the interactive ontology visualization
- **Info Panel**: Shows import status and metadata

#### State Integration

- Uses `useOWLImport` hook to manage file import state
- Passes parsed data to graph visualization component
- Manages status display through specialized card components

### 4. Specialized Card Components

#### `OntologyStatusCard.jsx`

- Displays current import status with color-coded feedback
- Shows dynamic messages based on import state
- Uses status colors: green (success), red (error), blue (importing)

#### `OntologyMetadataCard.jsx`

- Displays extracted ontology information
- Shows file name, ontology name (from `rdfs:label`), and description (from `rdfs:comment`)
- Displays node and edge counts

#### `ImportProgressCard.jsx`

- Simple progress indicator during import
- Shows "Importing and parsing ontology..." message

#### `ImportHelpText.jsx`

- Help text displayed when no file is imported
- Provides guidance on supported file types and size limits

### 5. `OwlParser.js` - OWL Parsing Logic

#### Purpose

Handles the parsing of OWL/TTL content into structured data for visualization.

#### Core Concepts for Beginners

##### RDF (Resource Description Framework)

**What is RDF?**
RDF is a standard model for data interchange on the web. Think of it as a way to represent information about things and their relationships using a simple, consistent structure. It's like a database but designed specifically for linking data across the web.

**Purpose:**

- Provides a common framework for representing information on the web
- Enables data to be shared and reused across applications
- Allows for linking data from different sources

**Structure:**
RDF represents information as statements about resources, where each statement consists of:

- **Subject**: The resource being described (like a person, place, or concept)
- **Predicate**: The property or relationship (like "hasName", "isLocatedIn", "isPartOf")
- **Object**: The value of the property or related resource

**Example:**

```
Subject: John -> Predicate: hasAge -> Object: 30
Subject: John -> Predicate: isLocatedIn -> Object: New York
```

##### N3.js Library

**What is N3.js?**
N3.js is a JavaScript library that provides tools for parsing, serializing, and manipulating RDF data. It's specifically designed to work with RDF formats like Turtle, N-Triples, and N-Quads.

**Why use it?**

- Handles the complex parsing of RDF formats automatically
- Provides a clean API for working with RDF data in JavaScript
- Efficiently processes large RDF datasets
- Supports multiple RDF formats

**Role in this project:**

- Parses the text content of OWL files into structured data
- Converts human-readable RDF formats (like Turtle) into JavaScript objects
- Provides tools for querying and manipulating the parsed data

##### Quads (RDF Quads)

**What is a Quad?**
A Quad is an extension of the basic RDF triple (subject-predicate-object) with an additional component called the "graph" or "context". It's called a "Quad" because it has four components:

1. **Subject**: The resource being described (e.g., "John")
2. **Predicate**: The relationship or property (e.g., "hasAge")
3. **Object**: The value of the property or related resource (e.g., "30")
4. **Graph**: The context or named graph that contains this triple (e.g., "personalInfo")

**Why the fourth component?**
The graph component allows RDF data to be organized into named collections, which is useful for:

- Organizing related data
- Handling data from multiple sources
- Managing different contexts or perspectives

**How it represents semantic data:**
Quads provide a complete picture of semantic relationships by not only stating facts but also indicating the context in which those facts exist. This allows for more nuanced representation of information and helps avoid conflicts when combining data from different sources.

#### How OwlParser.js Leverages These Concepts

The `OwlParser.js` module uses these core concepts to process OWL/RDF files:

1. **Importing N3**: The module imports the Parser and Store from the n3 library (line 1):

   ```javascript
   import { Parser, Store } from "n3";
   ```

   This gives access to the parsing and storage capabilities needed to work with RDF data.

2. **Constructor Initialization**: The constructor (lines 26-46) sets up the parser with:

   - An RDF store to hold parsed quads
   - Common namespace prefixes (rdf, rdfs, owl, xsd) that are standard in OWL ontologies
     These prefixes make it easier to work with the standard vocabulary used in ontologies.

3. **Parsing Process**: The `parse()` method (lines 64-147) follows these steps:

   - **Input Validation**: Checks if the input is in an unsupported format (like RDF/XML) and throws an error if so
   - **Quad Parsing**: Uses the N3 Parser to convert text content into structured quads:
     ```javascript
     const quads = parser.parse(owlContent);
     ```
   - **Storage**: Adds the parsed quads to the internal store:
     ```javascript
     this.store.addQuads(quads);
     ```
   - **Extraction**: Calls `extractOntologyData()` to convert raw quads into structured nodes and edges

4. **Data Extraction**: The `extractOntologyData()` method (lines 168-742) is the core of the parsing logic:
   - **Metadata Extraction**: Finds ontology declarations and extracts title, description, name, and comment
   - **Entity Recognition**: Identifies classes, properties, and individuals by looking for specific patterns in the quads
   - **Relationship Mapping**: Extracts semantic relationships like subClassOf, domain, and range
   - **Node Creation**: Converts RDF resources into visualization-friendly nodes
   - **Edge Creation**: Converts RDF relationships into visualization-friendly edges

#### Key Features

- **RDF Store**: Uses N3 library to create an RDF store from parsed content
- **Metadata Extraction**: Extracts ontology information from RDF properties
- **Entity Recognition**: Identifies classes, properties, and individuals
- **Relationship Mapping**: Extracts semantic relationships between entities

#### Metadata Extraction

- **Ontology Name**: Extracted from `rdfs:label` property
- **Ontology Description**: Extracted from `rdfs:comment` property
- **Alternative Properties**: Also checks for Dublin Core properties (`dc:title`, `dc:description`)

#### Entity Types Extracted

- **Classes**: OWL classes with inheritance relationships
- **Properties**: Object and datatype properties with domain/range constraints
- **Individuals**: Named individuals in the ontology

#### Line-by-Line Explanation of OwlParser.js

**Lines 1-2:** Import the Parser and Store from the n3 library

```javascript
import { Parser, Store } from "n3";
```

This imports the core tools needed to parse and store RDF data.

**Lines 19-46:** OWLParser class constructor

- Initializes an RDF store to hold parsed quads
- Sets up common namespace prefixes (rdf, rdfs, owl, xsd) used in OWL ontologies
- These prefixes make it easier to work with standard vocabulary

**Lines 64-147:** The main parse() method

- Takes raw OWL/TTL content as a string
- Validates the format (rejects RDF/XML)
- Uses the N3 Parser to convert text to quads
- Stores quads in the internal store
- Calls extractOntologyData() to convert to visualization format
- Returns structured data with nodes, edges, and metadata

**Lines 168-742:** The extractOntologyData() method

- Extracts ontology metadata (URI, title, description, name, comment)
- Finds and processes classes (explicit declarations and inferred from relationships)
- Finds and processes properties (different types: ObjectProperty, DatatypeProperty, etc.)
- Finds and processes individuals (NamedIndividuals)
- Extracts relationships (subClassOf, subPropertyOf, domain, range)
- Creates nodes and edges for visualization

**Lines 763-783:** ensureNode() helper method

- Ensures a node exists in the collection
- Prevents duplicate nodes
- Creates nodes with basic properties if they don't exist

**Lines 801-835:** getLocalName() helper method

- Extracts the readable part of a URI
- For example, from "http://example.org/Person" it extracts "Person"
- Handles different URI formats and separators

**Lines 853-878:** getLabel() helper method

- Finds human-readable labels for entities
- Looks for rdfs:label properties in the RDF store
- Returns the first label found or null if none exists

**Lines 882-1059:** Test harness

- Includes sample TTL data for testing
- Provides a runParserTest() function to validate the parser
- Automatically runs tests when the module loads

## File Type Handling

### HTML5 File Picker Integration

- The file input uses `accept=".ttl,.owl,.rdf,.xml"` to restrict file types at the browser level
- This eliminates the need for manual file extension validation in the hook
- Provides better user experience with appropriate file type filtering in the OS file dialog

### Supported Formats

- **Turtle (TTL)**: `.ttl` files - preferred format for parsing
- **OWL/XML**: `.owl` files - OWL in XML format
- **RDF/XML**: `.rdf` files - Resource Description Framework in XML
- **Generic XML**: `.xml` files - for various XML-based RDF formats

## Error Handling

### Direct Error Display

- Errors are displayed immediately without complex state transitions
- User-friendly error messages with clear explanations
- Different error types handled with appropriate feedback

### Common Error Scenarios

- **Empty Files**: "File is empty. Please select a valid OWL file."
- **Large Files**: Files exceeding 50MB limit with size information
- **Parsing Errors**: "The file appears to be malformed or corrupted."
- **Unsupported Formats**: Specific messages for RDF/XML format issues

## Component Communication

### State Flow

1. User clicks import button → `startFileSelect()` triggers file picker
2. User selects file → `handleInputChange()` processes selection
3. File validation occurs → `handleFileSelection()` begins import
4. FileReader reads file → Parser processes content
5. Results stored in state → Components update UI

### Prop Passing

- `OntoGraph.jsx` manages state and passes props to child components
- `useOWLImport` hook provides state and functions to UI components
- Specialized cards receive specific data for display

## Code Readability Features

### Beginner-Friendly Practices

- **Clear Comments**: Each function and major code block has explanatory comments
- **Descriptive Names**: Variable and function names clearly indicate their purpose
- **Simple Logic**: Complex operations broken down into smaller, understandable steps
- **Consistent Patterns**: Similar components follow the same structure and naming conventions

### Error Prevention

- **Null Checks**: Proper handling of undefined or null values
- **Type Validation**: Runtime checks to prevent errors
- **Cleanup**: Proper cleanup of resources like FileReader instances

## Future Expansion Points

### Extensible Architecture

- **New Card Components**: Easy to add specialized cards for new features
- **Parser Extensions**: OwlParser.js can be enhanced to support additional RDF properties
- **Visualization Features**: GraphView.jsx can be extended with new interaction modes
- **Import Enhancements**: useOWLImport.js can support additional file formats or processing options

### Integration Points

- **Authentication**: Components can be enhanced with user authentication
- **Persistence**: Import results could be saved to a backend
- **Sharing**: Visualization could be shared or exported
- **Comparison**: Multiple ontologies could be loaded simultaneously

## Development Guidelines

### Adding New Features

1. Create new components in the `components/` subdirectory
2. Add exports to the `index.js` barrel file
3. Use existing patterns for state management and prop passing
4. Follow the same commenting and naming conventions

### Testing Considerations

- Each hook function should be testable in isolation
- Component rendering should be predictable based on props
- Error states should be handled gracefully
- File operations should have proper cleanup

This architecture provides a solid foundation for building additional ontology visualization features while maintaining code clarity and simplicity for beginner programmers.
