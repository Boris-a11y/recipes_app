import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import request from 'supertest';
import typeormFaker from 'typeorm-faker';
import { User } from '@entity/User';
import { Recipe } from '@entity/Recipe';
import { recipeRepository } from '@repository/repository';
import { AppDataSource } from 'data-source';
import sinon from 'sinon';
import { RecipeService } from '@services/recipeService';
import { app } from 'server';
import { createAccessToken } from '@utils/auth';
import { Cookie } from 'cookiejar';
import { logger } from 'logger';

const { prototype: recipeService } = RecipeService;
const user = new User();

beforeAll(() => {
  const recipeStub = typeormFaker.stub(Recipe, 10);

  const stubOne = typeormFaker.stubOne(Recipe);

  const deleteStub = typeormFaker.stubOne(Recipe, {
    id: 45986,
    title: '2^28+/*&lg',
    description: 'B12:7F;4+1',
    ingredients: ['aaa', 'aaa', 'aaa'],
    owner: 'kO;]B8,YJI',
    ownerId: 5876,
  });

  let repositoryStub = sinon.stub(recipeRepository);
  repositoryStub.find.resolves(recipeStub);
  repositoryStub.findOne.resolves(stubOne);

  repositoryStub.save.resolves(stubOne);
  repositoryStub.delete(1);

  const datasourceStub = sinon.stub(AppDataSource);
  datasourceStub.getRepository.returns(repositoryStub);
});

afterAll(() => {
  sinon.restore();
});

describe('GET /api/recipes', () => {
  it('should throw 401 unauthorized error if the cookie is missing', (done) => {
    request(app)
      .get('/api/recipes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should respond with 200 ok if the cookie is present', (done) => {
    const agent = request.agent(app);
    agent.jar.setCookie(new Cookie(`kuki=${createAccessToken(user)}`));
    agent
      .get('/api/recipes')
      .set('Accept', 'application/json')
      .withCredentials()
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should throw 404 not found error if the url address is invalid', () => {
    const agent = request.agent(app);

    agent.jar.setCookie(new Cookie(`kuki=${createAccessToken(user)}`));
    agent.get('/api/recipes/invalid-url').expect(404);
  });

  it('should fetch an array of recipes and respond with json', async () => {
    const data = await recipeService.Recipes();

    expect(data).toBeDefined();
    expect(data.recipes.length).toBeGreaterThan(0);
    expect(data.statusCode).toEqual(200);
  });

  it('should fetch a single recipe', async () => {
    const data = await recipeService.getRecipe(1);

    logger.info(data.recipe?.title);
    expect(data.recipe?.title).toBeDefined();
  });
});

describe('POST /api/recipes', () => {
  it('should throw 401 unauthorized error if the cookie is missing', (done) => {
    request(app)
      .post('/api/recipes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('responds with status 201', async () => {
    const recipe = {
      title: 'aaaafawafw',
      description: 'aaaaaaaa',
      ingredients: ['aaa', 'aaaa'],
    };

    const agent = request.agent(app);
    agent.jar.setCookie(new Cookie(`kuki=${createAccessToken(user)}`));
    agent
      .post('/api/recipes')
      .send(recipe)
      .set('Accept', 'application/json')
      .expect(201);
    expect(recipe).toBeDefined();
  });

  it('should create a recipe', async () => {
    const data = await recipeService.createRecipe(
      {
        id: 1,
        title: 'my title',
        description: 'my desc',
        ownerId: 1,
        ingredients: ['aaa', 'aaa'],
      },
      'bob',
      1,
    );

    logger.info(data.recipe);
    expect(data.recipe.title.length).toBeGreaterThan(0);
    expect(data.recipe.description?.length).toBeGreaterThan(0);
    expect(data.recipe.ingredients.length).toBeGreaterThan(0);
    expect(data.statusCode).toEqual(201);
  });
});

describe('DELETE /api/recipes', () => {
  it('should throw 401 unauthorized error if the cookie is missing', (done) => {
    const recipeId = 1;
    request(app)
      .delete(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should delete a recipe with the given id if the cookie is present', () => {
    const agent = request.agent(app);
    agent.jar.setCookie(new Cookie(`kuki=${createAccessToken(user)}`));
    agent
      .delete(`/api/recipes/${1}`)
      .send()
      .set('Accept', 'application/json')
      .expect(200);
  });

  it('should delete only the owners recipe', async () => {
    const data = await recipeService.deleteRecipe(1, 1);
    expect(data.statusCode).toBe(200);
  });
});
