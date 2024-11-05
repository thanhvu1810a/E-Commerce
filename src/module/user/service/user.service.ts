import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schema/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;
    const isEsxit = await this.findOneByEmail(email)
    if(isEsxit) {throw new HttpException('USERNAME_IN_USED', HttpStatus.BAD_REQUEST)}
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userModel.create({ email, password: hashedPassword, role });
    return user;
  }

  async findAllUser(){
    return this.userModel.find()
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne( { email } );
  }

  findOneById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const { password, profile } = updateUserDto;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    await this.userModel.findByIdAndUpdate(id, {password:hashedPassword,profile});
  }

  async remove(_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(_id);
  }

  async count() {
    return await this.userModel.find().countDocuments();
  }
}