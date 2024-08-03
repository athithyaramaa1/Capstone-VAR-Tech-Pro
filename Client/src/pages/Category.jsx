import Layout from "../components/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const Category = () => {
  const categories = useCategory().categories;

  return (
    <Layout title={"All Categories"}>
      <Box sx={{ maxWidth: 600, mx: "auto", px: 3 }}>
        <Typography variant="h4" gutterBottom>
          All Categories
        </Typography>
        <Divider />
        <Box sx={{ mt: 2 }}>
          {categories.map((category, index) => (
            <Button
              key={index}
              component={Link}
              to={`/category/${category.slug}`}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mb: 2 }}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Category;
