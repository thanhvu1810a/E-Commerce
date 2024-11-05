import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min, Max, isNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}