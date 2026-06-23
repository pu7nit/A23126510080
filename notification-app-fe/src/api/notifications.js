import logger from '../utils/logger';

const API_URL = "/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqYW5ha2FyaXR2aWsuMjMuY3NlQGFuaXRzLmVkdS5pbiIsImV4cCI6MTc4MjIwMTM2OCwiaWF0IjoxNzgyMjAwNDY4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGQ2M2RhMjMtMzg5MC00NTg5LTg3ODctMTg0OTM1ZGY0Yzk0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiamFnYW5hIHJpdHZpayIsInN1YiI6Ijk2Y2NkYWU0LTE4OWQtNDg5MS1iMmE2LTYyYjM2MTc3ODVhYiJ9LCJlbWFpbCI6ImphbmFrYXJpdHZpay4yMy5jc2VAYW5pdHMuZWR1LmluIiwibmFtZSI6ImphZ2FuYSByaXR2aWsiLCJyb2xsTm8iOiJhMjMxMjY1MTAwODAiLCJhY2Nlc3NDb2RlIjoiTVRxeGFyIiwiY2xpZW50SUQiOiI5NmNjZGFlNC0xODlkLTQ4OTEtYjJhNi02MmIzNjE3Nzg1YWIiLCJjbGllbnRTZWNyZXQiOiJ1YnlYc0RaZkRkdXBmbnBKIn0.NW5Y4m1aST4xmP3x2l7VC44XWqb657Gwh8MGePmmCY0"; 

export const fetchNotifications = async (limit, page, type) => {
    try {
        // Construct URL with Query Parameters
        const url = new URL(API_URL, window.location.origin);
        if (limit) url.searchParams.append('limit', limit);
        if (page) url.searchParams.append('page', page);
        if (type && type !== 'All') url.searchParams.append('notification_type', type);

        // Mandatory Logging Requirement
        logger.info("Initiating API fetch", { url: url.toString() });

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        logger.info("Successfully fetched data");
        
        return data; 

    } catch (error) {
        logger.error("API Fetch Failed", error.message);
        throw error;
    }
};