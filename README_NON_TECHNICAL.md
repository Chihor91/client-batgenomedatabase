# Ontology Visualization Platform

## Overview

This platform provides an intuitive interface for visualizing ontology data through interactive graph representations. It allows users to import and explore semantic data models in a user-friendly environment.

## Key Features

### Ontology Visualization

- **Interactive Graph Display**: View ontologies as connected nodes and relationships in an intuitive visual format
- **Node Types**: Different visual representations for classes, properties, and individuals
- **Relationship Mapping**: Clear visualization of semantic relationships like subClassOf, domain, and range

### Simplified File Import Process

#### Supported File Types

The system accepts the following ontology file formats:

- **TTL (Turtle)** - `.ttl` files
- **OWL (Web Ontology Language)** - `.owl` files
- **RDF (Resource Description Framework)** - `.rdf` files
- **XML (eXtensible Markup Language)** - `.xml` files

#### Import Experience

- **One-Click Import**: Simple file selection with a single button click
- **Immediate Feedback**: Real-time status updates during the import process
- **Error Handling**: Clear error messages when import issues occur
- **Metadata Extraction**: Automatic extraction of ontology name and description from imported files

#### Extracted Metadata

- **Ontology Name**: Retrieved from `rdfs:label` properties in the file
- **Ontology Description**: Retrieved from `rdfs:comment` properties in the file
- **File Statistics**: Node count and edge count displayed after successful import

### User Interface

- **Clean Layout**: Organized interface with visualization panel and metadata panel
- **Status Tracking**: Real-time status updates during import operations
- **File Information**: Detailed metadata display after successful imports
- **Responsive Design**: Works across different screen sizes

## How to Use

1. **Import an Ontology File**

   - Click the "Import File" button
   - Select a TTL, RDF, OWL, or XML file from your computer
   - Wait for the import process to complete

2. **View the Visualization**

   - Explore the interactive graph representation
   - Hover over nodes to see details
   - Pan and zoom to navigate the visualization

3. **Check Metadata**
   - View extracted ontology name and description
   - See file statistics like node and edge counts
   - Monitor import status in real-time

## Benefits

- **User-Friendly**: Simple interface designed for non-technical users
- **Comprehensive**: Supports all major ontology formats
- **Informative**: Provides detailed metadata about imported ontologies
- **Reliable**: Robust error handling prevents system crashes
- **Visual**: Clear graphical representation of complex semantic relationships

## Future Extensions

This platform is designed for expansion with additional features such as:

- Advanced search and filtering capabilities
- Export options for visualization images
- Ontology editing and modification tools
- Comparison tools for multiple ontologies
- Integration with external ontology repositories
- Collaboration features for team-based ontology development
