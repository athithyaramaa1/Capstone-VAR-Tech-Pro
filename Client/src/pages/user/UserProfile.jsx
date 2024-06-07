import Layout from "../../components/Layout"
import Sidebar from "./UserSideMenu"
import UserBioCard from './UserCard';

const UserProfile = () => {
  return (
    <Layout title={"Your Profile - VAR Tech"}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "220px", padding: "20px" }}>
          <UserBioCard />
        </div>
      </div>
    </Layout>
  )
}

export default UserProfile
