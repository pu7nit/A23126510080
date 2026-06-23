import React from 'react';
import { Card, CardContent, Stack, Typography, Badge, Box } from '@mui/material';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

export const NotificationCard = ({ notification, isUnread }) => {
  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: '0.2s',
        borderLeft: isUnread ? '6px solid #1976d2' : '6px solid #e0e0e0',
        backgroundColor: isUnread ? '#f4f9ff' : '#ffffff',
        '&:hover': { boxShadow: 3 }
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Badge color="error" variant="dot" invisible={!isUnread}>
            <NotificationImportantIcon color={notification.Type === 'Placement' ? 'primary' : 'action'} />
          </Badge>
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                {notification.Type}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.Timestamp}
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ mt: 0.5, fontWeight: isUnread ? '500' : 'normal' }}>
              {notification.Message}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};