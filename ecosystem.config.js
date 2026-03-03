module.exports = {
  apps: [
    {
      name: 'aura-website',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/aurawebsite',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Log configuration
      error_file: '/home/aurawebsite/logs/err.log',
      out_file: '/home/aurawebsite/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // Auto restart
      max_memory_restart: '512M',
      restart_delay: 5000,
      max_restarts: 10,
    },
  ],
};
