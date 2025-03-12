import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Avatar' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1980 })
  @IsNumber()
  year: number;
}
