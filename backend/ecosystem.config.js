module.exports = {
  apps: [
    {
      name: "sogeloc-backend",
      cwd: __dirname,
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
