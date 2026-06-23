import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Badge, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { fetchNotifications } from '../api/notifications';
import logger from '../utils/logger';

export default function PriorityPage() {
  const [notifications, setNotifications] = useState([]);
  const [viewedIds, setViewedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States (Mapped directly to API query parameters)
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('All');

  useEffect(() => {
    logger.info("PriorityPage filter parameters changed", { limit, page, type });
    
    const storedViewed = JSON.parse(localStorage.getItem('viewed_notifications') || '[]');
    setViewedIds(storedViewed);

    const loadPriorityData = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications(limit, page, type);
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPriorityData();
  }, [limit, page, type]);

  const handleMarkAsRead = (id) => {
    if (!viewedIds.includes(id)) {
      const updatedViewed = [...viewedIds, id];
      setViewedIds(updatedViewed);
      localStorage.setItem('viewed_notifications', JSON.stringify(updatedViewed));
      logger.info(`Priority notification marked as read`, { notificationId: id });
    }
  };

  if (error) return <Alert severity="error" sx={{ mt: 4 }}>Error loading priority inbox: {error}</Alert>;

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Priority Inbox
      </Typography>

      {/* Control Selectors Bar */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="limit-label">Show Top 'N'</InputLabel>
          <Select
            labelId="limit-label"
            value={limit}
            label="Show Top 'N'"
            onChange={(e) => { setLimit(e.target.value); setPage(1); }}
          >
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel id="type-label">Filter by Type</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Filter by Type"
            onChange={(e) => { setType(e.target.value); setPage(1); }}
          >
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="Placement">Placements Only</MenuItem>
            <MenuItem value="Result">Results Only</MenuItem>
            <MenuItem value="Event">Events Only</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Data Render */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
      ) : (
        <Stack spacing={2}>
          {notifications.map((item) => {
            const isUnread = !viewedIds.includes(item.ID);
            return (
              <Card 
                key={item.ID}
                onClick={() => handleMarkAsRead(item.ID)}
                sx={{ 
                  cursor: 'pointer',
                  transition: '0.2s',
                  borderLeft: isUnread ? '6px solid #e91e63' : '6px solid #e0e0e0',
                  backgroundColor: isUnread ? '#fff5f8' : '#ffffff',
                  '&:hover': { boxShadow: 3 }
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Badge color="secondary" variant="dot" invisible={!isUnread}>
                      <StarIcon sx={{ color: '#e91e63' }} />
                    </Badge>
                    <Box sx={{ flexGrow: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" color="secondary" sx={{ fontWeight: 'bold' }}>
                          {item.Type}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.Timestamp}
                        </Typography>
                      </Stack>
                      <Typography variant="body1" sx={{ mt: 0.5, fontWeight: isUnread ? '500' : 'normal' }}>
                        {item.Message}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
          
          {/* Pagination Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
            <Pagination 
              count={5} 
              page={page} 
              onChange={(e, value) => setPage(value)} 
              color="primary" 
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
}