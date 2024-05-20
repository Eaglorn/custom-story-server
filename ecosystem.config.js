module.exports = {
  apps: [
    {
      name: 'customstory.online',
      script: './index.js',
      instances: 'max',
      exec_mode: 'cluster',
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
