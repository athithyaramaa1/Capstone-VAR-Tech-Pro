import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import axios from "axios";
import Stack from "@mui/joy/Stack";
import Autocomplete from "@mui/joy/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import { Divider } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const CreateProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [shipping, setShipping] = useState("");

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

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
    getAllCategories();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category._id || category);
      productData.append("photo", photo);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}api/v1/product/create-product`,
        productData
      );

      if (data) {
        console.log("Product Successfully created!!");
        toast.success("Product Successfully created!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Error in creating product");
      }
    } catch (err) {
      console.log("Error in creating product", err);
      toast.error("Error in creating product");
    }
  };

  return (
    <Layout title={`Admin - Create Products`}>
      <div
        style={{ display: "flex", backgroundColor: "black", color: "white" }}
      >
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "70px", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Manage Products</h1>
          <Stack spacing={3}>
            <Autocomplete
              size="lg"
              options={categories}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => setCategory(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Product's Category"
                  label="Select a Category"
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& input::placeholder": {
                        color: "black",
                      },
                      color: "white",
                    },
                  }}
                  sx={{
                    width: "400px",
                    height: "50px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "black",
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    key={option._id}
                    sx={{ color: "black", backgroundColor: "gray" }}
                  />
                ))
              }
            />

            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
              }}
            />

            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
              }}
            />

            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
              }}
            />

            <TextField
              label="Quantity"
              variant="outlined"
              type="number"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
              }}
            />

            <TextField
              label="Shipping"
              variant="outlined"
              fullWidth
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
              }}
            />

            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              variant="outlined"
              color="neutral"
              startDecorator={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
              }
              sx={{ color: "grey" }}
            >
              {photo ? photo.name : "Upload Photo"}
              <VisuallyHiddenInput
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                }}
                hidden
              />
            </Button>

            {photo && (
              <Card variant="outlined" sx={{ width: 320, margin: "0 auto" }}>
                <CardOverflow>
                  <AspectRatio ratio="2">
                    <img
                      src={URL.createObjectURL(photo)}
                      loading="lazy"
                      alt="Product-Image"
                      style={{ height: "200px" }}
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography level="title-md">{photo?.name}</Typography>
                </CardContent>
              </Card>
            )}

            <Box textAlign="center">
              <Button variant="solid" color="primary" onClick={handleClick}>
                Create Product
              </Button>
            </Box>
          </Stack>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
