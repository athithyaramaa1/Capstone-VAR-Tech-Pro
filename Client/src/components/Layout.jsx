import Header from "./Header";
import Footer from "./Footer";
//React Helmet for SEO
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "100vh" }}>{children}</main>
      <ToastContainer />
      <Footer />
    </div>
  );
};

//Adding Search Engine Optimization using React Helmet

Layout.defaultProps = {
  title: "VAR TECH PRO",
  description:
    "Cheap Laptops, affordable repair services, best laptop service shop in India",
  keywords:
    "VAR Tech Pro, Laptop, Laptops, Service Center, Laptop Service Center, Chennai Laptop Service Center, VAR Tech Pro Laptop, VAR Tech Pro, Best Laptop sales, Laptop sales",
  author: "V Athithya Ramaa",
};

export default Layout;