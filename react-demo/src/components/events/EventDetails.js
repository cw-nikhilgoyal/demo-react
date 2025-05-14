import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
} from '@mui/material';
import { LocationOn, Event, ArrowBack, VideoLibrary } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import productsData from '../../data/products.json';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = productsData.products.find(p => p.id === parseInt(id));

  // Add error handling for invalid event
  if (!event) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          Event not found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Back to Events
        </Button>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const mapContainerStyle = {
    width: '100%',
    height: '300px',  // Increased height to match image
    borderRadius: '8px'
  };

  const defaultCenter = {
    lat: 20.5937,  // Default coordinates for India
    lng: 78.9629
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}> {/* Changed to lg for wider layout */}
      <IconButton 
        onClick={() => navigate(-1)} 
        sx={{ mb: 2 }}
      >
        <ArrowBack />
      </IconButton>
      
      {/* Top Section with Image and Map */}
      <Box sx={{ 
        display: 'flex', 
        gap: 3,
        flexDirection: { xs: 'column', md: 'row' },
        mb: 3
      }}>
        {/* Left: Main Image */}
        <Box sx={{ flex: '1.5' }}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={event.image}
              alt={event.title}
              sx={{ 
                objectFit: 'cover',
                width: '100%'
              }}
            />
          </Card>
        </Box>

        {/* Right: Map */}
        <Box sx={{ flex: '1' }}>
          <Card variant="outlined">
            <LoadScript googleMapsApiKey="">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={13}
                options={{
                  disableDefaultUI: true,
                  zoomControl: true,
                  styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }]
                }}
              >
                <Marker position={defaultCenter} title={event.location} />
              </GoogleMap>
            </LoadScript>
          </Card>
        </Box>
      </Box>

      {/* Details Card */}
      <Card>
        <CardContent>
          {/* Title and Price Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
            <Box>
              <Chip 
                label={event.category}
                color="primary"
                size="small"
                sx={{ mb: 1 }}
              />
              <Typography variant="h4" gutterBottom>
                {event.title}
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              ${event.price}
            </Typography>
          </Box>

          {/* Date and Location Section */}
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Event sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography color="text.secondary">
                {formatDate(event.date)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography color="text.secondary">
                {event.location}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-start',
            gap: 2,
            mt: 3,
            borderTop: '1px solid #eee',
            pt: 3
          }}>
            <Button 
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 4
              }}
            >
              Register
            </Button>
            <Button 
              variant="outlined"
              startIcon={<VideoLibrary />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3
              }}
            >
              View Video
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetails;
