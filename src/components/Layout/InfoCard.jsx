import * as React from "react";
import { Box, Typography } from "@mui/material";

/**
 * InfoCard - Smart card component that handles text automatically
 *
 * Pass strings directly and they'll be wrapped in Typography automatically.
 * Pass React elements (JSX) and they'll be rendered as-is.
 *
 * @param {Object} props
 * @param {React.ReactNode|string} props.children - Card content (string or JSX)
 * @param {'status'|'content'|'help'} props.variant - Card style (default: 'content')
 * @param {string} props.color - Left border color for 'status' variant
 * @param {string} props.textVariant - Typography variant when children is a string (default: 'body1')
 * @param {Object} props.textSx - Additional sx for Typography when children is a string
 * @param {Object} props.sx - Additional sx for the card Box
 */
export default function InfoCard({
  children,
  variant = "content",
  color,
  textVariant = "body1",
  textSx = {},
  sx = {},
}) {
  // Base styles for all cards
  const baseStyles = {
    backgroundColor: "#EAF1E4",
    borderRadius: 1,
    padding: 2,
  };

  // Variant-specific styles
  const variantStyles = {
    status: {
      ...baseStyles,
      borderLeft: `4px solid ${color || "#757575"}`,
    },
    content: {
      ...baseStyles,
      border: "1px solid #e0e0e0",
    },
    help: {
      backgroundColor: "transparent",
      padding: 0,
    },
  };

  // Auto-wrap strings in Typography, pass through JSX as-is
  const content =
    typeof children === "string" ? (
      <Typography variant={textVariant} sx={textSx}>
        {children}
      </Typography>
    ) : (
      children
    );

  return <Box sx={{ ...variantStyles[variant], ...sx }}>{content}</Box>;
}
