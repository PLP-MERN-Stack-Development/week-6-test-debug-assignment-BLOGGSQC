// bugs.test.js - Integration tests for Bug Tracker API

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const bugRoutes = require('../../routes/bugRoutes');
const Bug = require('../../models/Bug');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  app = express();
  app.use(express.json());
  app.use('/api/bugs', bugRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Bug.deleteMany();
});

describe('POST /api/bugs', () => {
  it('should create a new bug', async () => {
    const newBug = {
      title: 'Bug 1',
      description: 'Crash on login',
      priority: 'high',
      status: 'open',
    };

    const res = await request(app).post('/api/bugs').send(newBug);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newBug.title);
    expect(res.body.priority).toBe('high');
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app).post('/api/bugs').send({
      description: 'No title bug',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/title is required/i);
  });
});

describe('GET /api/bugs', () => {
  it('should return all bugs', async () => {
    await Bug.create([
      { title: 'Bug A', description: 'A desc' },
      { title: 'Bug B', description: 'B desc' },
    ]);

    const res = await request(app).get('/api/bugs');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });
});

describe('PUT /api/bugs/:id', () => {
  it('should update an existing bug', async () => {
    const bug = await Bug.create({ title: 'Old Title' });

    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ title: 'Updated Title' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should return 404 if bug not found', async () => {
    const res = await request(app)
      .put(`/api/bugs/${mongoose.Types.ObjectId()}`)
      .send({ title: 'Update' });

    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/bugs/:id', () => {
  it('should delete a bug', async () => {
    const bug = await Bug.create({ title: 'To be deleted' });

    const res = await request(app).delete(`/api/bugs/${bug._id}`);

    expect(res.status).toBe(200);

    const found = await Bug.findById(bug._id);
    expect(found).toBeNull();
  });

  it('should return 404 if bug not found', async () => {
    const res = await request(app).delete(`/api/bugs/${mongoose.Types.ObjectId()}`);

    expect(res.status).toBe(404);
  });
});
