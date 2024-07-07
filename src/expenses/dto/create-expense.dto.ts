import { IsString,IsNumber, IsNotEmpty} from "class-validator";

export class CreateExpenseDto {
   
    
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
