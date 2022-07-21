import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ type: String, required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  cover: string;

  @ApiProperty({ type: Number, required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  providerId: number;

  @ApiProperty({ type: Number, required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  groupId: number;
}
