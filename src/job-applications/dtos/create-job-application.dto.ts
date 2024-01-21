import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBoardColumnDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  columnId: string;
}
