import * as React from "react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Layout from "../../components/Layout";
import Sidebar from "./Sidebar";
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
import { Divider } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProds = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/product/get-products`
      );
      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
        toast.success("Products retrieved successfully!");
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
    getAllProds();
  }, []);

  return (
    <Layout title="Admin - Products">
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "70px", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Products Page</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "80px 40px",
              rowGap: "20px",
            }}
          >
            {products.map((product) => (
              <div key={product.id} style={{ width: "100%" }}>
                <RouterLink
                  to={`${product.slug}`}
                  style={{ textDecoration: "none" }}
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
                        href="#product-card"
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
                </RouterLink>
              </div>
            ))}
            <Divider />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
