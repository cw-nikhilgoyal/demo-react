import React, { useState } from 'react';
import { Container, Typography, Paper, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, TextField, FormControl, Select, MenuItem, InputLabel, InputAdornment } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/products.json';

const EventStats = () => {
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const events = productsData.products;

  // Calculate statistics
  const totalEvents = events.length;
  const categoryCounts = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  const avgPrice = (events.reduce((sum, event) => sum + event.price, 0) / totalEvents).toFixed(2);

  const locationCounts = events.reduce((acc, event) => {
    acc[event.location] = (acc[event.location] || 0) + 1;
    return acc;
  }, {});

  const topLocations = Object.entries(locationCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Calculate weekly event counts
  const getWeekNumber = (date) => {
    const d = new Date(date);
    const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
    const days = Math.floor((d - firstDayOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
  };

  const weeklyEventCounts = events.reduce((acc, event) => {
    const date = new Date(event.date);
    const weekNum = getWeekNumber(date);
    const weekKey = `Week ${weekNum}`;
    acc[weekKey] = (acc[weekKey] || 0) + 1;
    return acc;
  }, {});

  const weeklyData = Object.entries(weeklyEventCounts)
    .map(([week, count]) => ({
      week,
      count
    }))
    .sort((a, b) => a.week.localeCompare(b.week));

  // Sort events by date for upcoming events
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter(event => new Date(event.date) >= new Date())
    .slice(0, 5);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter events based on search and category
  const filteredEvents = [...events]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  const displayedEvents = filteredEvents.slice(0, displayCount);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 4 
      }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
          sx={{
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          Back to Events
        </Button>
        <Typography variant="h4" sx={{ flex: 1, textAlign: 'center' }}>
          Event Statistics & Analytics
        </Typography>
      </Box>

      {/* Bar Graph Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Weekly Event Distribution</Typography>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="week"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="count" 
                fill="#1976d2"
                name="Number of Events"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Event List Section with Filters */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <Typography variant="h6">All Events</Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            flex: 1,
            maxWidth: { xs: '100%', md: '60%' },
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="All">All Categories</MenuItem>
                <MenuItem value="Festival">Festival</MenuItem>
                <MenuItem value="Conference">Conference</MenuItem>
                <MenuItem value="Playground">Playground</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Event Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedEvents.map((event) => (
                <TableRow 
                  key={event.id}
                  sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                >
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Chip 
                      label={event.category}
                      size="small"
                      color="primary"
                      sx={{ borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell>${event.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {displayCount < filteredEvents.length && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setDisplayCount(prev => prev + 5)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 4
              }}
            >
              Load More Events ({filteredEvents.length - displayCount} remaining)
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default EventStats;
