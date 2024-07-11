import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) {
      getSingleProduct();
    }
  }, [params?.slug]);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/product/get-product/${
          params.slug
        }`
      );
      setProduct(data?.product);

      if (data?.product?._id && data?.product?.category?._id) {
        console.log(
          "Calling getSimilarProducts with pid:",
          data.product._id,
          "cid:",
          data.product.category._id
        );
        getSimilarProducts(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.log("Error in getting single product", error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }api/v1/product/related-product/${pid}/${cid}`
      );
      console.log("Related products data:", data); // Check the received data
      setRelatedProducts(data); // Assuming data is the array of products
    } catch (err) {
      console.log("Error in getting similar products", err);
    }
  };

  console.log("Product:", product);
  console.log("Related Products:", relatedProducts);
  return (
    <Layout
      title="Product Details"
      style={{ backgroundColor: "#f0f0f0", color: "black" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "20px",
        }}
      >
        {product && (
          <div
            style={{
              width: "40%",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              padding: "20px",
              marginRight: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <img
              style={{
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
              src={`${
                import.meta.env.VITE_APP_API
              }api/v1/product/product-photo/${product._id}`}
              alt={product.name}
            />
          </div>
        )}

        <div
          style={{
            width: "60%",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category?.name}</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h3>Similar Products:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {relatedProducts.map((product) => (
            <Card
              key={product._id}
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
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
