import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Box,
  Divider,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useNotifications } from '../../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationDrawer = ({ open, onClose }) => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
  };

  const handleDelete = async (notificationId) => {
    await deleteNotification(notificationId);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 360,
          maxWidth: '100%',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Notifications</Typography>
        {notifications.length > 0 && (
          <Button
            size="small"
            onClick={markAllAsRead}
            startIcon={<CheckCircleIcon />}
          >
            Mark all as read
          </Button>
        )}
      </Box>
      <Divider />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {notifications.length === 0 ? (
          <ListItem>
            <ListItemText
              primary="No notifications"
              secondary="You're all caught up!"
            />
          </ListItem>
        ) : (
          notifications.map((notification) => (
            <ListItem
              key={notification.id}
              alignItems="flex-start"
              sx={{
                bgcolor: notification.read ? 'inherit' : 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
              }}
              secondaryAction={
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="mark as read"
                    onClick={() => handleMarkAsRead(notification.id)}
                    disabled={notification.read}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemIcon>
                <NotificationsIcon color={notification.read ? 'disabled' : 'primary'} />
              </ListItemIcon>
              <ListItemText
                primary={notification.title}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {notification.message}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                    >
                      {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                      })}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </Drawer>
  );
};

export default NotificationDrawer; 