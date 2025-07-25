import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { API_ROUTES } from '../../utils/constants';

const Communities = () => {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(API_ROUTES.COMMUNITIES.LIST);
      setCommunities(response.data);
    } catch (err) {
      setError('Failed to fetch communities. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCreateCommunity = async () => {
    try {
      const response = await axios.post(API_ROUTES.COMMUNITIES.CREATE, newCommunity);
      setCommunities([...communities, response.data]);
      setOpenDialog(false);
      setNewCommunity({ name: '', description: '', category: '' });
    } catch (err) {
      setError('Failed to create community. Please try again.');
    }
  };

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Communities
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Create Community
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search communities..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredCommunities.map((community) => (
          <Grid item xs={12} sm={6} md={4} key={community.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {community.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {community.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={community.category}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<GroupIcon />}
                    label={`${community.member_count} members`}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<EventIcon />}
                    label={`${community.event_count} events`}
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/communities/${community.id}`)}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/communities/${community.id}/join`)}
                >
                  Join Community
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Community</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Community Name"
              value={newCommunity.name}
              onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={newCommunity.description}
              onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Category"
              value={newCommunity.category}
              onChange={(e) => setNewCommunity({ ...newCommunity, category: e.target.value })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateCommunity} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Communities; 