import { IsNotEmpty, IsNumber, IsString, Min, Max, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsOptional()
  rating: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  comment: string;
}