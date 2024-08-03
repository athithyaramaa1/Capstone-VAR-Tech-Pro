import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";

const IndividualCategory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();

  console.log("Params:", params);

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/product/category-products/${
          params.slug
        }`
      );
      console.log("Data by category:", data);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);
  return (
    <Layout title={"Category Details"}>
      <h1 style={{ textAlign: "center" }}>Category - {category?.name}</h1>
      <h1 style={{ textAlign: "center" }}>{products.length} results found</h1>
      <>
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
              <Card sx={{ maxWidth: "100%", boxShadow: "lg", height: "100%" }}>
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
      </>
    </Layout>
  );
};

export default IndividualCategory;
