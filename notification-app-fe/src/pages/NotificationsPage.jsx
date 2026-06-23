
import { useState, useEffect } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import logger from "../utils/logger"; 

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [viewedIds, setViewedIds] = useState([]);

 
  const limit = 10; 
  const { notifications, totalPages, loading, error } = useNotifications(limit, page, filter);

  
  useEffect(() => {
    logger.info("NotificationsPage mounted");
    const storedViewed = JSON.parse(localStorage.getItem('viewed_notifications') || '[]');
    setViewedIds(storedViewed);
  }, []);

  const handleMarkAsRead = (id) => {
    if (!viewedIds.includes(id)) {
      const updatedViewed = [...viewedIds, id];
      setViewedIds(updatedViewed);
      localStorage.setItem('viewed_notifications', JSON.stringify(updatedViewed));
      logger.info(`Notification marked as read`, { notificationId: id });
    }
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setPage(1); //
    logger.info("Filter changed", { newFilter });
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
    logger.info("Page changed", { newPage });
  };

 
  const unreadCount = notifications?.filter(n => !viewedIds.includes(n.ID)).length || 0;

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsIcon sx={{ fontSize: 28 }} />
        </Badge>
        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ marginBottom: 3 }}>
        <NotificationFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {}
      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">Failed to load notifications: {error}</Alert>
      )}

      {!loading && !error && notifications?.length === 0 && (
        <Alert severity="info">No notifications found for this filter.</Alert>
      )}

      {}
      {!loading && !error && notifications?.length > 0 && (
        <Stack spacing={1.5}>
          {notifications.map((n) => {
            const isUnread = !viewedIds.includes(n.ID);
            return (
              <Box key={n.ID} onClick={() => handleMarkAsRead(n.ID)}>
                <NotificationCard notification={n} isUnread={isUnread} />
              </Box>
            );
          })}
        </Stack>
      )}

      {!loading && !error && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}