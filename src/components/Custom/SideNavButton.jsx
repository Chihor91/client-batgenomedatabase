import React from "react";
import { useTheme } from "@/components/ui/theme-provider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SideNavItem({ icon: Icon, label, onClick, isActive }) {
  const { theme } = useTheme();
  console.log("Current theme in SideNavItem:", theme.theme);

  return (
    <Button
      onClick={onClick}
      variant="text"
      color="inherit"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 70,
        width: 80,
        mx: "auto",
        p: 1,
        textTransform: "none",

        // Add active state styling
        ...(isActive && {
          borderRadius: "8px",
          backgroundColor:
            theme === "light"
              ? "rgba(255, 255, 255, 0.89)"
              : "rgba(90, 90, 90, 0.78)",
          px: 1.5,
        }),

        // Smooth transition
        transition: "all 0.3s ease",
      }}
    >
      <Icon fontSize="medium" />
      <Typography variant="caption" sx={{ mt: 0.5 }}>
        {label}
      </Typography>
    </Button>
  );
}
