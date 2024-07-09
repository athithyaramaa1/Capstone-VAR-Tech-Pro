import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Box, Divider } from "@mui/material";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import IconButton from "@mui/joy/IconButton";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import Sheet from "@mui/joy/Sheet";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import Checkbox from "@mui/joy/Checkbox";
import { Prices } from "../components/prices";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
  "& .MuiButtonBase-root": {
    cursor: "pointer",
  },
}));

const HomePage = ({ showToast }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showToast && location.state?.showToast) {
      toast.success("Logged in successfully!");
    }
  }, [showToast, location.state]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/category/categories`
      );
      if (Array.isArray(data?.categories)) {
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

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/product/product-lists/${page}`
      );
      setLoading(false);
      setProducts(data.products);
      toast.success("Products retrieved successfully!");
    } catch (error) {
      console.error("Error in getting products", error);
      toast.error("Error in getting Products");
      setLoading(false);
    }
  };

  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/product/product-count`
      );
      if (data?.productCount) {
        setTotal(data.productCount);
      } else {
        console.error("Unexpected response format:", data);
        toast.error("Error in fetching product count");
      }
    } catch (err) {
      console.error("Error in fetching product count:", err);
      toast.error("Error in fetching product count");
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/product/product-lists/${page}`
      );
      setLoading(false);
      if (Array.isArray(data?.products)) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        toast.success("Products retrieved successfully!");
      } else {
        console.error("Unexpected response format:", data);
        toast.error("Error in getting Products");
      }
    } catch (error) {
      console.error("Error in getting products", error);
      toast.error("Error in getting Products");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  useEffect(() => {
    getAllCategories();
    getTotalCount();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    } else {
      getFilteredProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    console.log("Checked categories:", checked);
    console.log("Radio value:", radio);
  }, [checked, radio]);

  const filterByCategory = (isChecked, id) => {
    if (isChecked) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter((categoryId) => categoryId !== id));
    }
  };

  const handleRadioChange = (event) => {
    const value = JSON.parse(event.target.value);
    setRadio(value);
  };

  const getFilteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}api/v1/product/product-filters`,
        { checked, radio }
      );

      if (Array.isArray(data?.products)) {
        setProducts(data.products);
        toast.success("Filtered products retrieved successfully!");
      } else {
        console.error("Unexpected response format:", data);
        toast.error("Error in getting filtered Products");
      }
    } catch (error) {
      console.error("Error in getting filtered products", error);
      toast.error("Error in getting filtered Products");
    }
  };

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
            height: "105dvh",
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
              height: "102vh",
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
                  checked={checked.includes(category._id)}
                  onChange={(e) =>
                    filterByCategory(e.target.checked, category._id)
                  }
                  sx={{
                    color: "white",
                    "& .MuiSvgIcon-root": {
                      width: 28,
                      height: 28,
                    },
                  }}
                />{" "}
                <label style={{ fontWeight: 700, fontSize: "1.3rem" }}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
          <Divider />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography level="title-lg">Filter By Price</Typography>
          </Box>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <RadioGroup
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": {},
              }}
              onChange={handleRadioChange}
            >
              {Prices.map((price) => (
                <div
                  key={price._id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Radio
                    size="lg"
                    value={JSON.stringify(price.array)}
                    name="price"
                    sx={{
                      color: "white",
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                      },
                      "& .MuiRadio-root": {
                        "& .MuiSvgIcon-root": {
                          width: "1em",
                          height: "1em",
                        },
                        "& .Mui-checked": {
                          "&:after": {
                            content: '""',
                            display: "block",
                            position: "relative",
                            borderRadius: "50%",
                            width: "8px",
                            height: "8px",
                            backgroundColor: "blue",
                          },
                        },
                      },
                      marginTop: "3px",
                    }}
                  />
                  <Typography sx={{ ml: 1 }}>{price.name}</Typography>
                  <br />
                </div>
              ))}
            </RadioGroup>
          </div>
          <Divider />
          <ColorButton onClick={() => window.location.reload()}>
            Clear Filters
          </ColorButton>
          <Box
            sx={{
              minHeight: 0,
              overflow: "auto",
              flexGrow: 1,
              [`& .${listItemButtonClasses.root}`]: {
                borderRadius: "sm",
                whiteSpace: "nowrap",
                transition: "0.2s",
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              },
            }}
          />
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
          {/* <h1>{total}</h1> */}
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
                key={product._id}
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
                      {product.description.substring(0, 40)}...
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
                      ${product.price}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      (Limited <b>quantity</b> left in stock!)
                    </Typography>
                    <Button
                      onClick={() => navigate(`/product/${product.slug}`)}
                      sx={{ marginTop: "15px", marginBottom: "-20px" }}
                    >
                      View Product
                    </Button>
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
          <div style={{ margin: 3, padding: 2 }}>
            {products.length < total && (
              <ColorButton
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </ColorButton>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
