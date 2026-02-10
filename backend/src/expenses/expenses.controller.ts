import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('expenses')
@Controller('expenses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({ status: 200, description: 'List of expenses' })
  findAll() {
    return this.expensesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiBody({ schema: { type: 'object', properties: { description: { type: 'string' }, amount: { type: 'number' }, payer: { type: 'string' }, splits: { type: 'array', items: { type: 'object', properties: { user: { type: 'string' }, amount: { type: 'number' } } } } } } })
  @ApiResponse({ status: 201, description: 'Expense created' })
  create(@Body() createExpenseDto: Partial<any>) {
    return this.expensesService.create(createExpenseDto);
  }
}