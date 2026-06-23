// logging-middleware/logger.js

const logger = {
    info: (message, data = "") => {
        const timestamp = new Date().toISOString();
        // Writing to standard output formatted as a middleware log
        process.stdout.write(`[INFO] [${timestamp}] ${message} \n${JSON.stringify(data, null, 2)}\n`);
    },
    error: (message, error = "") => {
        const timestamp = new Date().toISOString();
        process.stderr.write(`[ERROR] [${timestamp}] ${message} \n${error}\n`);
    }
};

module.exports = logger;