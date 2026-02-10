import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({ timestamps: true })
export class Expense {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  payer: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Group' })
  group?: Types.ObjectId;

  @Prop({ type: [{ user: { type: Types.ObjectId, ref: 'User' }, amount: Number }] })
  splits: { user: Types.ObjectId; amount: number }[];

  @Prop({ default: Date.now })
  date: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);