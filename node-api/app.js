const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());

async function initializeDatabase() {
  await prisma.$connect();
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      "notificationEnabled" BOOLEAN NOT NULL DEFAULT FALSE,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

app.get('/', (req, res) => {
  res.json({ message: 'Notifications sent succesfully' });
});

app.post('/users', async (req, res) => {
  const { name, email, phone, notificationEnabled = false } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        notificationEnabled,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create user' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch user' });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, notificationEnabled } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        phone,
        notificationEnabled,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Unable to update user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'User deleted successfully', id: user.id });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Unable to delete user' });
  }
});

app.get('/notifications/pending', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { notificationEnabled: true },
      select: { id: true, name: true, email: true },
    });

    res.json({ pending_users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch pending notifications' });
  }
});

app.post('/notifications/send', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { notificationEnabled: true },
      select: { name: true },
    });

    users.forEach((user) => {
      console.info(`Simulating notification send for: ${user.name}`);
    });

    res.json({ message: 'Notifications sent successfully', total: users.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to send notifications' });
  }
});

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Node API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });
