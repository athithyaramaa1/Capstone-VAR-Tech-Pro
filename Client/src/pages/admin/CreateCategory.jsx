import Layout from "../../components/Layout";
import Sidebar from "./Sidebar";

const CreateCategory = () => {
  return (
    <Layout title={`Admin - Create Category`}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "220px", padding: "20px" }}>
          <h1>Create Category</h1>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
