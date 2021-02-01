export default () => ({
  api: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  jwt: {
    expirationTime: process.env.TOKEN_EXPIRATION_TIME,
    secret: process.env.TOKEN_SECRET,
  },
  database: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    synchronize: process.env.DATABASE_SYNCHRONIZE,
  },
});
