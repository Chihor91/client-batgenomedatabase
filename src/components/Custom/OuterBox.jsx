import { Box, styled } from "@mui/material";

const OuterBox = styled(Box)(({ theme }) => ({
  // --- Base Styles (Applied to all screen sizes) ---
  paddingTop: theme.spacing(5),
  width: "calc(100% - 100px)",
  minHeight: "100vh",
  overflowY: "auto",

  // --- Responsive Margin Left ---
  // Start with the 'xs' value (or smallest/default)
  marginLeft: theme.spacing(10), // xs: 10

  // sm breakpoint and up
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(7), // sm: 7
  },

  // md breakpoint and up
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(5), // md: 5
  },
}));

export default OuterBox;
