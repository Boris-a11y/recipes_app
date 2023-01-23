import { beforeAll, afterAll, expect } from '@jest/globals';
import { app } from '../../server';
import request from 'supertest';
import { AppDataSource } from '../../data-source';

// var Cookies = require('expect-cookies');

// app.post('/api/recipes', function (_, res) {
//   res.cookie('alpha', 'one', {
//     path: '/',
//     httpOnly: true,
//   });
//   res.send(200);
// });

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('POST /api/recipes', () => {
  describe('When passed the request body', () => {
    it('should respond with a 201 status code', async () => {
      const response = await request(app)
        .post('/api/recipes')
        .send({
          title: 'title4',
          description: 'desc',
          ingredients: ['aaa', 'bbb', 'ccc'],
        });
      expect(response.statusCode).toBe(201);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
      //   expect(
      //     Cookies.set({ name: 'alpha', options: ['domain', 'path', 'httponly'] }),
      //   );
      //   // assert 'bravo' cookie is NOT set
      //   expect(Cookies.not('set', { name: 'bravo' }));
    });
  });
});
