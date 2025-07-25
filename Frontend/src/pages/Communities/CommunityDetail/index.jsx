import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Group as GroupIcon,
  Event as EventIcon,
  Message as MessageIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import axios from '../../../utils/axios';
import { API_ROUTES } from '../../../utils/constants';

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    location: '',
  });

  useEffect(() => {
    fetchCommunityDetails();
  }, [id]);

  const fetchCommunityDetails = async () => {
    try {
      const [communityRes, membersRes, eventsRes] = await Promise.all([
        axios.get(`${API_ROUTES.COMMUNITIES.DETAIL}${id}/`),
        axios.get(`${API_ROUTES.COMMUNITIES.MEMBERS}${id}/`),
        axios.get(`${API_ROUTES.COMMUNITIES.EVENTS}${id}/`),
      ]);

      setCommunity(communityRes.data);
      setMembers(membersRes.data);
      setEvents(eventsRes.data);
    } catch (err) {
      setError('Failed to fetch community details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCreateEvent = async () => {
    try {
      const response = await axios.post(`${API_ROUTES.COMMUNITIES.EVENTS}${id}/`, newEvent);
      setEvents([...events, response.data]);
      setOpenEventDialog(false);
      setNewEvent({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
      });
    } catch (err) {
      setError('Failed to create event. Please try again.');
    }
  };

  const handleJoinCommunity = async () => {
    try {
      await axios.post(`${API_ROUTES.COMMUNITIES.JOIN}${id}/`);
      fetchCommunityDetails();
    } catch (err) {
      setError('Failed to join community. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {community.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
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
                label={`${members.length} members`}
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip
                icon={<EventIcon />}
                label={`${events.length} events`}
                size="small"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {!members.some(member => member.id === user.id) && (
              <Button
                variant="contained"
                startIcon={<GroupIcon />}
                onClick={handleJoinCommunity}
              >
                Join Community
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Members" />
          <Tab label="Events" />
          <Tab label="Discussions" />
        </Tabs>

        {activeTab === 0 && (
          <List>
            {members.map((member, index) => (
              <React.Fragment key={member.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={member.profile_photo} alt={member.name}>
                      {member.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.name}
                    secondary={member.role}
                  />
                </ListItem>
                {index < members.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}

        {activeTab === 1 && (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenEventDialog(true)}
              >
                Create Event
              </Button>
            </Box>
            <Grid container spacing={3}>
              {events.map((event) => (
                <Grid item xs={12} md={6} key={event.id}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {event.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        <strong>Date:</strong> {new Date(event.start_time).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Time:</strong> {new Date(event.start_time).toLocaleTimeString()} - {new Date(event.end_time).toLocaleTimeString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Location:</strong> {event.location}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      View Details
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {activeTab === 2 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <MessageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Discussions coming soon!
            </Typography>
          </Box>
        )}
      </Paper>

      <Dialog open={openEventDialog} onClose={() => setOpenEventDialog(false)}>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Start Time"
              type="datetime-local"
              value={newEvent.start_time}
              onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="End Time"
              type="datetime-local"
              value={newEvent.end_time}
              onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEventDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateEvent} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CommunityDetail; 