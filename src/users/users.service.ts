import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, firstName, lastName, password, userRole } = createUserDto;

    // check if the email already exists
    const isExist = await this.findByEmail(email);
    if (isExist) throw new BadRequestException('Email already exists');

    const createUserPayload = new User();
    createUserPayload.firstName = firstName;
    createUserPayload.lastName = lastName;
    createUserPayload.email = email;
    createUserPayload.password = password;
    createUserPayload.userRole = userRole ? 'admin' : 'player';

    const result = await this.userRepository.save(createUserPayload);

    // use the id and email of the registered user to create a token
    const payload = {
      id: result.id,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      userRole: result.userRole,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findById(id: string): Promise<User> {
    return await User.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
