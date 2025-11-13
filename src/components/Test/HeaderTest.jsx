import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import caveslogo from "../../assets/svg/ic_gradient_caves.svg";
import Images from "@/common/images";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { CssBaseline } from "@mui/material";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// ElevationScroll.propTypes = {
//   children: PropTypes.element,
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default function HeaderTest(props) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer + 1,
          })}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ width: 150 }}>
                {/* persistent brand: logo + label always shown together */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    overflow: "hidden",
                  }}
                >
                  <img
                    // src={Images.ic_gradient_caves}
                    src={caveslogo}
                    alt="caves-logo"
                    style={{
                      flex: "0 0 auto",
                      width: 28,
                      height: 28,
                      objectFit: "contain",
                    }}
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                      display: "flex", // always visible
                      flexShrink: 1, // allow text to shrink/ellipsis inside 150px
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".1rem",
                      color: "inherit",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "0.9rem",
                    }}
                  >
                    CAVES
                  </Typography>
                </Box>
              </Box>
              {/* centered title for small screens */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  textAlign: "center",
                  fontWeight: 700,
                  color: "inherit",
                }}
              >
                Ontology Visualizer
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {/* {pages.map((page) => (
                              <Button
                                  key={page}
                                  onClick={handleCloseNavMenu}
                                  sx={{ my: 2, color: 'white', display: 'block' }}
                              >
                                  {page}
                              </Button>
                              ))} */}
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Ontology Visualizer
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
