import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthUser } from 'src/auth/auth.decorator';
import { User } from 'src/users/entities/users.entity';
import { plainToClass } from 'class-transformer';

@ApiTags('group')
@Controller('group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOkResponse({
    description: 'Creates a new group',
  })
  @Post()
  createAdmin(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }

  async handleRestriction(user: User) {
    if (user.userRole === 'player')
      throw new BadRequestException(
        'Sorry, only an admin can perform this action',
      );
  }
}
