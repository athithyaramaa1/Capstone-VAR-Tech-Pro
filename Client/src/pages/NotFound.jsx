import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const NotFound = () => {
  return (
    <Layout title={"Not Found!"}>
        
      <div className='page-not-found'>
        <h1 className='four-four'>404</h1>
        <h2 className='notfound'>PAGE NOT FOUND!!!</h2>
        <Link to="/home" className='page-nf-button'>Home</Link>
      </div>
    </Layout>
  )
}

export default NotFound
