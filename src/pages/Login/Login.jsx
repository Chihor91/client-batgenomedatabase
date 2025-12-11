// Library Imports
import { useContext, useEffect } from "react";

// Component Imports
import AuthContext from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Images from "@/common/images";
import { useTheme } from "@/components/ui/theme-provider";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";

// Asset Imports
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

function Login() {
  let { loginUser, logoutUser, loading, error } = useContext(AuthContext);
  let navigate = useNavigate();
  const theme = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get(axios.defaults.baseURL + "user/isloggedin/")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        localStorage.getItem("authTokens") &&
          localStorage.removeItem("authTokens");
      });
  }, [navigate]);

  const handleLogin = (e) => {
    loginUser(e, { username, password });
  };

  const form = useForm({});

  const { watch, register, handleSubmit, formState } = form;
  const { errors } = formState;
  const watchForm = watch(form);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
      }}
    >
      {/* Form Section */}
      <Box
        sx={{
          width: { xs: "80%", md: "40%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ p: 4, width: "100%", maxWidth: 400 }}>
          <img
            width={100}
            src={
              theme.theme === "light"
                ? Images.ic_gradient_caves
                : Images.ic_DM_cave
            }
            alt="caves-logo"
            style={{ display: "block", margin: "auto", padding: "10px" }}
          />
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
            Unlock the Archive
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                id="username"
                type="text"
                name="username"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="password"
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography
                  variant="body2"
                  sx={{ color: "error.main", textAlign: "center" }}
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !username || !password}
              >
                {loading ? "Loading..." : "Dig in"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>

      {/* Background Section */}
      <Box
        sx={{
          width: { xs: "90%", md: "50%" },
          height: { xs: "auto", md: "85%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
          padding: 4,
          backgroundImage: `url(/images/homebackground.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 4,
          color: "white",
          m: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          IMCavesPH
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 400,
            textAlign: "left",
            "& a": {
              fontWeight: 700,
              textDecoration: "underline",
              color: "inherit",
            },
          }}
        >
          The central semantic database for the{" "}
          <a
            href="https://www.nicercaves.site"
            target="_blank"
            rel="noopener noreferrer"
          >
            NICER CAVES
          </a>{" "}
          culture collection program.
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
