import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  password: string;
}
