import {
  CallHandler,
  Controller,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { S3Service } from 'src/common/services/s3/s3.service';
import { Repository } from 'typeorm';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { GamePayload } from './types/games.types';
import { ProviderService } from 'src/provider/provider.service';
import { GroupService } from 'src/group/group.service';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private s3Service: S3Service,
    private providerService: ProviderService,
    private groupService: GroupService,
  ) {}

  async create(CreateGameDto: any): Promise<Game> {
    const { buffer, originalname, name, providerId, groupId } = CreateGameDto;

    const imageUrl = await Promise.all([
      await this.s3Service.uploadFile(buffer, originalname),
    ]);

    // get provider by id
    const gameProvider = await this.providerService.findOne(providerId);

    const gameGroup = await this.groupService.findOne(groupId);

    const payload: GamePayload = {
      name,
      cover: `${imageUrl}`,
      provider: gameProvider,
      group: gameGroup,
    };

    return this.gameRepository.save(payload);
  }

  findAll() {
    return `This action returns all game`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
