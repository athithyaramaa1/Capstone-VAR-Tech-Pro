import Layout from './../../components/Layout';
import AdminBioCard from './AdminDetails';
import Sidebar from './Sidebar';
const AdminDashboard = () => {
  return (
    <Layout title={`Admin - VAR Tech Pro`}>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: '220px', padding: '20px' }}>
          <h1>Admin Dashboard</h1>
          <AdminBioCard />
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard;
