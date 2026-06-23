// notification-app-fe/src/utils/logger.js

const logger = {
    info: (message, data = "") => {
        const timestamp = new Date().toISOString();
        console.log(`[INFO] [${timestamp}] ${message}`, data);
    },
    error: (message, error = "") => {
        const timestamp = new Date().toISOString();
        console.error(`[ERROR] [${timestamp}] ${message}`, error);
    }
};

export default logger;