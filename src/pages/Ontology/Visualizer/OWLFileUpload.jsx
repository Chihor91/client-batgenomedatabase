import React from "react";
import { Button } from "@mui/material";
import useOWLImport from "./useOWLImport";

/**
 * OWLFileUpload Component
 *
 * A minimal component that provides a button to trigger OWL file import.
 * Uses the useOWLImport hook internally for file handling.
 *
 * @param {Object} props
 * @param {Function} props.onImportComplete - Callback when import succeeds: (parsedData, metadata) => void
 * @param {Function} props.onImportError - Callback when import fails: (error) => void
 * @param {Function} props.onStatusChange - Callback for status updates: (status, progress, metadata, error) => void
 */
export default function OWLFileUpload({
  onImportComplete,
  onImportError,
  onStatusChange,
}) {
  const {
    parsedData,
    uploadStatus,
    fileMetadata,
    errorMessage,
    progressPercentage,
    startFileSelect,
    fileInputRef,
    handleInputChange,
  } = useOWLImport();

  // Notify parent of status changes
  React.useEffect(() => {
    if (onStatusChange) {
      onStatusChange(
        uploadStatus,
        progressPercentage,
        fileMetadata,
        errorMessage
      );
    }
  }, [
    uploadStatus,
    progressPercentage,
    fileMetadata,
    errorMessage,
    onStatusChange,
  ]);

  // Notify parent of successful import
  React.useEffect(() => {
    if (uploadStatus === "success" && parsedData && onImportComplete) {
      onImportComplete(parsedData, fileMetadata);
    }
  }, [uploadStatus, parsedData, fileMetadata, onImportComplete]);

  // Notify parent of import errors
  React.useEffect(() => {
    if (uploadStatus === "error" && errorMessage && onImportError) {
      onImportError(errorMessage);
    }
  }, [uploadStatus, errorMessage, onImportError]);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".ttl,.owl,.rdf,.xml"
        onChange={handleInputChange}
        style={{ display: "none" }}
        aria-label="Upload OWL file"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={startFileSelect}
        disabled={uploadStatus === "importing"}
        sx={{
          textTransform: "none",
          fontWeight: 500,
        }}
      >
        {uploadStatus === "importing" ? "Importing..." : "Import File"}
      </Button>
    </>
  );
}
