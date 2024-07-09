import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

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
    } catch (error) {
      console.log("Error in getting single product", error);
    }
  };

  return (
    <Layout
      title={`Product Details`}
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
            src={`${import.meta.env.VITE_APP_API}api/v1/product/product-photo/${
              product._id
            }`}
            alt={product.name}
          />
        </div>

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
        }}
      >
        <h3>Similar Products:</h3>
      </div>
    </Layout>
  );
};

export default ProductDetails;