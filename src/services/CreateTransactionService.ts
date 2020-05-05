// import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';
import AppError from '../errors/AppError';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_title: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category_title,
  }: RequestDTO): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);
    const createCategoryService = new CreateCategoryService();

    if (type === 'outcome') {
      const { total: totalBalance } = await transactionsRepository.getBalance();

      if (totalBalance < value) {
        throw new AppError('Insufficient balance.');
      }
    }

    let tansactionCategory = await categoriesRepository.findOne({
      title: category_title,
    });

    if (!tansactionCategory) {
      tansactionCategory = await createCategoryService.execute({
        title: category_title,
      });
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: tansactionCategory,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
