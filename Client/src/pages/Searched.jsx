import React from "react";
import Layout from "../components/Layout";
import { useSearch } from "../context/search";
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

const Searched = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={`Search results`}>
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Search results</h1>
          <p>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
            rowGap: "20px",
          }}
        >
          {values?.results.map((product) => (
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
    </Layout>
  );
};

export default Searched;
