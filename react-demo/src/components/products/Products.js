import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
} from '@mui/material';
import { LocationOn, Event, GridView, ViewList, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/products.json';

const Products = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isGridView, setIsGridView] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  const categories = ['All', 'Festival', 'Conference', 'Playground'];

  useEffect(() => {
    const allEvents = productsData.products;
    setEvents(allEvents);
    setFilteredEvents(allEvents);
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => event.category === category);
      setFilteredEvents(filtered);
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      minHeight: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4,
          px: { xs: 2, sm: 3, md: 4 },
          width: '100%'
        }}
      >
        <AppBar 
          position="static" 
          sx={{ 
            background: 'linear-gradient(to right, #ffffff, #f5f5f5)',
            mb: 3, 
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            width: '100%'
          }}
        >
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between', 
              py: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  sx={{
                    px: 3,
                    py: 1,
                    color: selectedCategory === category ? theme.palette.primary.main : '#666',
                    position: 'relative',
                    fontWeight: selectedCategory === category ? 600 : 400,
                    background: selectedCategory === category ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(25, 118, 210, 0.12)',
                      transform: 'translateY(-2px)'
                    },
                    '&::after': selectedCategory === category ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '20%',
                      width: '60%',
                      height: '2px',
                      background: theme.palette.primary.main,
                      borderRadius: '2px'
                    } : {}
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      background: selectedCategory === category 
                        ? 'linear-gradient(45deg, #1976d2, #2196f3)'
                        : 'none',
                      WebkitBackgroundClip: selectedCategory === category ? 'text' : 'none',
                      WebkitTextFillColor: selectedCategory === category ? 'transparent' : 'inherit',
                      fontWeight: 'inherit'
                    }}
                  >
                    {category}
                  </Typography>
                </Button>
              ))}
            </Box>
            
            <IconButton 
              onClick={() => setIsGridView(!isGridView)} 
              sx={{
                background: 'rgba(25, 118, 210, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(25, 118, 210, 0.15)',
                  transform: 'rotate(180deg)'
                }
              }}
            >
              {isGridView ? <ViewList /> : <GridView />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {isGridView ? (
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            {filteredEvents.map(event => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={event.id}>
                <Card 
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    maxWidth: 400,
                    mx: 'auto',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip 
                      label={event.category}
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography gutterBottom variant="h6" component="h2">
                      {event.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Event sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(event.date)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.location}
                      </Typography>
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mt: 'auto'
                    }}>
                      <Typography 
                        variant="h6" 
                        color="primary" 
                        sx={{ fontWeight: 'bold' }}
                      >
                        ${event.price}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        endIcon={<ArrowForward />}
                        onClick={() => handleEventClick(event.id)}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none'
                        }}
                      >
                        Tickets & Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            maxWidth: '100%'
          }}>
            {filteredEvents.map(event => (
              <Card 
                key={event.id} 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  height: { xs: 'auto', sm: '200px' }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    width: { xs: '100%', sm: 300 },
                    height: { xs: 200, sm: '100%' }
                  }}
                  image={event.image}
                  alt={event.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, flex: 1 }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Box>
                        <Chip 
                          label={event.category}
                          color="primary"
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h6">{event.title}</Typography>
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-end',
                        gap: 1
                      }}>
                        <Typography variant="h6" color="primary">${event.price}</Typography>
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<ArrowForward />}
                          onClick={() => handleEventClick(event.id)}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none'
                          }}
                        >
                          Tickets & Details
                        </Button>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Event sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(event.date)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Products;
