const mysql = require("mysql2/promise");

let pool;

function parseDatabaseUrl(connectionString) {
  if (!connectionString) {
    return null;
  }

  const url = new URL(connectionString);

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, "")
  };
}

function resolveDatabaseConfig() {
  const urlConfig =
    parseDatabaseUrl(process.env.DATABASE_URL) ||
    parseDatabaseUrl(process.env.MYSQL_URL) ||
    parseDatabaseUrl(process.env.MYSQL_PUBLIC_URL);

  const config = {
    host: process.env.DB_HOST || process.env.MYSQLHOST || urlConfig?.host,
    port:
      Number(process.env.DB_PORT || process.env.MYSQLPORT || urlConfig?.port) ||
      3306,
    user: process.env.DB_USER || process.env.MYSQLUSER || urlConfig?.user,
    password:
      process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || urlConfig?.password,
    database:
      process.env.DB_NAME || process.env.MYSQLDATABASE || urlConfig?.database
  };

  const missing = Object.entries(config)
    .filter(([, value]) => value === undefined || value === null || value === "")
    .map(([key]) => key);

  if (missing.length > 0) {
    const error = new Error(
      `Missing database configuration: ${missing.join(", ")}`
    );
    error.code = "DB_CONFIG_MISSING";
    throw error;
  }

  return config;
}

function getPool() {
  if (!pool) {
    const config = resolveDatabaseConfig();

    pool = mysql.createPool({
      ...config,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  return pool;
}

async function testConnection() {
  const connection = await getPool().getConnection();
  connection.release();
}

module.exports = {
  pool: {
    execute: (...args) => getPool().execute(...args)
  },
  testConnection,
  resolveDatabaseConfig
};
