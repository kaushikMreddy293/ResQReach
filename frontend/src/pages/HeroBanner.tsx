import React from 'react';
import { Box, Typography } from '@mui/material';
import rescueIcon from '../assets/icons/rescue-icon.png'

import HeroBannerImage from '../assets/images/banner.jpg';

const HeroBanner: React.FC = () => (
  <Box sx={{ mt: { lg: '100px', xs: '70px' }, ml: { sm: '20px' } }} position="relative" p="20px">
    <Typography>
      <img src={rescueIcon} alt="rescue Icon" style={{marginBottom: '20px'}}/>
    </Typography>
    <Typography>
    <span style={{ color: 'darkblue', fontWeight: '300', fontSize: '50px' }}>Welcome</span>
    </Typography>
    <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px' }, fontFamily: 'Pacifico, cursive', }} mb="23px" mt="30px">
      Beyond a mere <br />
      application
    </Typography>
    <Typography fontSize="16px" fontFamily="Alegreya" lineHeight="25px">
      Aimed at enhancing disaster response and preparedness through active community engagement <br />
      empowers users to report emergencies, access preparedness resources, facilitates sharing of <br />
      leftover food from restaurants, playing a crucial role in crisis management
    </Typography>
    <Typography fontWeight={600} color="#0000ff" sx={{ opacity: '0.1', display: { lg: 'block', xs: 'none' }, fontSize: '200px' }}>
    <span style={{ color: '#2596be', fontWeight: '600' }}>ResQ</span>
      <span style={{ color: '#000000', fontWeight: '400' }}>Reach</span>
    </Typography>
    <img src={HeroBannerImage} style={{zIndex: -1, height:'150%', opacity: '1.1'}} alt="hero-banner" className="hero-banner-img" />
  </Box>
);

export default HeroBanner;
