import { ApiProperty } from '@nestjs/swagger';

export class JobApplicationDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({ type: 'string', format: 'uuid' })
  columnId: string;
}
