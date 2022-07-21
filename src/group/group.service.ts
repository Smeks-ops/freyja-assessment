import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupPayload } from './types/group.types';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(CreateGroupDto: any): Promise<Group> {
    const { name } = CreateGroupDto;

    const payload: GroupPayload = {
      name,
    };

    return this.groupRepository.save(payload);
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return this.groupRepository.findOne(id);
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
