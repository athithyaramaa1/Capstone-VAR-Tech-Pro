import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}api/v1/category/categories`
      );
      console.log("Categories API response:", response.data); // Log response data
      setCategories(response.data?.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error); // Log error for debugging
      setCategories([]); // Set categories to empty array on error
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  console.log("Categories in useCategory hook:", categories); // Log categories state

  return { categories };
}
