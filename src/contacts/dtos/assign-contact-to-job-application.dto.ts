import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssignContactToJobApplication {
  @ApiProperty()
  @IsUUID()
  contactId: string;

  @ApiProperty()
  @IsUUID()
  jobApplicationId: string;
}
