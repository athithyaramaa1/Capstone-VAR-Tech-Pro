import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Star from '@mui/icons-material/Star';
import TwoSidedLayout from '../components/TwoSidedLayout';
import '../blocks/Hero.css'
import { useNavigate } from 'react-router-dom';


export default function HeroLeft08() {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/home')
  }
  const handleLearn = () => {
    navigate('/about')
  }
  return (
    <TwoSidedLayout>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        className="vartechpro"
      >
        VAR TECH PRO
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
      
Elevating India, Dubai, & Singapore with Unrivaled Computer & Laptop Repair Expertise, Guaranteeing Swift Solutions and Exceptional Service Delivery.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          my: 2,
          '& > *': { flex: 'auto' },
        }}
      >
        <Button size="lg" variant="outlined" color="neutral" onClick={handleLearn}>
          Learn More
        </Button>
        <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />} onClick={handleNavigate}>
          Get Started
        </Button>
      </Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          columnGap: 4.5,
          rowGap: 1.5,
          textAlign: 'center',
          alignSelf: 'stretch',
          '& > *': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            alignItems: 'center',
          },
          [theme.breakpoints.up(834)]: {
            textAlign: 'left',
            '& > *': {
              alignItems: 'initial',
            },
          },
        })}
      >
        <div>
          <Typography
            fontSize="xl4"
            fontWeight="lg"
            endDecorator={<Star fontSize="xl4" sx={{ color: 'warning.300' }} />}
          >
            4.9
          </Typography>
          <Typography textColor="text.secondary">
            Rated by <b>5k</b> people on trustpilot.com
          </Typography>
        </div>
        <div>
          <Typography fontSize="xl4" fontWeight="lg">
            13.5k+
          </Typography>
          <Typography textColor="text.secondary">
            Happy customers from all around India 
          </Typography>
        </div>
      </Box>
    </TwoSidedLayout>
  );
}