const logBuffer: string[] = [];
const MAX_LOGS = 100;

const originalLog = console.log;
const originalError = console.error;

console.log = (...args: any[]) => {
    const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
    logBuffer.push(`[LOG] ${new Date().toISOString()}: ${message}`);
    if (logBuffer.length > MAX_LOGS) logBuffer.shift();
    originalLog(...args);
};

console.error = (...args: any[]) => {
    const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
    logBuffer.push(`[ERROR] ${new Date().toISOString()}: ${message}`);
    if (logBuffer.length > MAX_LOGS) logBuffer.shift();
    originalError(...args);
};

export const getLogs = () => logBuffer;
