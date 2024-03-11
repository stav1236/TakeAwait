export default () => ({
  port: parseInt(process.env.PORT) ?? 3000,
  database: { url: process.env.DB_URL ?? "" },
  env: process.env.ENV ?? "empty",
});
