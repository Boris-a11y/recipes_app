import {
  describe,
  expect,
  test,
  jest,
  beforeAll,
  afterAll,
} from '@jest/globals';
import { app } from '../../server';
import request from 'supertest';
import { AppDataSource } from '../../data-source';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('GET /api/recipes', () => {
  it('should return the users', (done) => {
    request(app)
      .get('/api/recipes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err: any) => {
        try {
          if (err) throw err;

          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
});
