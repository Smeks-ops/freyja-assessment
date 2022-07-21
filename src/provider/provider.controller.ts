import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/auth/auth.decorator';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/users.entity';
import { plainToClass } from 'class-transformer';

Injectable();
class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file['name'] = req.body.name;
    return next.handle();
  }
}
@ApiTags('provider')
@Controller('provider')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @ApiOkResponse({
    description: 'Returns created game provider',
    type: CreateProviderDto,
  })
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
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
    return plainToClass(CreateProviderDto, this.providerService.create(file));
  }

  @Get()
  findAll() {
    return this.providerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providerService.update(+id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providerService.remove(+id);
  }

  async handleRestriction(user: User) {
    if (user.userRole === 'player')
      throw new BadRequestException(
        'Sorry, only an admin can perform this action',
      );
  }
}
