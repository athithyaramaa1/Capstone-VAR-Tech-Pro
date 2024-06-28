import * as React from "react";
import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Container, Divider, Grid } from "@mui/material";
import { useAuth } from "../context/auth";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import IconButton from "@mui/joy/IconButton";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import Sheet from "@mui/joy/Sheet";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import { Checkbox } from "@mui/material";

const HomePage = ({ showToast }) => {
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (showToast && location.state && location.state.showToast) {
      toast.success("Logged in successfully!");
    }
  }, [showToast, location.state]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/product/get-products`
      );
      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
        toast.success("Products retrieved successfully!");
      } else {
        console.error("Unexpected response format:", data);
        toast.error("Error in getting Products");
      }
    } catch (error) {
      console.error("Error in getting products", error);
      toast.error("Error in getting Products");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/category/categories`
      );
      if (data && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        console.error("Unexpected response format:", data);
        toast.error("Error in getting Categories");
      }
    } catch (err) {
      console.error("Error in getting categories", err);
      toast.error("Error in getting Categories");
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <Layout title={"VAR Tech Pro - Best Offers!"}>
      <div style={{ display: "flex" }}>
        <Sheet
          className="Sidebar"
          sx={{
            position: { xs: "fixed", md: "sticky" },
            transform: {
              xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
              md: "none",
            },
            transition: "transform 0.4s, width 0.4s",
            zIndex: 10000,
            height: "100dvh",
            width: "var(--Sidebar-width)",
            top: 0,
            p: 2,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRight: "1px solid",
            borderColor: "divider",
          }}
        >
          <GlobalStyles
            styles={(theme) => ({
              ":root": {
                "--Sidebar-width": "220px",
                [theme.breakpoints.up("lg")]: {
                  "--Sidebar-width": "240px",
                },
              },
            })}
          />
          <Box
            className="Sidebar-overlay"
            sx={{
              position: "fixed",
              zIndex: 9998,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              opacity: "var(--SideNavigation-slideIn)",
              backgroundColor: "var(--joy-palette-background-backdrop)",
              transition: "opacity 0.4s",
              transform: {
                xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
                lg: "translateX(-100%)",
              },
            }}
          />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton variant="soft" color="primary" size="sm">
              <BrightnessAutoRoundedIcon />
            </IconButton>
            <Typography level="title-lg">VAR Tech Pro</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography level="title-lg">Filter By Category</Typography>
          </Box>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {categories.map((category) => (
              <div key={category._id}>
                <Checkbox
                  key={category._id}
                  checked={checked.includes(category._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setChecked([...checked, category._id]);
                    } else {
                      setChecked(checked.filter((id) => id !== category._id));
                    }
                  }}
                />
                <label>{category.name}</label>
              </div>
            ))}
          </div>
          <Box
            sx={{
              minHeight: 0,
              overflow: "hidden auto",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              [`& .${listItemButtonClasses.root}`]: {
                gap: 1.5,
              },
            }}
          ></Box>
          <Divider />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar
              variant="outlined"
              size="sm"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography level="title-sm">Athithya Ramaa</Typography>
              <Typography level="body-xs">admin@gmail.com</Typography>
            </Box>
            <IconButton size="sm" variant="plain" color="neutral">
              <LogoutRoundedIcon />
            </IconButton>
          </Box>
        </Sheet>
        <div style={{ flex: 1, marginLeft: "70px", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Home</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
              rowGap: "20px",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{ width: "100%", marginBottom: "40px" }}
              >
                <Card
                  sx={{ maxWidth: "100%", boxShadow: "lg", height: "100%" }}
                >
                  <CardOverflow>
                    <AspectRatio ratio="4/3" sx={{ minWidth: 200 }}>
                      <img
                        src={`${
                          import.meta.env.VITE_APP_API
                        }api/v1/product/product-photo/${product._id}`}
                        loading="lazy"
                        alt={product.name}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </AspectRatio>
                  </CardOverflow>

                  <CardContent>
                    <Typography level="body-xs" sx={{ mb: 1 }}>
                      {product.name}
                    </Typography>
                    <Link
                      fontWeight="md"
                      color="neutral"
                      textColor="text.primary"
                      overlay
                      endDecorator={<ArrowOutwardIcon />}
                      sx={{ mb: 1 }}
                    >
                      {product.description}
                    </Link>
                    <Typography
                      sx={{ mt: 1, fontWeight: "xl" }}
                      endDecorator={
                        <Chip
                          component="span"
                          size="sm"
                          variant="soft"
                          color="success"
                        >
                          Lowest price
                        </Chip>
                      }
                    >
                      2,900 THB
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      (Limited <b>quantity</b> left in stock!)
                    </Typography>
                  </CardContent>
                  <CardOverflow
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "16px",
                    }}
                  >
                    <Button variant="solid" color="danger" size="lg">
                      Add to cart
                    </Button>
                  </CardOverflow>
                </Card>
              </div>
            ))}
            <Divider />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
