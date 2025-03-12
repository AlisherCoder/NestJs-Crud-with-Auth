import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findUser(email: string) {
    let user = await this.userModel.findOne({ email });
    return user;
  }

  async register(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    let { email, password } = createUserDto;
    try {
      let user = await this.findUser(email);  
      if (user) {
        return new BadRequestException('User already exists');
      }

      let hash = bcrypt.hashSync(password, 10);
      let newUser = {
        ...createUserDto,
        password: hash,
      };

      await this.userModel.create(newUser);
      return newUser;
    } catch (error) {
      return { message: error.message };
    }
  }

  async login(loginUserDto: LoginUserDto) {
    let { email, password } = loginUserDto;
    try {
      let user = await this.findUser(email);
      if (!user) {
        return new BadRequestException('User not found');
      }

      let match = bcrypt.compareSync(password, user!.password);
      if (!match) {
        return new BadRequestException('Wrong credentials');
      }

      let token = this.jwtService.sign({ id: user!._id });
      return { token };
    } catch (error) {
      return { message: error.message };
    }
  }
}
