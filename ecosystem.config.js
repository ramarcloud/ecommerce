module.exports = {
  apps: [
    {
      script: "server.js",
      watch: true,
      env: {
        NODE_ENV: "local",
        PORT: 8080,
      },
    },
  ],
};
