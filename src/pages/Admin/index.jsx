import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import OuterBox from "@/components/Custom/OuterBox.jsx";
import { Grid, Button } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import AuthContext from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MUIThemeProvider from "@/components/Custom/MUIThemeProvider";
import { useSnackbar, SnackbarProvider } from "notistack";
import { PageHeader } from "@/components/Layout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogsTableTest from "./LogsTableTest";
import AccountsTableTest from "./AccountsTableTest";
import AddAccountDialog from "./AddAccountDialog";

function AdminContent() {
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const [logsData, setLogsData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [isLogsLoading, setIsLogsLoading] = useState(true);
  const [isAccountsLoading, setIsAccountsLoading] = useState(true);
  const [addAccountOpen, setAddAccountOpen] = useState(false);

  // Fetch logs data
  useEffect(() => {
    setIsLogsLoading(true);
    axios
      .get("/user/logs/")
      .then((res) => {
        setLogsData(res.data);
        setIsLogsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
        enqueueSnackbar("Failed to fetch activity logs", { variant: "error" });
        setIsLogsLoading(false);
      });
  }, []);

  // Fetch accounts data
  const fetchAccounts = () => {
    setIsAccountsLoading(true);
    axios
      .get("/user/accounts/")
      .then((res) => {
        setAccountsData(res.data);
        setIsAccountsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        enqueueSnackbar("Failed to fetch accounts", { variant: "error" });
        setIsAccountsLoading(false);
      });
  };

  useEffect(() => {
    fetchAccounts();
  }, [addAccountOpen]);

  const handleAccountDeleted = () => {
    fetchAccounts();
  };

  const handleAddAccount = () => {
    setAddAccountOpen(true);
  };

  return (
    <OuterBox>
      <Grid container direction="column" sx={{ minHeight: "100vh" }}>
        <PageHeader title="Admin">
          <Button
            variant="contained"
            size="small"
            onClick={handleAddAccount}
            aria-label="Add Account"
            sx={{
              alignSelf: "center",
              mt: 0,
              display: "flex",
              gap: 1,
            }}
          >
            <PersonAddIcon fontSize="small" />
            Add Account
          </Button>
        </PageHeader>

        {/* Main Content Area */}
        <Grid
          item
          container
          sx={{
            flexGrow: 1,
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            flexWrap: "nowrap",
            overflow: "visible",
            px: { xs: 1, md: 2 },
          }}
        >
          {/* Left: Activity Log Table */}
          <LogsTableTest data={logsData} isLoading={isLogsLoading} />

          {/* Right: Accounts Table */}
          <AccountsTableTest
            data={accountsData}
            isLoading={isAccountsLoading}
            onAccountDeleted={handleAccountDeleted}
          />
        </Grid>
      </Grid>

      {/* Add Account Dialog */}
      <AddAccountDialog
        open={addAccountOpen}
        onClose={() => setAddAccountOpen(false)}
      />
    </OuterBox>
  );
}

export default function AdminPage() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MUIThemeProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AuthProvider>
            <AdminContent />
          </AuthProvider>
        </ThemeProvider>
      </MUIThemeProvider>
    </SnackbarProvider>
  );
}
