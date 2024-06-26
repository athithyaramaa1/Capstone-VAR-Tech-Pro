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
import { useNavigate, useParams } from "react-router-dom";

const UpdateProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

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

  const getSingleCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/product/get-product/${
          params.slug
        }`
      );
      console.log("Single Category Data", data);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setCategory(data.product.category);
      setShipping(data.product.shipping);
    } catch (err) {
      console.log("Error in getting single category", err);
    }
  };

  useEffect(() => {
    getSingleCategory();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category._id || category);
      photo && productData.append("photo", photo);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_API}api/v1/product/update-product/${id}`,
        productData
      );

      if (data) {
        console.log("Product Successfully updated!!");
        toast.success("Product Successfully updated!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Error in updating product");
      }
    } catch (err) {
      console.log("Error in updating product", err);
      toast.error("Error in updating product");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const deleteUrl = `${
        import.meta.env.VITE_APP_API
      }api/v1/product/delete-product/${id}`;
      console.log("Delete URL:", deleteUrl); // Check the constructed URL

      const { data } = await axios.delete(deleteUrl);

      console.log("Delete Response:", data); // Log response from backend

      if (data.message === "Product deleted successfully") {
        console.log("Product Successfully deleted!!");
        toast.success("Product Successfully deleted!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Error in deleting product");
      }
    } catch (error) {
      console.error("Error message:", error); // Log detailed error message
      toast.error("Error in deleting product: " + error.message);
    }
  };

  return (
    <Layout title={`Admin - Update Products`}>
      <div
        style={{ display: "flex", backgroundColor: "black", color: "white" }}
      >
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "70px", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Update Product</h1>
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
                  value={category ? category.name : ""}
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
              value={shipping ? "Yes" : "No"}
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

            {photo ? (
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
            ) : (
              <CardOverflow>
                <AspectRatio ratio="4/3" sx={{ minWidth: 200 }}>
                  <img
                    src={`${
                      import.meta.env.VITE_APP_API
                    }api/v1/product/product-photo/${id}`}
                    loading="lazy"
                    alt={name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </AspectRatio>
              </CardOverflow>
            )}

            <Box textAlign="center">
              <Button variant="solid" color="primary" onClick={handleUpdate}>
                Update Product
              </Button>
            </Box>

            <Box textAlign="center">
              <Button variant="solid" color="danger" onClick={handleDelete}>
                Delete Product
              </Button>
            </Box>
          </Stack>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;
