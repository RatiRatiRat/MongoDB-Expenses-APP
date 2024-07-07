import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schema/expense.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const count = await this.expenseModel.countDocuments();
    const newExpense = new this.expenseModel({
      id: count + 1,
      title: createExpenseDto.title,
      description: createExpenseDto.description,
      amount: createExpenseDto.amount,
    });

    return newExpense.save();
  }

  async findAll(queryParams: { page: string; perPage: string }): Promise<Expense[]> {
    const page = parseInt(queryParams.page, 10);
    const limit = parseInt(queryParams.perPage, 10);
    return this.expenseModel.find().skip((page - 1) * limit).limit(limit).exec();
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findOne({ id }).exec();
    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    const updatedExpense = await this.expenseModel.findOneAndUpdate({ id }, updateExpenseDto, { new: true }).exec();
    if (!updatedExpense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return updatedExpense;
  }

  async remove(id: string): Promise<Expense> {
    const deletedExpense = await this.expenseModel.findOneAndDelete({ id }).exec();
    if (!deletedExpense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return deletedExpense;
  }
}
