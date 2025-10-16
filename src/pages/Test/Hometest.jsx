import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderTest from "../../components/Test/HeaderTest.jsx";
import SidebarTest from "../../components/Test/SidebarTest.jsx";
import MainContent from "../../components/Test/MainContentTest.jsx";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { SnackbarProvider } from "notistack";

export default function Hometest() {
  return (
    // <Box sx={{ display: 'flex' }}>
    //   <CssBaseline />
    //   <HeaderTest />
    //   <SidebarTest />
    //   <MainContent />
    // </Box>
    <>
      <SnackbarProvider maxSnack={3}>
        <MUIThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
              {/* <CssBaseline /> */}
              {/* <div className="w-full h-full">
                <MainContent />
              </div> */}
              {/* <MainContent /> */}
              <Box sx={{ display: "flex", flexGrow: 1 }}>
                {/* <CssBaseline /> */}
                {/* <HeaderTest /> */}
                <MainContent />
              </Box>
            </AuthProvider>
          </ThemeProvider>
        </MUIThemeProvider>
      </SnackbarProvider>
    </>
  );
}
