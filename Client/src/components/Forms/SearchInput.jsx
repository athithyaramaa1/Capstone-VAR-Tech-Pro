import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setValues({ ...values, keyword: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_APP_API}api/v1/product/search/${
      values.keyword
    }`;
    console.log(values);
    try {
      const { data } = await axios.get(apiUrl);
      setValues({ ...values, results: data });
      console.log("Search results:", data);
      navigate("/search");
    } catch (error) {
      console.error("Error in searching products:", error);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          flexGrow: 4,
          display: "flex",
          alignItems: "center",
          marginRight: { xs: "50px", md: "100px" },
          borderRadius: { xs: "10px", md: "4px" },
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          value={values.keyword}
          onChange={handleSearch}
          fullWidth
          size="small"
          sx={{
            bgcolor: "white",
            color: "black",
            borderRadius: "inherit",
          }}
        />
        <IconButton
          aria-label="search"
          sx={{
            p: 1,
            bgcolor: "orange",
            "&:hover": { bgcolor: "lightcoral" },
          }}
          onClick={handleSubmit}
        >
          <SearchIcon sx={{ color: "black" }} />
        </IconButton>
      </Box>
    </>
  );
};

export default SearchInput;
