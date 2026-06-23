import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import logger from "../utils/logger";

export function useNotifications(limit = 10, page = 1, filter = "All") {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      logger.info("Hook initiating fetch", { limit, page, filter });

      try {
        const data = await fetchNotifications(limit, page, filter);
        
        if (isMounted) {
          // BULLETPROOF FIX: Safely check if data exists before looking for .notifications
          const validData = Array.isArray(data) ? data : (data?.notifications || []);
          setNotifications(validData);
          setTotalPages(5); 
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          logger.error("Hook encountered error during fetch", err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [limit, page, filter]);

  return { notifications, totalPages, loading, error };
}