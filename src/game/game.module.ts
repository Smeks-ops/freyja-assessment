import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { CommonModule } from '../common/common.module';
import { ProviderService } from '../provider/provider.service';
import { ProviderModule } from 'src/provider/provider.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    CommonModule,
    ProviderModule,
    GroupModule,
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
