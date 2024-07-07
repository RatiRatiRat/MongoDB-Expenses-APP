import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Expense extends Document {

  @Prop({required:true})
  id:number;  

  @Prop({required:true})
  title: string;

  @Prop({required:true})
  description: string;

  @Prop({required:true})
  amount: number;
}

const ExpenseSchema = SchemaFactory.createForClass(Expense);

export { ExpenseSchema };
