import { useState, useRef, useEffect, useCallback } from "react";
import { OWLParser } from "@/utils/OwlParser.js";

/**
 * useOWLImport Hook - Simplified version for beginners
 *
 * This hook handles importing OWL ontology files into your application.
 * It reads the file, parses it, and returns the structured data.
 *
 * What it returns:
 * - parsedData: The ontology graph (nodes and edges)
 * - uploadStatus: Current state ('idle', 'importing', 'success', 'error')
 * - fileMetadata: Information about the file and ontology
 * - errorMessage: What went wrong (if there's an error)
 * - startFileSelect: Function to open the file picker
 * - fileInputRef: Reference for the hidden file input
 * - resetImport: Function to start over
 */
export default function useOWLImport() {
  // Store the parsed ontology data
  const [parsedData, setParsedData] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [fileMetadata, setFileMetadata] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Reference to the hidden file input element
  const fileInputRef = useRef(null);

  // Reference to the FileReader (for cleanup if needed)
  const fileReaderRef = useRef(null);

  const validateFile = useCallback((file) => {
    if (!file) {
      return { valid: false, error: "No file selected." };
    }

    if (file.size === 0) {
      return {
        valid: false,
        error: "File is empty. Please select a valid OWL file.",
      };
    }

    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_SIZE) {
      return {
        valid: false,
        error: `File size exceeds 50MB limit (${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB). Please choose a smaller file.`,
      };
    }
    // File is valid
    return { valid: true };
  }, []);

  const handleFileSelection = useCallback(
    async (file) => {
      const validation = validateFile(file);
      if (!validation.valid) {
        setUploadStatus("error");
        setErrorMessage(validation.error);
        return;
      }

      // Reset previous state
      setParsedData(null);
      setErrorMessage(null);
      setFileMetadata({
        filename: file.name,
        size: file.size,
        lastModified: file.lastModified,
      });
      setUploadStatus("importing");

      const reader = new FileReader();
      fileReaderRef.current = reader;

      // If read fails
      reader.onerror = () => {
        setUploadStatus("error");
        setErrorMessage("Failed to read file. Please try again.");
        fileReaderRef.current = null;
      };

      // If read is successful, start parsing
      reader.onload = async (event) => {
        try {
          // Get the file content as text
          const content = event.target.result;
          setUploadStatus("parsing");

          const parser = new OWLParser();
          const result = await parser.parse(content);

          const nodeCount = result.nodes?.length || 0;
          const edgeCount = result.edges?.length || 0;

          // Update state with successful results
          setParsedData(result);
          setFileMetadata((prev) => ({
            ...prev,
            nodeCount,
            edgeCount,
            // Add ontology name and description from metadata
            ontologyName:
              result.metadata?.name || result.metadata?.title || null,
            ontologyDescription:
              result.metadata?.comment || result.metadata?.description || null,
          }));
          setUploadStatus("success");

          console.log(
            `Successfully parsed ${nodeCount} nodes and ${edgeCount} edges from ${file.name}`
          );
        } catch (error) {
          console.error("OWL parsing error:", error);

          let userMessage = "Failed to parse OWL file. ";

          if (error.message.includes("RDF/XML format detected")) {
            userMessage +=
              "RDF/XML format is not supported. Please convert to Turtle format (.ttl).";
          } else if (
            error.message.includes("parse") ||
            error.message.includes("invalid")
          ) {
            userMessage += "The file appears to be  corrupted.";
          } else {
            userMessage += error.message || "Unknown error occurred.";
          }

          setUploadStatus("error");
          setErrorMessage(userMessage);
        } finally {
          fileReaderRef.current = null;
        }
      };

      // Start reading the file as text
      reader.readAsText(file, "utf-8");
    },
    [validateFile]
  );

  /**
   * Open the file picker when user clicks the import button
   */
  const startFileSelect = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  /**
   * Reset everything back to initial state
   */
  const resetImport = useCallback(() => {
    // Abort any active FileReader
    if (fileReaderRef.current) {
      fileReaderRef.current.abort();
      fileReaderRef.current = null;
    }

    // Reset all state
    setParsedData(null);
    setUploadStatus("idle");
    setFileMetadata(null);
    setErrorMessage(null);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (fileReaderRef.current) {
        fileReaderRef.current.abort();
      }
    };
  }, []);

  /**
   * Handle when user selects a file from the file picker
   */
  const handleInputChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file) {
        handleFileSelection(file);
      }
    },
    [handleFileSelection]
  );

  return {
    parsedData,
    uploadStatus,
    fileMetadata,
    errorMessage,
    startFileSelect,
    fileInputRef,
    resetImport,
    handleInputChange, // Internal use for connecting to input element
  };
}
