import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateProviderDto {
  @ApiProperty({ type: String, required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  logo: string;
}
