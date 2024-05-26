import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Nmit from "../assets/nmit.png";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Overlay />
            <Grid container spacing={0}>
                {/* <Grid item xs={12} md={6}>
                    <img src={Nmit} alt="nmit" style={{ width: '100%' }} />
                </Grid> */}
                <Grid item xs={12} md={6}>  
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                            Шинэ Монгол Технологийн Дээд Сургууль
                        </StyledTitle>
                        <StyledText>
                            Дипломын баримт бичгийн мэдээллийн сан
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Нэвтрэх
                                </LightPurpleButton>
                            </StyledLink>
                            {/* <StyledText>
                                Админ эрх нээх үү?{' '}
                                <Link to="/Adminregister" style={{color:"#8b0000"}}>
                                    Бүртгүүлэх
                                </Link>
                            </StyledText> */}
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${Nmit});
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: rgba(0, 0, 0, 0.5);

`;


const StyledPaper = styled.div`
  padding: 15px;
  height: 100vh;
  width: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 5px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #000000;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  margin-top: 10px;
  margin-bottom: 25px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
