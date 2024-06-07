import Layout from "../../components/Layout"
import Sidebar from "./UserSideMenu"

const Orders = () => {
  return (
    <Layout title={"Your Orders - VAR Tech"}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "220px", padding: "20px" }}>
          <h1>Your Orders</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
