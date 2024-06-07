import Layout from '../../components/Layout'
import Sidebar from './Sidebar'

const Users = () => {
  return (
    <Layout title={`Admin - Users`}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "220px", padding: "20px" }}>
          <h1>Users Panel</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Users