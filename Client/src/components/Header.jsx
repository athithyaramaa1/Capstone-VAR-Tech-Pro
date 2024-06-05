import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ComputerIcon from "@mui/icons-material/Computer";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import { KeyboardArrowDown } from "@mui/icons-material";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("Home");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search query:", searchQuery);
  };

  const handleMenuClick = (page) => {
    setSelectedTab(page);
    console.log("Navigating to:", page);
  };

  const handleLogin = () => {
    toast.success("Logged in Successfully!");
  };

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    console.log("Logout Successful");
    toast.success("Logged out Successfully!");
  };

  const handleDashboard = () => {
    navigate(`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`);
    console.log(auth?.user)
  };
  
  //For the dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "black" }} className="container">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ComputerIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            className="logo"
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            VAR TECH PRO
          </Typography>

          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              component={Link}
              to="/home"
              sx={{
                my: 2,
                color: selectedTab === "Home" ? "white" : "inherit",
                borderBottom:
                  selectedTab === "Home" ? "2px solid white" : "none",
                display: "block",
                transition: "color 0.3s, background-color 0.3s",
                "&:hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleMenuClick("Home")}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/category"
              sx={{
                my: 2,
                color: selectedTab === "Category" ? "white" : "inherit",
                borderBottom:
                  selectedTab === "Category" ? "2px solid white" : "none",
                display: "block",
                transition: "color 0.3s, background-color 0.3s",
                "&:hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleMenuClick("Category")}
            >
              Category
            </Button>
          </Box>
          <Box
            sx={{
              flexGrow: 4,
              display: "flex",
              alignItems: "center",
              marginRight: { xs: "50px", md: "100px" },
              borderRadius: { xs: "10px", md: "4px" },
            }}
          >
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchInputChange}
              fullWidth
              size="small"
              sx={{
                bgcolor: "white",
                color: "black",
                borderRadius: "inherit",
              }}
            />
            <IconButton
              aria-label="search"
              onClick={handleSearchSubmit}
              sx={{
                p: 1,
                bgcolor: "orange",
                "&:hover": { bgcolor: "lightcoral" },
              }}
            >
              <SearchIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {auth.user ? (
              <>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{color: "Yellow"}}
                  >
                    {auth?.user?.name}
                    <KeyboardArrowDown
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                  </Button>
                  
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  onClick={handleLogin}
                  sx={{
                    mx: 1,
                    color: "white",
                    transition: "color 0.3s, background-color 0.3s",
                    "&:hover": {
                      color: "black",
                      backgroundColor: "white",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    mx: 1,
                    color: "white",
                    transition: "color 0.3s, background-color 0.3s",
                    "&:hover": {
                      color: "black",
                      backgroundColor: "white",
                    },
                  }}
                >
                  Signup
                </Button>
              </>
            )}
            <Button
              component={Link}
              to="/cart"
              sx={{
                mx: 1,
                color: "white",
                transition: "color 0.3s, background-color 0.3s",
                "&:hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
            >
              Cart(0)
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClick("Home");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClick("Category");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Category</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings"></Tooltip>
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
              <MenuItem
                onClick={() => {
                  handleMenuClick("Profile");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClick("Account");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClick("Dashboard");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              {auth.user && (
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
