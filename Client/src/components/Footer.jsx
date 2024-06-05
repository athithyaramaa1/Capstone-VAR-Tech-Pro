import { Container, Grid, Typography, Link, Divider } from "@mui/material";
import { Instagram, LinkedIn, GitHub } from "@mui/icons-material";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { NavLink } from "react-router-dom";
import About from "../pages/About";
import Policy from "../pages/Policy";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} md={3}>
            <div className="section">
              <Typography variant="h4" className="heading glow-text">
                <span style={{ fontSize: "0.9em", fontWeight: "700"}}>
                  VAR TECH PRO
                </span>
              </Typography>
              <Typography
                variant="subtitle1"
                className="rainbow-text-loop"
                style={{ fontStyle: "italic", padding:"6px" }}
              >
                Empowering the tech world
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <div className="section">
              <Typography variant="h6" className="heading">
                Products
              </Typography>
              <Link href="#" className="link orange-link">
                Desktops
              </Link>
              <Link href="#" className="link orange-link">
                Laptops
              </Link>
              <Link href="#" className="link orange-link">
                Computer Hardwares
              </Link>
              <Link href="#" className="link orange-link">
                Pendrives
              </Link>
            </div>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <div className="section">
              <Typography variant="h6" className="heading">
                Services
              </Typography>
              <Link href="#" className="link orange-link">
                Laptop Service
              </Link>
              <Link href="#" className="link orange-link">
                Computer Service
              </Link>
              <Link href="#" className="link orange-link">
                Battery, Storage, etc
              </Link>
              <Link href="#" className="link orange-link">
                Help
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="section">
              <Typography variant="h6" className="heading">
                Contact
              </Typography>
              <Typography>
                <i className="fas fa-home mr-3 "></i> <span> Chennai, IN </span>
              </Typography>
              <Typography>
                <i className="fas fa-envelope mr-3"></i>{" "}
                <span>vartechpro@gmail.com</span>
              </Typography>
              <Typography>
                <i className="fas fa-phone mr-3"></i>{" "}
                <span>+ 91 99625 81115</span>
              </Typography>
              <Typography>
                <i className="fas fa-print mr-3"></i> <span>+ 01 29992923</span>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={7} className="copyright">
            <Typography align="center" variant="body2">
              © 2024 Copyright :
              <Link href="/" className="link orange-link">
                Var Tech Pro
              </Link>
              <br />
              All rights reserved
              
            </Typography>

            <NavLink to="/about" element={<About />}>
                About                
            </NavLink>
                |  
            <NavLink to="/policy" element={<Policy />}>
                Privacy Policy            
            </NavLink>
          </Grid>
          
          <Grid item xs={12} md={5} className="social-icons">
            <a href="" className="social-button">
              <Instagram />
            </a>
            <a href="" className="social-button">
              <LinkedIn />
            </a>
            <a href="" className="social-button">
              <GitHub />
            </a>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
