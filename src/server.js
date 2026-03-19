const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const { testConnection } = require("./config/db");

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:");
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
