import Layout from "../components/Layout";
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const About = () => {
  return (
    <Layout title={"About Us - VAR TECH PRO"}>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card sx={{ maxWidth: 600 }}>
              <CardMedia
                component="img"
                image="/images/about.jpeg"
                alt="About VAR TECH PRO"
              />
            </Card>
          </Grid>
          <Grid item md={6} xs={15}>
            <Card style={{marginTop:"30px"}}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  About VAR TECH PRO
                </Typography>
                <Typography variant="body1" paragraph>
                  VAR TECH PRO is a leading provider of computer and laptop services, sales, and hardware solutions. Founded in 2022 by Athithya Ramaa, our company has established branches in India, Singapore, and Dubai.
                </Typography>
                <Typography variant="body1" paragraph>
                  With over 19,000 satisfied customers and an average rating of 4.5 out of 5, we take pride in delivering top-notch service at affordable prices. Our motto is to provide the best service to all customers while maintaining high standards of quality and swift delivery.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default About;
