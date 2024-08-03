import React, { useState, useEffect } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import ComputerIcon from "@mui/icons-material/Computer";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import { KeyboardArrowDown } from "@mui/icons-material";
import SearchInput from "./Forms/SearchInput";
import useCategory from "../hooks/useCategory";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Home");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const categories = useCategory().categories;
  const [anchorElCustom, setAnchorElCustom] = useState(null);
  const openCustom = Boolean(anchorElCustom);

  const handleClickCustom = (event) => {
    setAnchorElCustom(event.currentTarget);
  };

  const handleCloseCustom = () => {
    setAnchorElCustom(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    navigate(`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`);
    console.log(auth?.user);
  };

  // For the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (anchorElCustom && !anchorElCustom.contains(event.target)) {
        setAnchorElCustom(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [anchorElCustom]);

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
            <div>
              <Button
                component={Link}
                to="/categories"
                id="customized-button"
                aria-controls={openCustom ? "customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openCustom ? "true" : undefined}
                onClick={handleClickCustom}
                sx={{
                  m: 2,
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
              >
                Category
              </Button>
              <Menu
                component={Link}
                id="customized-menu"
                anchorEl={anchorElCustom}
                open={openCustom}
                onClose={handleCloseCustom}
                MenuListProps={{
                  "aria-labelledby": "customized-button",
                }}
              >
                {categories.map((category, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={`/category/${category.slug}`}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Box>

          {/* Search Box moved to global state */}
          <SearchInput />

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
                    sx={{ color: "Yellow" }}
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
