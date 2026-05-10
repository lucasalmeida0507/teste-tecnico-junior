const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

function createClient() {
  return new Client({ connectionString: databaseUrl });
}

app.get('/', (req, res) => {
  res.json({ message: 'Node API is running' });
});

app.get('/notifications/pending', async (req, res) => {
  const client = createClient();

  try {
    await client.connect();
    const result = await client.query('SELECT id, name, email FROM "User" WHERE "notificationEnabled" = TRUE');
    await client.end();

    res.json({ pending_users: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch pending notifications' });
  }
});

app.post('/notifications/send', async (req, res) => {
  const client = createClient();

  try {
    await client.connect();
    const result = await client.query('SELECT name FROM "User" WHERE "notificationEnabled" = TRUE');
    await client.end();

    const total = result.rows.length;
    result.rows.forEach((row) => {
      console.info(`Simulating notification send for: ${row.name}`);
    });

    res.json({ message: 'Notifications sent successfully', total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to send notifications' });
  }
});

app.listen(port, () => {
  console.log(`Node API listening on port ${port}`);
});
