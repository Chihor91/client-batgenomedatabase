import { useState } from 'react';
import { OWLParser } from '../utils/owlParser.js';

/**
 * useFileProcessor Hook
 * 
 * A React hook for processing OWL/RDF ontology files with validation and progress tracking.
 * Connects the React UI to the existing OWL parser.
 * 
 * @returns {Object} Hook API with the following properties:
 *   - ontologyData: {Object} Current state containing nodes, edges, metadata, isLoading, and error
 *   - handleFile: {Function} Submit a File object for processing
 *   - validateFile: {Function} Synchronous validation returning {valid: boolean, error?: string}
 *   - clearData: {Function} Reset all parsed data and metadata
 *   - progress: {number} File read/parse progress (0-100)
 * 
 * @example
 * const { ontologyData, handleFile, validateFile, clearData, progress } = useFileProcessor();
 * 
 * // Validate a file before processing
 * const validation = validateFile(file);
 * if (!validation.valid) {
 *   console.error(validation.error);
 *   return;
 * }
 * 
 * // Process the file
 * await handleFile(file);
 * 
 * // Access parsed data
 * console.log(ontologyData.nodes, ontologyData.edges);
 */
export default function useFileProcessor() {
  // State for ontology data matching the spec
  const [ontologyData, setOntologyData] = useState({
    nodes: [],
    edges: [],
    metadata: { nodeCount: 0, edgeCount: 0, fileName: '' },
    isLoading: false,
    error: null
  });

  // State for progress tracking (0-100)
  const [progress, setProgress] = useState(0);

  /**
   * Validate file before processing
   * 
   * Checks file extension, MIME type, and size constraints.
   * 
   * @param {File} file - The file to validate
   * @returns {Object} Validation result with {valid: boolean, error?: string}
   */
  const validateFile = (file) => {
    if (!file) {
      return { valid: false, error: 'No file provided.' };
    }

    // Check for empty file
    if (file.size === 0) {
      return { 
        valid: false, 
        error: 'File appears to be empty. Please select a valid ontology file.' 
      };
    }

    // Check file size (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > MAX_SIZE) {
      return { 
        valid: false, 
        error: 'File size exceeds 10MB limit. Please choose a smaller file.' 
      };
    }

    // Validate file extension
    const fileName = file.name.toLowerCase();
    const validExtensions = ['.owl', '.rdf', '.ttl', '.n3'];
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
      return { 
        valid: false, 
        error: 'Unsupported file type. Please upload .owl, .rdf, .ttl, or .n3 files.' 
      };
    }

    // Validate MIME type (if available, but don't strictly rely on it)
    const validMimeTypes = [
      'application/rdf+xml',
      'text/turtle',
      'application/n-triples',
      'text/plain', // Many systems use text/plain for .ttl files
      'application/xml',
      'text/xml'
    ];

    // Only validate MIME if it's provided and not empty
    if (file.type && !validMimeTypes.includes(file.type)) {
      console.warn('File MIME type not in expected list:', file.type);
      // Don't fail validation on MIME alone, just warn
    }

    return { valid: true };
  };

  /**
   * Parse content string and normalize to state structure
   * 
   * Internal helper that calls the parser and maps output to hook state format.
   * 
   * @param {string} content - The file content to parse
   * @param {string} fileName - Name of the file being parsed
   * @returns {Promise<Object>} Normalized structure with {nodes, edges, metadata}
   */
  const parseContentString = async (content, fileName) => {
    const parser = new OWLParser();
    const parserOutput = await parser.parse(content);

    // Normalize parser output to hook state structure
    const normalized = {
      nodes: parserOutput.nodes || [],
      edges: parserOutput.edges || [],
      metadata: {
        nodeCount: (parserOutput.nodes || []).length,
        edgeCount: (parserOutput.edges || []).length,
        fileName: fileName,
        // Merge any additional metadata from parser
        ...(parserOutput.metadata || {})
      }
    };

    return normalized;
  };

  /**
   * Handle file processing
   * 
   * Validates, reads, and parses an OWL/RDF file, updating state throughout.
   * 
   * @param {File} file - The File object to process
   * @returns {Promise<void>}
   */
  const handleFile = async (file) => {
    // Validate file first
    const validation = validateFile(file);
    if (!validation.valid) {
      setOntologyData(prev => ({
        ...prev,
        error: validation.error,
        isLoading: false
      }));
      setProgress(100);
      return;
    }

    // Reset state and start loading
    setOntologyData({
      nodes: [],
      edges: [],
      metadata: { nodeCount: 0, edgeCount: 0, fileName: '' },
      isLoading: true,
      error: null
    });
    setProgress(0);

    // Create FileReader for reading file content
    const reader = new FileReader();

    // Handle read progress
    reader.onprogress = (event) => {
      if (event.lengthComputable && event.total > 0) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      } else {
        // Indeterminate progress: set to 50 when reading begins
        setProgress(50);
      }
    };

    // Handle read errors
    reader.onerror = () => {
      setOntologyData(prev => ({
        ...prev,
        error: 'File processing interrupted. Please try again.',
        isLoading: false
      }));
      setProgress(100);
    };

    // Handle successful file read
    reader.onload = async (event) => {
      try {
        const content = event.target.result;

        // Update progress to indicate parsing is starting
        setProgress(50);

        // Parse the content
        const parsedData = await parseContentString(content, file.name);

        // Log success message with exact format required
        console.log(`Parsed ${parsedData.metadata.nodeCount} nodes and ${parsedData.metadata.edgeCount} edges`);

        // Update state with parsed data
        setOntologyData({
          nodes: parsedData.nodes,
          edges: parsedData.edges,
          metadata: parsedData.metadata,
          isLoading: false,
          error: null
        });

        // Set progress to 100 on success
        setProgress(100);

      } catch (error) {
        console.error('File parsing error:', error);

        // Translate parser errors to user-friendly messages
        let errorMessage = error.message;

        // Check for RDF/XML format error (from parser)
        if (errorMessage.includes('RDF/XML format detected') ||
            errorMessage.includes('<?xml') ||
            errorMessage.includes('<rdf:RDF')) {
          errorMessage = 'Unsupported file type. Please upload .owl, .rdf, .ttl, or .n3 files.';
        }
        // For other parsing failures, preserve the original parser error message

        setOntologyData(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false
        }));

        // Set progress to 100 on error
        setProgress(100);
      }
    };

    // Start reading the file as UTF-8 text
    reader.readAsText(file, 'utf-8');
  };

  /**
   * Clear all data and reset to initial state
   */
  const clearData = () => {
    setOntologyData({
      nodes: [],
      edges: [],
      metadata: { nodeCount: 0, edgeCount: 0, fileName: '' },
      isLoading: false,
      error: null
    });
    setProgress(0);
  };

  // Return the hook API
  return {
    ontologyData,
    handleFile,
    validateFile,
    clearData,
    progress
  };
}