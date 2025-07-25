import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Event as EventIcon,
  Group as GroupIcon,
  LocalHospital as HealthIcon,
  Book as JournalIcon,
  Notifications as NotificationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications } = useNotifications();

  const quickActions = [
    {
      title: 'Communities',
      description: 'Join and interact with support communities',
      icon: <GroupIcon />,
      path: '/communities',
    },
    {
      title: 'Events',
      description: 'View and register for upcoming events',
      icon: <EventIcon />,
      path: '/events',
    },
    {
      title: 'Health',
      description: 'Track your health metrics and medications',
      icon: <HealthIcon />,
      path: '/health',
    },
    {
      title: 'Journal',
      description: 'Record your thoughts and progress',
      icon: <JournalIcon />,
      path: '/journal',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user?.name || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening today
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action) => (
                <Grid item xs={12} sm={6} key={action.title}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {action.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {action.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => navigate(action.path)}
                      >
                        Go to {action.title}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NotificationIcon />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Recent Notifications
              </Typography>
            </Box>
            <List>
              {notifications?.length > 0 ? (
                notifications.slice(0, 5).map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem>
                      <ListItemText
                        primary={notification.title}
                        secondary={notification.message}
                      />
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No new notifications"
                    secondary="You're all caught up!"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;