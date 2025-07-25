import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
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
  Event as EventIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import axios from '../../../utils/axios';
import { API_ROUTES } from '../../../utils/constants';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [participants, setParticipants] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);
  const [registrationNote, setRegistrationNote] = useState('');

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const [eventRes, participantsRes] = await Promise.all([
        axios.get(`${API_ROUTES.EVENTS.DETAIL}${id}/`),
        axios.get(`${API_ROUTES.EVENTS.PARTICIPANTS}${id}/`),
      ]);

      setEvent(eventRes.data);
      setParticipants(participantsRes.data);
      setIsRegistered(participantsRes.data.some(p => p.id === user.id));
    } catch (err) {
      setError('Failed to fetch event details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${API_ROUTES.EVENTS.REGISTER}${id}/`, {
        note: registrationNote,
      });
      setOpenRegistrationDialog(false);
      setRegistrationNote('');
      fetchEventDetails();
    } catch (err) {
      setError('Failed to register for the event. Please try again.');
    }
  };

  const handleCancelRegistration = async () => {
    try {
      await axios.post(`${API_ROUTES.EVENTS.CANCEL_REGISTRATION}${id}/`);
      fetchEventDetails();
    } catch (err) {
      setError('Failed to cancel registration. Please try again.');
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
              {event.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {event.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip
                icon={<CalendarIcon />}
                label={new Date(event.start_time).toLocaleDateString()}
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip
                icon={<TimeIcon />}
                label={`${new Date(event.start_time).toLocaleTimeString()} - ${new Date(event.end_time).toLocaleTimeString()}`}
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip
                icon={<LocationIcon />}
                label={event.location}
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip
                icon={<GroupIcon />}
                label={`${participants.length} participants`}
                size="small"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {!isRegistered ? (
              <Button
                variant="contained"
                startIcon={<EventIcon />}
                onClick={() => setOpenRegistrationDialog(true)}
              >
                Register for Event
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelRegistration}
              >
                Cancel Registration
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Participants
        </Typography>
        <List>
          {participants.map((participant, index) => (
            <React.Fragment key={participant.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={participant.profile_photo} alt={participant.name}>
                    {participant.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={participant.name}
                  secondary={participant.registration_note}
                />
              </ListItem>
              {index < participants.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog open={openRegistrationDialog} onClose={() => setOpenRegistrationDialog(false)}>
        <DialogTitle>Register for Event</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Registration Note (Optional)"
              value={registrationNote}
              onChange={(e) => setRegistrationNote(e.target.value)}
              margin="normal"
              multiline
              rows={3}
              placeholder="Add any notes or special requirements for your registration"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRegistrationDialog(false)}>Cancel</Button>
          <Button onClick={handleRegister} variant="contained">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventDetail; 