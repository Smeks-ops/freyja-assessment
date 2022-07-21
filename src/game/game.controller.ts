import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateProviderDto } from 'src/provider/dto/create-provider.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/auth/auth.decorator';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/users.entity';

Injectable();
class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file['name'] = req.body.name;
    return next.handle();
  }
}

@ApiTags('game')
@Controller('game')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @ApiOkResponse({
    description: 'Returns created game',
    type: CreateGameDto,
  })
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        providerId: { type: 'number' },
        groupId: { type: 'number' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileExtender)
  @UseInterceptors(FileInterceptor('file'))
  async createProvider(@UploadedFile('file') file, @AuthUser() user: User) {
    await this.handleRestriction(user);
    return plainToClass(CreateGameDto, this.gameService.create(file));
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }

  async handleRestriction(user: User) {
    if (user.userRole === 'player')
      throw new BadRequestException(
        'Sorry, only an admin can perform this action',
      );
  }
}
