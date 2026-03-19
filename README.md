# School Management API

Node.js assignment solution using Express.js and MySQL.

## Features

- `POST /addSchool` adds a school after validating input.
- `GET /listSchools` returns schools sorted by distance from the user's coordinates.
- `GET /health` confirms the service is running.

## Tech Stack

- Node.js
- Express.js
- MySQL

## Project Structure

```text
src/
  app.js
  server.js
  config/db.js
  controllers/schoolController.js
  routes/schools.js
  utils/distance.js
  utils/validation.js
sql/schema.sql
postman/School-Management-API.postman_collection.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file using `.env.example`.

3. Create the MySQL database and table:

```sql
SOURCE sql/schema.sql;
```

4. Start the API:

```bash
npm start
```

The API runs by default on `http://localhost:3000`.

## Environment Variables

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
```

## API Details

### Add School

- Method: `POST`
- Endpoint: `/addSchool`
- Body:

```json
{
  "name": "Green Valley School",
  "address": "221B Baker Street, London",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

- Success response:

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Green Valley School",
    "address": "221B Baker Street, London",
    "latitude": 28.6139,
    "longitude": 77.209
  }
}
```

### List Schools

- Method: `GET`
- Endpoint: `/listSchools?latitude=28.6139&longitude=77.209`
- Success response:

```json
{
  "success": true,
  "message": "Schools fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Green Valley School",
      "address": "221B Baker Street, London",
      "latitude": 28.6139,
      "longitude": 77.209,
      "distanceKm": 0
    }
  ]
}
```

## Distance Sorting

The API uses the Haversine formula to calculate the distance between the user's latitude/longitude and each school's coordinates.

## Postman Collection

Import [`postman/School-Management-API.postman_collection.json`](postman/School-Management-API.postman_collection.json) into Postman for ready-made requests.

## Deployment

This repository includes a `render.yaml` file for Render deployment. Add the required database environment variables in Render and connect it to a MySQL instance.
