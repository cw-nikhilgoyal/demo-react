import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { ArrowBack, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: '',
    description: '',
    startDate: '',
    endDate: '',
    email: '',
    phone: '',
    organiser: '',
    organiserDetails: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    country: 'India',
    latitude: '',
    longitude: '',
    speakerName: '',
    speakerDescription: '',
    imageUrl: '',
    videoUrl: '',
    ticketPrice: ''
  });
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create new event object
      const newEvent = {
        id: Date.now(), // Generate unique ID
        title: formData.title,
        date: formData.startDate,
        location: `${formData.city}, ${formData.state}`,
        category: formData.category,
        price: Number(formData.ticketPrice) || 0,
        image: formData.imageUrl,
        description: formData.description,
        // Add other fields as needed
      };

      // In a real application, you would make an API call here
      // For now, we'll simulate updating the JSON file
      console.log('New Event:', newEvent);
      
      // Show success dialog
      setOpenSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/products');
      }, 2000);

    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Create New Event</Typography>
      </Box>

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Basic Information Section */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  required
                  label="Event Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  required
                  label="Tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  select
                  required
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  fullWidth
                  defaultValue=""
                >
                  <MenuItem value="Festival">Festival</MenuItem>
                  <MenuItem value="Conference">Conference</MenuItem>
                  <MenuItem value="Playground">Playground</MenuItem>
                </TextField>
                <TextField
                  required
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Box>
            </Box>

            {/* Date and Time Section */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Date and Time</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    required
                    label="Start Date & Time"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    required
                    label="End Date & Time"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Contact Information */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Contact Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  required
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  fullWidth
                />
                <TextField
                  required
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  required
                  label="Organiser"
                  name="organiser"
                  value={formData.organiser}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Organiser Details"
                  name="organiserDetails"
                  value={formData.organiserDetails}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  fullWidth
                />
              </Box>
            </Box>

            {/* Location Details */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Location Details</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  required
                  label="Address Line 1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Address Line 2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  fullWidth
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    required
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    required
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    required
                    label="ZIP Code"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    required
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    fullWidth
                    defaultValue="India"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    required
                    label="Latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                  />
                  <TextField
                    required
                    label="Longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>

            {/* Speaker Information */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Speaker Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  required
                  label="Speaker Name"
                  name="speakerName"
                  value={formData.speakerName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  required
                  label="Speaker Description"
                  name="speakerDescription"
                  value={formData.speakerDescription}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
            </Box>

            {/* Media and Pricing */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Media and Pricing</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  required
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Video URL (Optional)"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Ticket Price (Optional)"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  fullWidth
                />
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Create Event
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h5">
            Congratulations!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography align="center">
            Your event has been created successfully!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
          >
            View All Events
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateEvent;
