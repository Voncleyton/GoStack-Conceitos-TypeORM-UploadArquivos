import Router from 'express';

import CreateCategoryService from '../services/CreateCategoryService';

const categoriesRouter = Router();

categoriesRouter.post('/', async (request, response) => {
  const { title } = request.body;
  const createCategoyiService = new CreateCategoryService();

  const category = await createCategoyiService.execute({ title });

  return response.json(category);
});

export default categoriesRouter;
