import Layout from "../components/Layout";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card sx={{ maxWidth: 600, height: "273px", marginTop: "80px" }}>
              <CardMedia
                component="img"
                image="/images/privacy.jpg"
                alt="About VAR TECH PRO"
              />
            </Card>
          </Grid>
          <Grid item md={6} xs={15}>
            <Card style={{ marginTop: "35px" }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                  At VAR TECH PRO, we value your privacy and are committed to
                  protecting your personal information. We collect only the
                  necessary information required to provide our services and
                  ensure the security of your data.{" "}
                </Typography>
                <Typography variant="body1" paragraph>
                  Any personal information you provide to us will be kept
                  confidential and used solely for the purpose of fulfilling
                  your requests and improving our services. We do not share your
                  information with third parties unless required by law or with
                  your explicit consent. Your trust is important to us, and we
                  take all necessary measures to safeguard your privacy.
                </Typography>
                <Typography variant="body1" paragraph>
                  Thank you for choosing VAR TECH PRO.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Policy;
