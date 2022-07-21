import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ type: String, required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
}
