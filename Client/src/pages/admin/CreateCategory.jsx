import * as React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Divider } from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import CategoryForm from "../../components/Forms/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}api/v1/category/create-category`,
        { name }
      );
      if (data && data.category) {
        toast.success(`${data.category.name} created successfully!`);
        getAllCategories();
        setName("");
      } else {
        toast.error("Error in creating category");
      }
    } catch (err) {
      console.error("Error in submitting category", err);
      toast.error("Error in submitting category");
    }
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!selected) {
        toast.error("No category selected for update");
        return;
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_API}api/v1/category/update-category/${
          selected._id
        }`,
        { name: updatedName }
      );
      if (data) {
        toast.success("Category updated successfully!");
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategories();
      } else {
        toast.error("Error in updating category");
      }
    } catch (err) {
      console.error("Error in updating category", err);
      toast.error("Error in updating category");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_API}api/v1/category/delete-category/${id}`
      );
      if (data) {
        toast.success("Category deleted successfully!");
        getAllCategories();
      } else {
        toast.error("Error in deleting category");
      }
    } catch (err) {
      console.error("Error in deleting category", err);
      toast.error("Error in deleting category");
    }
  };

  return (
    <Layout title="Admin - Create Category">
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "70px", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Manage Categories</h1>
          <CategoryForm
            onSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
          <Divider sx={{ my: 2 }} />
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 700, fontSize: "30px" }}>
                      Category
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ fontWeight: 700, fontSize: "30px" }}
                    >
                      <p style={{ margin: 10, marginRight: "13%" }}>Actions</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((ele) => (
                      <TableRow
                        key={ele._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            fontSize: "1.25rem",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {ele.name}
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ "& > :not(style)": { m: 1, mr: 4 } }}>
                            <Fab
                              color="secondary"
                              aria-label="edit"
                              onClick={() => {
                                setOpen(true);
                                setUpdatedName(ele.name);
                                setSelected(ele);
                              }}
                            >
                              <EditIcon />
                            </Fab>
                            <Fab
                              color="primary"
                              aria-label="delete"
                              onClick={() => {
                                handleDelete(ele._id);
                              }}
                            >
                              <DeleteIcon />
                            </Fab>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No categories available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <React.Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog>
                <DialogTitle>Update Category</DialogTitle>
                <DialogContent>
                  Fill in the updated name of the category.
                </DialogContent>
                <div>
                  <Stack spacing={2}>
                    <CategoryForm
                      onSubmit={handleUpdate}
                      value={updatedName}
                      setValue={setUpdatedName}
                    />
                  </Stack>
                </div>
              </ModalDialog>
            </Modal>
          </React.Fragment>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
