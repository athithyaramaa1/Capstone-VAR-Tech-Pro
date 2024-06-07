import Layout from "./../../components/Layout";
import UserBioCard from "./UserCard";
import Sidebar from "./UserSideMenu";

const Dashboard = () => {
  return (
    <Layout title={"Dashboard - VAR Tech"}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "220px", padding: "20px" }}>
          <h1>User Dashboard</h1>
          <UserBioCard />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
