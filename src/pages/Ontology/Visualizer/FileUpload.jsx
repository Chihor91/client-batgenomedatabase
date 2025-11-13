import { useState, useRef } from 'react';
import './FileUpload.css';

/**
 * FileUpload Component
 * 
 * Provides file upload interface with:
 * - Standard file input
 * - Drag-and-drop functionality
 * - File metadata preview (name, size, type)
 * - Clear/reset functionality
 * - Visual feedback for drag states
 * 
 * @param {Object} props
 * @param {Function} props.onFileSelect - Callback when file is selected: (file: File) => void
 * @param {Function} props.onValidate - Optional validation function: (file: File) => { valid: boolean, error?: string }
 * @param {boolean} props.disabled - Disable upload controls
 * @param {Object} props.fileMetadata - Current file metadata: { fileName: string, size?: number, type?: string }
 * @param {Function} props.onClear - Callback to clear uploaded file
 */
export default function FileUpload({ 
  onFileSelect, 
  onValidate, 
  disabled = false,
  fileMetadata = null,
  onClear
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const fileInputRef = useRef(null);

  /**
   * Handle file selection from input or drop
   */
  const handleFileChange = (file) => {
    if (!file) return;

    // Clear previous validation errors
    setValidationError(null);

    // Validate if validator provided
    if (onValidate) {
      const validation = onValidate(file);
      if (!validation.valid) {
        setValidationError(validation.error);
        return;
      }
    }

    // Pass file to parent component
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  /**
   * Handle input change event
   */
  const onInputChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  /**
   * Handle drag over event
   */
  const onDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  /**
   * Handle drag leave event
   */
  const onDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  /**
   * Handle drop event
   */
  const onDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  /**
   * Trigger file input click
   */
  const handleButtonClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Handle clear button click
   */
  const handleClear = () => {
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onClear) {
      onClear();
    }
  };

  /**
   * Format file size for display
   */
  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="file-upload-container">
      {/* Drop Zone */}
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".owl,.rdf,.ttl,.n3"
          onChange={onInputChange}
          disabled={disabled}
          style={{ display: 'none' }}
          aria-label="Upload ontology file"
        />
        
        <div className="drop-zone-content">
          <svg
            className="upload-icon"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          
          <p className="drop-zone-text">
            {isDragging ? (
              <strong>Drop file here</strong>
            ) : (
              <>
                <strong>Click to upload</strong> or drag and drop
              </>
            )}
          </p>
          
          <p className="drop-zone-hint">
            Supported formats: .owl, .rdf, .ttl, .n3 (max 10MB)
          </p>
        </div>
      </div>

      {/* Validation Error */}
      {validationError && (
        <div className="validation-error" role="alert">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{validationError}</span>
        </div>
      )}

      {/* File Metadata Preview */}
      {fileMetadata && fileMetadata.fileName && (
        <div className="file-metadata">
          <div className="file-metadata-header">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            <h3>Selected File</h3>
          </div>
          
          <div className="file-metadata-content">
            <div className="file-metadata-row">
              <span className="file-metadata-label">Name:</span>
              <span className="file-metadata-value">{fileMetadata.fileName}</span>
            </div>
            
            {fileMetadata.size && (
              <div className="file-metadata-row">
                <span className="file-metadata-label">Size:</span>
                <span className="file-metadata-value">{formatFileSize(fileMetadata.size)}</span>
              </div>
            )}
            
            {fileMetadata.type && (
              <div className="file-metadata-row">
                <span className="file-metadata-label">Type:</span>
                <span className="file-metadata-value">{fileMetadata.type}</span>
              </div>
            )}
          </div>
          
          <button
            className="clear-button"
            onClick={handleClear}
            disabled={disabled}
            aria-label="Clear selected file"
          >
            Clear File
          </button>
        </div>
      )}
    </div>
  );
}