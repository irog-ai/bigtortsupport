import AWS from 'aws-sdk';
import log from 'loglevel';

// Configure AWS SDK with environment variables
AWS.config.update({
  region: import.meta.env.VITE_AWS_REGION,
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
});

const cloudwatchlogs = new AWS.CloudWatchLogs();

function sendLogToCloudWatch(message, level) {
  const params = {
    logGroupName: import.meta.env.VITE_AWS_LOG_GROUP,
    logStreamName: import.meta.env.VITE_AWS_LOG_STREAM,
    logEvents: [
      {
        message: JSON.stringify({ level, message, timestamp: new Date() }),
        timestamp: Date.now(),
      },
    ],
  };

  cloudwatchlogs.putLogEvents(params, (err) => {
    if (err) console.error('Error sending logs:', err);
  });
}

const originalFactory = log.methodFactory;

log.methodFactory = (methodName, logLevel) => {
  const rawMethod = originalFactory(methodName, logLevel);
  return (message) => {
    rawMethod(message);
    sendLogToCloudWatch(message, methodName);
  };
};

log.setLevel('INFO'); // Apply the overrides

export default log;