// stage1_priority.js

// TODO: Ensure this points to your actual logger file inside the middleware folder
const logger = require('./logging-middleware/logger');
const API_URL = "http://4.224.186.213/evaluation-service/notifications";

const weights = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
};

async function fetchAndSortNotifications() {
    try {
        const myToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqYW5ha2FyaXR2aWsuMjMuY3NlQGFuaXRzLmVkdS5pbiIsImV4cCI6MTc4MjE5ODc5NiwiaWF0IjoxNzgyMTk3ODk2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTMyZDI3MDAtOTE2NC00ZWJiLTlhNDAtZWZlZmExNTQzMmMwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiamFnYW5hIHJpdHZpayIsInN1YiI6Ijk2Y2NkYWU0LTE4OWQtNDg5MS1iMmE2LTYyYjM2MTc3ODVhYiJ9LCJlbWFpbCI6ImphbmFrYXJpdHZpay4yMy5jc2VAYW5pdHMuZWR1LmluIiwibmFtZSI6ImphZ2FuYSByaXR2aWsiLCJyb2xsTm8iOiJhMjMxMjY1MTAwODAiLCJhY2Nlc3NDb2RlIjoiTVRxeGFyIiwiY2xpZW50SUQiOiI5NmNjZGFlNC0xODlkLTQ4OTEtYjJhNi02MmIzNjE3Nzg1YWIiLCJjbGllbnRTZWNyZXQiOiJ1YnlYc0RaZkRkdXBmbnBKIn0.kROUOJuUv9xenUEzOt9v545T9N7bgpVl6wQz0AWX3NY";
        const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${myToken}`, 
        "Content-Type": "application/json"
    }
});
        
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorBody}`);
        }
        
        const data = await response.json();
        const notifications = data.notifications;

        
        const sorted = notifications.sort((a, b) => {
            if (weights[a.Type] !== weights[b.Type]) {
                return weights[b.Type] - weights[a.Type];
            }
            
            const timeA = new Date(a.Timestamp).getTime();
            const timeB = new Date(b.Timestamp).getTime();
            return timeB - timeA;
        });

        const top10 = sorted.slice(0, 10);

        logger.info("Top 10 Priority Notifications:", top10);

    } catch (error) {
        logger.error("Failed to fetch notifications", error);
    }
}

fetchAndSortNotifications();