import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from '../schemas/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>) {}

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.expenseModel.findById(id).exec();
  }

  async create(expense: Partial<Expense>): Promise<Expense> {
    const createdExpense = new this.expenseModel(expense);
    return createdExpense.save();
  }

  async update(id: string, expense: Partial<Expense>): Promise<any> {
    return this.expenseModel.findByIdAndUpdate(id, expense, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.expenseModel.findByIdAndDelete(id).exec();
  }
}