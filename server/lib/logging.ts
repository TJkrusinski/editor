type LogLevel = 'info' | 'warn' | 'error';

const log = (level: LogLevel, message: string) => {
  let color = '';

  switch(level) {
    case 'info':
      color = '\x1b[32m';
      break;
    case 'warn':
      color = '\x1b[33m';
      break;
    case 'error':
      color = '\x1b[31m';
      break;
    default:
      color = '\x1b[37m';
  };

  const reset = '\x1b[0m';

  console.log(`${color}[${level.toUpperCase()}]${reset} ${message}`);
};

export default log;