import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateActorDto {
  @ApiProperty({ example: 'Jeki Chan' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1980 })
  @IsNumber()
  year: number;

  @ApiProperty({ example: '67cec7487eb09790a53f291b' })
  @IsMongoId()
  @IsOptional()
  movies?: string;
}
