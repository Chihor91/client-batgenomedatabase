import * as React from "react";
import { Box, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InfoPanel } from "@/components/Layout";

/**
 * FilterPanel - A reusable panel for filter/search controls
 *
 * Wraps InfoPanel and provides consistent layout for filter inputs with action buttons.
 *
 * @param {Object} props
 * @param {string} [props.title="Filters"] - Panel header text
 * @param {React.ReactNode} props.children - Filter input fields
 * @param {function} [props.onSearch] - Callback for search action button
 * @param {function} [props.onReset] - Callback for clear/reset button
 * @param {boolean} [props.showActions=true] - Whether to show action buttons
 */
export default function FilterPanel({
  title = "Filters",
  children,
  onSearch,
  onReset,
  showActions = true,
}) {
  return (
    <InfoPanel title={title}>
      {children}

      {/* Action Buttons */}
      {showActions && (onSearch || onReset) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            mt: 2,
          }}
        >
          {onReset && (
            <Button variant="outlined" size="small" onClick={onReset}>
              Clear
            </Button>
          )}
          {onSearch && (
            <IconButton
              onClick={onSearch}
              aria-label="search"
              sx={{
                backgroundColor: "#2e7d32",
                color: "white",
                "&:hover": {
                  backgroundColor: "#1b5e20",
                },
              }}
            >
              <SearchIcon />
            </IconButton>
          )}
        </Box>
      )}
    </InfoPanel>
  );
}
