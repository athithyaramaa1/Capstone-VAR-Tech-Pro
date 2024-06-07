import Layout from "../../components/Layout";
import Sidebar from "./Sidebar";

const CreateProducts = () => {
  return (
    <Layout title={`Admin - Create Products`}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "220px", padding: "20px" }}>
          <h1>Create Products</h1>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
