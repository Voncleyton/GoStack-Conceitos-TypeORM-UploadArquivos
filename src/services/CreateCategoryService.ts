import { Repository, getRepository } from 'typeorm';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface RequestDTO {
  title: string;
}

export default class CreateCategoryService extends Repository<Category> {
  public async execute({ title }: RequestDTO): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const existingCategory = await categoriesRepository.findOne({ title });

    if (existingCategory) {
      throw new AppError('Category already exists');
    }

    const category = categoriesRepository.create({ title });

    await categoriesRepository.save(category);

    return category;
  }
}
