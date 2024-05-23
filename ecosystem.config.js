module.exports = {
  apps: [
    {
      name: 'customstory.online',
      script: 'index.js',
      instances: 'max',
      exec_mode: 'cluster',
      error_file: '/home/customstorydev/custom-story-server/logs/pm2/error.log',
      out_file: '/home/customstorydev/custom-story-server/logs/pm2/out.log',
      pid_file: '/home/customstorydev/custom-story-server/logs/pm2/.pid',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      log_type: 'json',
      merge_logs: true,
      env: {
        DATABASE_URL_REDIS:
          'redis://customstorydev:1352461324qQ@195.133.196.229:6379/1',
      },
      env_production: {
        DATABASE_URL_REDIS:
          'redis://customstorydev:1352461324qQ@195.133.196.229:6379/1',
      },
    },
  ],
}
