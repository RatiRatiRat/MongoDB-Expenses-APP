import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://sifrashvilirati:Rati@crud-expenses.b530vzg.mongodb.net/"), ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
